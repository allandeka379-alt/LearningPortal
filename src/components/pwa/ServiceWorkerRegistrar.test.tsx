/** @vitest-environment jsdom */
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/pwa/browser", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/lib/pwa/browser")>()),
  reloadPage: vi.fn(),
}));

import { reloadPage } from "@/lib/pwa/browser";
import { SW_MESSAGES } from "@/lib/pwa/constants";
import { APPLY_UPDATE_FALLBACK_MS, ServiceWorkerRegistrar } from "./ServiceWorkerRegistrar";

class FakeWorker extends EventTarget {
  state = "installed";
  readonly scriptURL = "http://localhost:3000/sw.js";
  readonly postMessage = vi.fn();
  moveTo(state: string): void {
    this.state = state;
    this.dispatchEvent(new Event("statechange"));
  }
}

class FakeRegistration extends EventTarget {
  waiting: FakeWorker | null = null;
  installing: FakeWorker | null = null;
  active: FakeWorker | null = new FakeWorker();
  readonly update = vi.fn(async () => undefined);
  readonly unregister = vi.fn(async () => true);
}

class FakeContainer extends EventTarget {
  controller: object | null = {};
  readonly register = vi.fn(async (): Promise<FakeRegistration> => this.registration);
  readonly getRegistrations = vi.fn(async () => [this.registration]);
  constructor(readonly registration: FakeRegistration = new FakeRegistration()) {
    super();
  }
}

function installContainer(container: FakeContainer): FakeContainer {
  Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: container });
  return container;
}

/** Renders and lets the registration promise settle. */
async function renderRegistrar(): Promise<void> {
  render(<ServiceWorkerRegistrar />);
  await act(async () => {});
}

afterEach(() => {
  cleanup();
  Reflect.deleteProperty(navigator, "serviceWorker");
  vi.unstubAllEnvs();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("ServiceWorkerRegistrar: registration", () => {
  it("does not register outside production, and removes a leftover production worker", async () => {
    const container = installContainer(new FakeContainer());
    await renderRegistrar();
    expect(container.register).not.toHaveBeenCalled();
    expect(container.registration.unregister).toHaveBeenCalled();
  });

  it("registers /sw.js as a module worker in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const container = installContainer(new FakeContainer());
    await renderRegistrar();
    expect(container.register).toHaveBeenCalledWith("/sw.js", { type: "module", scope: "/", updateViaCache: "none" });
    expect(container.registration.unregister).not.toHaveBeenCalled();
  });

  it("does nothing where service workers are unsupported", async () => {
    vi.stubEnv("NODE_ENV", "production");
    await renderRegistrar();
    expect(screen.queryByText("A new version is available")).toBeNull();
  });

  it("keeps working when registration is rejected (e.g. no module worker support)", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const container = installContainer(new FakeContainer());
    container.register.mockRejectedValueOnce(new TypeError("Module scripts are not supported"));
    await renderRegistrar();
    expect(screen.queryByText("A new version is available")).toBeNull();
  });
});

describe("ServiceWorkerRegistrar: updates", () => {
  function containerWithWaitingWorker(): { container: FakeContainer; worker: FakeWorker } {
    vi.stubEnv("NODE_ENV", "production");
    const container = installContainer(new FakeContainer());
    const worker = new FakeWorker();
    container.registration.waiting = worker;
    return { container, worker };
  }

  it("offers a refresh when a new version is waiting, and reloads once it has taken over", async () => {
    const { container, worker } = containerWithWaitingWorker();
    await renderRegistrar();

    expect(screen.getByText("A new version is available")).toBeTruthy();
    expect(reloadPage).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(worker.postMessage).toHaveBeenCalledWith({ type: SW_MESSAGES.skipWaiting });
    expect(reloadPage).not.toHaveBeenCalled();

    act(() => {
      container.dispatchEvent(new Event("controllerchange"));
    });
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it("shows the prompt when an update finishes installing while the page is open", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const container = installContainer(new FakeContainer());
    await renderRegistrar();
    expect(screen.queryByText("A new version is available")).toBeNull();

    const worker = new FakeWorker();
    worker.state = "installing";
    container.registration.installing = worker;
    act(() => {
      container.registration.dispatchEvent(new Event("updatefound"));
      worker.moveTo("installed");
    });
    expect(screen.getByText("A new version is available")).toBeTruthy();
  });

  it("does not prompt on the very first install (page not controlled yet)", async () => {
    const { container } = containerWithWaitingWorker();
    container.controller = null;
    await renderRegistrar();
    expect(screen.queryByText("A new version is available")).toBeNull();
  });

  it("never reloads on its own: 'Later' hides the prompt and other tabs' updates do not reload this one", async () => {
    const { container, worker } = containerWithWaitingWorker();
    await renderRegistrar();

    fireEvent.click(screen.getByRole("button", { name: "Later" }));
    expect(screen.queryByText("A new version is available")).toBeNull();

    act(() => {
      container.dispatchEvent(new Event("controllerchange"));
    });
    expect(worker.postMessage).not.toHaveBeenCalled();
    expect(reloadPage).not.toHaveBeenCalled();
  });

  it("just reloads when another tab already activated the new version", async () => {
    const { worker } = containerWithWaitingWorker();
    await renderRegistrar();
    worker.state = "activated";
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(worker.postMessage).not.toHaveBeenCalled();
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it("reloads anyway if the new version does not take over in time", async () => {
    const { worker } = containerWithWaitingWorker();
    await renderRegistrar();
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    fireEvent.click(screen.getByRole("button", { name: "Refresh" }));
    expect(worker.postMessage).toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(APPLY_UPDATE_FALLBACK_MS);
    });
    expect(reloadPage).toHaveBeenCalledTimes(1);
  });

  it("drops the prompt when the waiting version is discarded", async () => {
    const { worker } = containerWithWaitingWorker();
    await renderRegistrar();
    act(() => worker.moveTo("redundant"));
    expect(screen.queryByText("A new version is available")).toBeNull();
  });

  it("announces the message (not the buttons) in an always-mounted polite live region", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const container = installContainer(new FakeContainer());
    await renderRegistrar();
    const region = screen.getByRole("status");
    expect(region.textContent).toBe("");

    const worker = new FakeWorker();
    worker.state = "installing";
    container.registration.installing = worker;
    act(() => {
      container.registration.dispatchEvent(new Event("updatefound"));
      worker.moveTo("installed");
    });
    expect(screen.getByRole("status")).toBe(region);
    expect(region.textContent).toBe("A new version is availableRefresh to start using it.");
  });
});
