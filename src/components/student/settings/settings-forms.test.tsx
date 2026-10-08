/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { FormAction, FormActionState } from "@/components/student/action-state";
import { DisplayPreferencesForm } from "./DisplayPreferencesForm";
import { LeaderboardPrivacyForm } from "./LeaderboardPrivacyForm";
import { profileFontScaleFromCookie, profileThemeFromCookie } from "./preferences-map";
import { ProfileForm } from "./ProfileForm";
import { SignOutOtherDevicesForm } from "./SignOutOtherDevicesForm";
import { StudyPreferencesForm } from "./StudyPreferencesForm";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  document.documentElement.removeAttribute("data-theme");
  document.documentElement.removeAttribute("data-font-scale");
});

const PREVIEWS = { REAL_NAME: "Tariro Moyo", FIRST_NAME: "Tariro M.", USERNAME: null, ANONYMOUS: "Anonymous student" } as const;

/** A Server Action stand-in that records the submitted form and answers with `result`. */
function recordingAction(result: FormActionState) {
  const calls: FormData[] = [];
  const action: FormAction = async (_state, formData) => {
    calls.push(formData);
    return result;
  };
  return { action, calls };
}

describe("LeaderboardPrivacyForm (§20)", () => {
  it("is off by default, previews each name mode and disables modes the profile cannot use", () => {
    const { action } = recordingAction(null);
    render(<LeaderboardPrivacyForm optIn={false} display="ANONYMOUS" previews={PREVIEWS} action={action} />);
    expect(screen.getByRole("switch", { name: "Show me on leaderboards" }).getAttribute("aria-checked")).toBe("false");
    expect(screen.getByText("Used only if you turn leaderboards on.")).toBeTruthy();
    expect(screen.getByText("Shown as: Tariro M.")).toBeTruthy();
    expect((screen.getByRole("radio", { name: /Username/ }) as HTMLInputElement).disabled).toBe(true);
    expect((screen.getByRole("radio", { name: /Anonymous/ }) as HTMLInputElement).checked).toBe(true);
  });

  it("submits the opt-in and the chosen mode, then announces the result", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "You're on the leaderboards." } });
    render(<LeaderboardPrivacyForm optIn={false} display="ANONYMOUS" previews={PREVIEWS} action={action} />);
    fireEvent.click(screen.getByRole("switch", { name: "Show me on leaderboards" }));
    expect(screen.queryByText("Used only if you turn leaderboards on.")).toBeNull();
    fireEvent.click(screen.getByRole("radio", { name: /First name and initial/ }));
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save privacy settings" }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(calls[0]?.get("optIn")).toBe("on");
    expect(calls[0]?.get("display")).toBe("FIRST_NAME");
    expect(await screen.findByText("You're on the leaderboards.")).toBeTruthy();
  });

  it("MIN-01: says the full-name mode needs a parent's or guardian's consent when that is why it is unavailable", () => {
    const { action } = recordingAction(null);
    render(<LeaderboardPrivacyForm optIn display="FIRST_NAME" previews={{ ...PREVIEWS, REAL_NAME: null }} realNameNeedsConsent action={action} />);
    expect((screen.getByRole("radio", { name: /Full name/ }) as HTMLInputElement).disabled).toBe(true);
    expect(screen.getByText(/Not available: needs your parent or guardian's consent/)).toBeTruthy();
  });

  it("shows field errors from the server", async () => {
    const { action } = recordingAction({ ok: false, error: { code: "VALIDATION", message: "Check the form.", fieldErrors: { display: ["Choose how your name appears."] } } });
    render(<LeaderboardPrivacyForm optIn display="REAL_NAME" previews={PREVIEWS} action={action} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Save privacy settings" }));
    });
    expect(await screen.findByText("Choose how your name appears.")).toBeTruthy();
  });
});

