/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const pathname = vi.hoisted(() => ({ current: "/app" }));
const framework = vi.hoisted(() => ({ offline: false }));

vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));
vi.mock("next/offline", () => ({ useOffline: () => framework.offline }));

import { BACK_ONLINE_VISIBLE_MS, ConnectivityBanner } from "./ConnectivityBanner";

const OFFLINE_TEXT = "You are offline. Saved lessons are still available.";
const ONLINE_TEXT = "You are back online.";

let online = true;

function setConnectivity(next: boolean): void {
  act(() => {
    online = next;
    window.dispatchEvent(new Event(next ? "online" : "offline"));
  });
}

function statusText(): string {
  return screen.getByRole("status").textContent ?? "";
}

beforeEach(() => {
  online = true;
  pathname.current = "/app";
  framework.offline = false;
  Object.defineProperty(navigator, "onLine", { configurable: true, get: () => online });
});

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "onLine");
  vi.useRealTimers();
});

describe("ConnectivityBanner", () => {
  it("renders an empty polite live region while online", () => {
    render(<ConnectivityBanner />);
    expect(statusText()).toBe("");
  });

  it("tells the student they are offline and links to saved lessons", () => {
    render(<ConnectivityBanner />);
    const region = screen.getByRole("status");
    setConnectivity(false);
    // Same, always-mounted live region; only the message is inside it (not the Dismiss button).
    expect(screen.getByRole("status")).toBe(region);
    expect(statusText()).toBe(OFFLINE_TEXT);
    expect(screen.getByRole("link", { name: "Saved lessons" }).getAttribute("href")).toBe("/offline");
  });

  it("shows the offline message when the page loads offline", () => {
    online = false;
    render(<ConnectivityBanner />);
    expect(statusText()).toBe(OFFLINE_TEXT);
  });

  it("does not link to the offline page from the offline page itself", () => {
    pathname.current = "/offline";
    render(<ConnectivityBanner />);
    setConnectivity(false);
    expect(statusText()).toBe(OFFLINE_TEXT);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("says when the connection is back, then hides itself", () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    render(<ConnectivityBanner />);
    setConnectivity(false);
    setConnectivity(true);
    expect(statusText()).toBe(ONLINE_TEXT);

    act(() => {
      vi.advanceTimersByTime(BACK_ONLINE_VISIBLE_MS - 1);
    });
    expect(statusText()).toBe(ONLINE_TEXT);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(statusText()).toBe("");
  });

  it("does not say 'back online' on a normal page load", () => {
    render(<ConnectivityBanner />);
    setConnectivity(true);
    expect(statusText()).toBe("");
  });

  it("can be dismissed, and reappears on the next change", () => {
    render(<ConnectivityBanner />);
    setConnectivity(false);
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(statusText()).toBe("");

    setConnectivity(true);
    expect(statusText()).toBe(ONLINE_TEXT);
  });

  it("also treats Next's offline detection as offline (Wi-Fi without internet)", () => {
    framework.offline = true;
    render(<ConnectivityBanner />);
    expect(statusText()).toBe(OFFLINE_TEXT);
  });
});
