/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

const pathname = vi.hoisted(() => ({ current: "/app" }));
const refresh = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current, useRouter: () => ({ refresh }) }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import type { FormAction, FormActionState } from "@/components/student/action-state";
import { announceNotificationsChanged, NOTIFICATIONS_CHANGED_EVENT } from "./client-api";
import { MarketingConsentForm } from "./MarketingConsentForm";
import { NotificationBellButton } from "./NotificationBellButton";
import { NotificationList } from "./NotificationList";
import { NotificationPreferencesForm } from "./NotificationPreferencesForm";
import { RefreshOnBellChanges } from "./NotificationReadTracking";
import { preferencesInputFromForm } from "./preference-fields";

beforeAll(() => {
  // jsdom has no modal dialog implementation; emulate the bits the shared modal hook uses.
  const proto = HTMLDialogElement.prototype as HTMLDialogElement & { showModal: () => void; close: () => void };
  proto.showModal = function showModal(this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  proto.close = function close(this: HTMLDialogElement) {
    if (!this.hasAttribute("open")) return;
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
  // Links are plain anchors here (next/link is mocked); keep jsdom from attempting a document navigation.
  document.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a[href]")) event.preventDefault();
  });
});

let visibility: DocumentVisibilityState = "visible";
beforeEach(() => {
  pathname.current = "/app";
  visibility = "visible";
  refresh.mockReset();
  Object.defineProperty(document, "visibilityState", { configurable: true, get: () => visibility });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

const ITEMS = [
  { id: "11111111-1111-4111-8111-111111111111", title: "Keep your 4-day streak going", body: "You haven't studied yet today.", category: "REMINDER", href: "/app/practice", unread: true, createdAt: new Date(Date.now() - 5 * 60_000).toISOString() },
  { id: "22222222-2222-4222-8222-222222222222", title: "Exam timetable published", body: "The November timetable is out.", category: "ANNOUNCEMENT", href: "/app/notifications/22222222-2222-4222-8222-222222222222", unread: false, createdAt: new Date(Date.now() - 2 * 86_400_000).toISOString() },
];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

/** A fetch stand-in for the feed: GET answers with `feed`, POST with the unread count left. */
function feedFetch(feed: { unread: number; items?: unknown[] }, afterPost: { unread: number } = { unread: 0 }) {
  const calls: { url: string; method: string; body: unknown }[] = [];
  const fetchMock = vi.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";
    calls.push({ url, method, body: init?.body ? JSON.parse(String(init.body)) : null });
    if (method === "POST") return json({ data: { updated: 1, ...afterPost } });
    return json({ data: url.includes("items=1") ? feed : { unread: feed.unread } });
  });
  vi.stubGlobal("fetch", fetchMock);
  return { calls, fetchMock };
}