describe("StudyPreferencesForm", () => {
  it("labels the time zone and the optional goal, with the default as placeholder", () => {
    const { action } = recordingAction(null);
    render(
      <StudyPreferencesForm
        timezone="Africa/Harare"
        timeZones={["Africa/Harare", "Africa/Lusaka", "UTC"]}
        dailyGoalMinutes={null}
        defaultDailyGoalMinutes={45}
        minMinutes={5}
        maxMinutes={600}
        hasActivePlan={false}
        action={action}
      />,
    );
    const zone = screen.getByLabelText("Time zone") as HTMLSelectElement;
    expect(zone.value).toBe("Africa/Harare");
    expect(screen.getByRole("option", { name: "Africa / Lusaka" })).toBeTruthy();
    const goal = screen.getByLabelText(/Daily study goal/) as HTMLInputElement;
    expect(goal.value).toBe("");
    expect(goal.placeholder).toBe("45");
    expect(screen.getByText("Leave empty to use the suggested 45 minutes.")).toBeTruthy();
  });

  it("explains that an active plan sets today's target", () => {
    const { action } = recordingAction(null);
    render(
      <StudyPreferencesForm
        timezone="UTC"
        timeZones={["UTC"]}
        dailyGoalMinutes={30}
        defaultDailyGoalMinutes={45}
        minMinutes={5}
        maxMinutes={600}
        hasActivePlan
        action={action}
      />,
    );
    expect(screen.getByText(/Your study plan sets today's target/)).toBeTruthy();
    expect((screen.getByLabelText(/Daily study goal/) as HTMLInputElement).value).toBe("30");
  });
});

describe("DisplayPreferencesForm (§43)", () => {
  it("applies the theme at once and saves it to the account", async () => {
    // jsdom has no matchMedia; the theme switcher reads it to sync the browser chrome colour.
    vi.stubGlobal("matchMedia", (query: string) => ({ matches: false, media: query }));
    const save = vi.fn(async () => ({ ok: true as const, data: { message: "Saved to your account." } }));
    render(<DisplayPreferencesForm save={save} />);
    await act(async () => {
      fireEvent.click(screen.getByRole("radio", { name: "Dark" }));
    });
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(save).toHaveBeenCalledWith({ theme: "dark" });
    expect(await screen.findByText("Saved to your account.")).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("radio", { name: "Large" }));
    });
    expect(document.documentElement.getAttribute("data-font-scale")).toBe("lg");
    expect(save).toHaveBeenLastCalledWith({ fontScale: "lg" });
  });

  it("maps cookie values to profile values and rejects unknown ones", () => {
    expect(profileThemeFromCookie("system")).toBe("SYSTEM");
    expect(profileThemeFromCookie("dark")).toBe("DARK");
    expect(profileThemeFromCookie("toString")).toBeUndefined();
    expect(profileFontScaleFromCookie("xl")).toBe("EXTRA_LARGE");
    expect(profileFontScaleFromCookie(3)).toBeUndefined();
  });
});

describe("ProfileForm and SignOutOtherDevicesForm", () => {
  it("labels the display name and shows the public username", () => {
    const { action } = recordingAction(null);
    render(<ProfileForm displayName="Tari" username="swiftkudu482" maxLength={60} action={action} />);
    expect((screen.getByLabelText(/Display name/) as HTMLInputElement).value).toBe("Tari");
    expect(screen.getByText("swiftkudu482")).toBeTruthy();
  });

  it("disables signing out of other devices when there are none", () => {
    const { action } = recordingAction(null);
    render(<SignOutOtherDevicesForm otherSessions={0} action={action} />);
    expect((screen.getByRole("button", { name: /Sign out of other devices/ }) as HTMLButtonElement).disabled).toBe(true);
  });

  it("signs out other devices and confirms", async () => {
    const { action, calls } = recordingAction({ ok: true, data: { message: "Signed out of 2 other devices." } });
    render(<SignOutOtherDevicesForm otherSessions={2} action={action} />);
    expect(screen.getByText(/signed in on 2 other devices/)).toBeTruthy();
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Sign out of other devices/ }));
    });
    await waitFor(() => expect(calls).toHaveLength(1));
    expect(await screen.findByText("Signed out of 2 other devices.")).toBeTruthy();
    expect(screen.getByText("This is now the only device signed in to your account.")).toBeTruthy();
  });
});
