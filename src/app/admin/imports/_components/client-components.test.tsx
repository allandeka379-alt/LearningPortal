/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AutoRefresh } from "./AutoRefresh";
import { FileField } from "./FileField";

const router = { push: vi.fn(), refresh: vi.fn(), replace: vi.fn() };
vi.mock("next/navigation", () => ({ useRouter: () => router }));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("FileField", () => {
  it("refuses a file over the cap before upload and accepts a small one", () => {
    render(<FileField maxBytes={1024 * 1024} />);
    const input = screen.getByLabelText(/file/i) as HTMLInputElement;
    expect(input.accept).toContain(".xlsx");
    const big = new File([new Uint8Array(2 * 1024 * 1024)], "big.csv", { type: "text/csv" });
    fireEvent.change(input, { target: { files: [big] } });
    expect(screen.getByText(/This file is 2.0 MB/)).toBeTruthy();
    expect(input.validationMessage || input.validity.customError).toBeTruthy();
    expect(input.getAttribute("aria-invalid")).toBe("true");

    const small = new File(["front,back\nA,B\n"], "small.csv", { type: "text/csv" });
    fireEvent.change(input, { target: { files: [small] } });
    expect(screen.queryByText(/This file is/)).toBeNull();
    expect(input.validity.customError).toBe(false);
  });
});

describe("AutoRefresh", () => {
  it("refreshes the page while visible and announces itself politely", () => {
    vi.useFakeTimers();
    render(<AutoRefresh intervalMs={1_000} maxMinutes={1} />);
    expect(screen.getByRole("status").textContent).toContain("updates automatically");
    act(() => {
      vi.advanceTimersByTime(3_100);
    });
    expect(router.refresh).toHaveBeenCalledTimes(3);
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByRole("status").textContent).toContain("Automatic updates stopped");
  });
});