describe("NotificationBellButton", () => {
  it("shows the server count, capped, and names it for screen readers", () => {
    const { rerender } = render(<NotificationBellButton initialUnread={3} />);
    const bell = screen.getByRole("button", { name: "Notifications, 3 unread" });
    expect(bell.textContent).toBe("3");
    rerender(<NotificationBellButton initialUnread={12} />);
    expect(screen.getByRole("button", { name: "Notifications, 12 unread" }).textContent).toBe("9+");
    rerender(<NotificationBellButton initialUnread={0} />);
    expect(screen.getByRole("button", { name: "Notifications" }).textContent).toBe("");
  });

  it("polls the count only while the tab is visible", async () => {
    const { fetchMock } = feedFetch({ unread: 5 });
    visibility = "hidden";
    render(<NotificationBellButton initialUnread={1} pollIntervalMs={20} />);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 90));
    });
    expect(fetchMock).not.toHaveBeenCalled();

    visibility = "visible";
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe("/app/notifications/feed?items=0");
    expect(await screen.findByRole("button", { name: "Notifications, 5 unread" })).toBeTruthy();
  });

  it("refreshes after client-side navigation and when another widget changes the read state", async () => {
    const { fetchMock } = feedFetch({ unread: 2 });
    const { rerender } = render(<NotificationBellButton initialUnread={4} pollIntervalMs={60_000} />);
    expect(fetchMock).not.toHaveBeenCalled();
    pathname.current = "/app/practice";
    rerender(<NotificationBellButton initialUnread={4} pollIntervalMs={60_000} />);
    expect(await screen.findByRole("button", { name: "Notifications, 2 unread" })).toBeTruthy();

    fetchMock.mockClear();
    act(() => announceNotificationsChanged("bell"));
    expect(fetchMock).not.toHaveBeenCalled();
    act(() => announceNotificationsChanged("page"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
  });

  it("opens a panel with recent notifications and marks one read when it is opened", async () => {
    const { calls } = feedFetch({ unread: 1, items: ITEMS }, { unread: 0 });
    render(<NotificationBellButton initialUnread={1} pollIntervalMs={60_000} />);
    fireEvent.click(screen.getByRole("button", { name: "Notifications, 1 unread" }));
    const list = await screen.findByRole("list", { name: "Recent notifications" });
    const links = within(list).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual(["/app/practice", "/app/notifications/22222222-2222-4222-8222-222222222222"]);
    expect(links[0]?.textContent).toContain("Keep your 4-day streak going");
    expect(links[0]?.textContent).toContain("Reminder · 5 min ago, unread");
    expect(calls[0]?.url).toBe("/app/notifications/feed?items=1");

    fireEvent.click(links[0]!);
    expect(screen.getByRole("button", { name: "Notifications" })).toBeTruthy();
    await waitFor(() => expect(calls.some((call) => call.method === "POST")).toBe(true));
    expect(calls.find((call) => call.method === "POST")?.body).toEqual({ ids: [ITEMS[0]!.id] });
    // Reading an already-read item sends nothing.
    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    const again = await screen.findByRole("list", { name: "Recent notifications" });
    const before = calls.filter((call) => call.method === "POST").length;
    fireEvent.click(within(again).getAllByRole("link")[1]!);
    expect(calls.filter((call) => call.method === "POST")).toHaveLength(before);
  });

  it("marks everything read from the panel", async () => {
    const { calls } = feedFetch({ unread: 2, items: ITEMS }, { unread: 0 });
    render(<NotificationBellButton initialUnread={2} pollIntervalMs={60_000} />);
    fireEvent.click(screen.getByRole("button", { name: "Notifications, 2 unread" }));
    await screen.findByRole("list", { name: "Recent notifications" });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Mark all as read" }));
    });
    await waitFor(() => expect(calls.find((call) => call.method === "POST")?.body).toEqual({ all: true }));
    expect(screen.getByRole("button", { name: "Notifications" })).toBeTruthy();
  });

  it("says so calmly when the panel cannot load, and retries", async () => {
    const fetchMock = vi.fn(async () => {
      throw new TypeError("offline");
    });
    vi.stubGlobal("fetch", fetchMock);
    render(<NotificationBellButton initialUnread={null} pollIntervalMs={60_000} />);
    fireEvent.click(screen.getByRole("button", { name: "Notifications" }));
    expect((await screen.findByRole("alert")).textContent).toContain("We couldn't load your notifications");
    feedFetch({ unread: 0, items: [] });
    fireEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("You're all caught up")).toBeTruthy();
  });
});

describe("NotificationList", () => {
  const now = new Date("2026-10-05T12:00:00.000Z");
  const items = [
    { id: "a", category: "REMINDER", title: "Time for today's study session", body: "Your daily goal is 45 minutes.", href: "/app/practice", unread: true, createdAt: new Date("2026-10-05T11:00:00.000Z") },
    { id: "b", category: "ANNOUNCEMENT", title: "Exam timetable", body: "Line one\nLine two", href: "/app/notifications/b", unread: false, createdAt: new Date("2026-10-01T09:00:00.000Z") },
  ];

  it("shows unread state in words, deep links and a no-JavaScript mark-read form", () => {
    const action = vi.fn(async () => undefined);
    render(<NotificationList items={items} now={now} timeZone="Africa/Harare" markReadAction={action} />);
    const list = screen.getByRole("list", { name: "Notifications" });
    const [first, second] = within(list).getAllByRole("listitem");
    expect(first?.textContent).toContain("Unread");
    expect(first?.textContent).toContain("1 h ago");
    expect(within(first!).getByRole("link", { name: "Time for today's study session" }).getAttribute("href")).toBe("/app/practice");
    const markRead = within(first!).getByRole("button", { name: 'Mark "Time for today\'s study session" as read' });
    expect((markRead.closest("form")?.querySelector('input[name="notificationId"]') as HTMLInputElement).value).toBe("a");
    expect(second?.textContent).not.toContain("Unread");
    expect(within(second!).queryByRole("button")).toBeNull();
  });

  it("renders the empty state when there is nothing", () => {
    render(<NotificationList items={[]} now={now} timeZone="Africa/Harare" markReadAction={vi.fn()} empty={<p>No notifications yet</p>} />);
    expect(screen.getByText("No notifications yet")).toBeTruthy();
  });

  it("refreshes the inbox when the bell changes the read state", () => {
    render(<RefreshOnBellChanges />);
    act(() => announceNotificationsChanged("page"));
    expect(refresh).not.toHaveBeenCalled();
    act(() => {
      window.dispatchEvent(new CustomEvent(NOTIFICATIONS_CHANGED_EVENT, { detail: { source: "bell" } }));
    });
    expect(refresh).toHaveBeenCalledTimes(1);
  });
});

