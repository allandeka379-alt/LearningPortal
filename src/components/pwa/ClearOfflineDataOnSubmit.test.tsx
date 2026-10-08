/** @vitest-environment jsdom */
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pwa/saved-lessons", () => ({ clearOfflineData: vi.fn(async () => undefined) }));

import { clearOfflineData } from "@/lib/pwa/saved-lessons";
import { ClearOfflineDataOnSubmit } from "./ClearOfflineDataOnSubmit";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ClearOfflineDataOnSubmit", () => {
  it("clears offline data when the wrapped sign-out form is submitted", () => {
    render(
      <ClearOfflineDataOnSubmit>
        <form aria-label="Sign out" onSubmit={(event) => event.preventDefault()}>
          <button type="submit">Sign out</button>
        </form>
      </ClearOfflineDataOnSubmit>,
    );
    expect(clearOfflineData).not.toHaveBeenCalled();
    fireEvent.submit(screen.getByRole("form", { name: "Sign out" }));
    expect(clearOfflineData).toHaveBeenCalledTimes(1);
  });
});