function recordingAction(result: FormActionState) {
  const calls: FormData[] = [];
  const action: FormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

describe("NotificationPreferencesForm", () => {
  const props = {
    reminders: { study: true, streakAtRisk: true, weeklySummary: false },
    dailyReminderTime: "17:00",
    reminderTimeOptions: ["06:00", "17:00", "20:30"],
    channels: {
      REMINDER: { email: false, sms: false, whatsapp: false },
      LEARNING: { email: false, sms: false, whatsapp: false },
      ANNOUNCEMENT: { email: true, sms: false, whatsapp: false },
    },
    available: { email: true, sms: false, whatsapp: false },
    quietHours: { start: "21:00", end: "06:00" },
  };

  it("labels every control, explains quiet hours and disables channels the student cannot receive", () => {
    render(<NotificationPreferencesForm {...props} action={recordingAction(null).action} />);
    expect(screen.getByRole("switch", { name: "Daily study reminder" }).getAttribute("aria-checked")).toBe("true");
    expect(screen.getByRole("switch", { name: "Weekly summary" }).getAttribute("aria-checked")).toBe("false");
    expect((screen.getByLabelText("Reminder time") as HTMLSelectElement).value).toBe("17:00");
    expect(screen.getByText(/never sent between 21:00 and 06:00/)).toBeTruthy();
    const announcements = screen.getByRole("group", { name: "Announcements" });
    expect((within(announcements).getByRole("checkbox", { name: "Email" }) as HTMLInputElement).checked).toBe(true);
    const sms = within(announcements).getByRole("checkbox", { name: /SMS/ }) as HTMLInputElement;
    expect(sms.disabled).toBe(true);
    expect(within(announcements).getByText("Add a phone number to get text messages.")).toBeTruthy();
  });

  it("submits the choices in the shape the service validates and announces the result", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Notification settings saved." } });
    render(<NotificationPreferencesForm {...props} action={action} />);
    fireEvent.click(screen.getByRole("switch", { name: "Streak reminder" }));
    fireEvent.change(screen.getByLabelText("Reminder time"), { target: { value: "20:30" } });
    fireEvent.click(within(screen.getByRole("group", { name: "Study and streak reminders" })).getByRole("checkbox", { name: "Email" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save notification settings" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(preferencesInputFromForm(calls[0]!)).toEqual({
      reminders: { study: true, streakAtRisk: false, weeklySummary: false },
      dailyReminderTime: "20:30",
      channels: {
        REMINDER: { email: true, sms: false, whatsapp: false },
        LEARNING: { email: false, sms: false, whatsapp: false },
        ANNOUNCEMENT: { email: true, sms: false, whatsapp: false },
      },
    });
    expect(await screen.findByText("Notification settings saved.")).toBeTruthy();
  });

  it("shows a field error from the server", async () => {
    const { action } = recordingAction({ ok: false, error: { code: "VALIDATION", message: "Check the form.", fieldErrors: { dailyReminderTime: ["Choose a time between 06:00 and 20:30."] } } });
    render(<NotificationPreferencesForm {...props} action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save notification settings" }));
    });
    expect(await screen.findByText("Choose a time between 06:00 and 20:30.")).toBeTruthy();
  });
});

describe("MarketingConsentForm", () => {
  it("is off by default and submits only the channels switched on", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Saved." } });
    render(<MarketingConsentForm consent={{ email: false, sms: false, whatsapp: false }} allowed action={action} />);
    expect(screen.getByRole("switch", { name: "News and offers by email" }).getAttribute("aria-checked")).toBe("false");
    fireEvent.click(screen.getByRole("switch", { name: "News and offers by SMS" }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save choices" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect([...calls[0]!.keys()]).toEqual(["marketingSms"]);
  });

  it("never offers opt-in to students under 18", () => {
    render(<MarketingConsentForm consent={{ email: false, sms: false, whatsapp: false }} allowed={false} action={recordingAction(null).action} />);
    expect(screen.getByText("News and offers are not sent to students under 18.")).toBeTruthy();
    expect(screen.queryByRole("switch")).toBeNull();
  });
});
