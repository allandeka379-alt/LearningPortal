import { describe, expect, it, vi } from "vitest";
import { SW_MESSAGES } from "./constants";
import {
  REGISTRATION_OPTIONS,
  UPDATE_CHECK_INTERVAL_MS,
  isAppWorkerRegistration,
  requestSkipWaiting,
  shouldCheckForUpdate,
  shouldRegisterServiceWorker,
  unregisterAppWorkers,
  watchForWaitingWorker,
} from "./sw-lifecycle";

class FakeWorker extends EventTarget {
  state = "installing";
  readonly postMessage = vi.fn();
  constructor(readonly scriptURL = "https://dzidza.example/sw.js") {
    super();
  }
  moveTo(state: string): void {
    this.state = state;
    this.dispatchEvent(new Event("statechange"));
  }
}

class FakeRegistration extends EventTarget {
  waiting: FakeWorker | null = null;
  installing: FakeWorker | null = null;
  active: FakeWorker | null = null;
  readonly unregister = vi.fn(async () => true);
  startUpdate(): FakeWorker {
    const worker = new FakeWorker();
    this.installing = worker;
    this.dispatchEvent(new Event("updatefound"));
    return worker;
  }
}

describe("shouldRegisterServiceWorker", () => {
  it("registers only in production builds with service worker support", () => {
    expect(shouldRegisterServiceWorker({ nodeEnv: "production", hasServiceWorker: true })).toBe(true);
    expect(shouldRegisterServiceWorker({ nodeEnv: "development", hasServiceWorker: true })).toBe(false);
    expect(shouldRegisterServiceWorker({ nodeEnv: "test", hasServiceWorker: true })).toBe(false);
    expect(shouldRegisterServiceWorker({ nodeEnv: undefined, hasServiceWorker: true })).toBe(false);
    expect(shouldRegisterServiceWorker({ nodeEnv: "production", hasServiceWorker: false })).toBe(false);
  });

  it("registers a module worker for the whole origin, bypassing the HTTP cache for updates", () => {
    expect(REGISTRATION_OPTIONS).toEqual({ type: "module", scope: "/", updateViaCache: "none" });
  });
});

describe("shouldCheckForUpdate", () => {
  it("checks at most once per interval", () => {
    expect(shouldCheckForUpdate(0, UPDATE_CHECK_INTERVAL_MS - 1)).toBe(false);
    expect(shouldCheckForUpdate(0, UPDATE_CHECK_INTERVAL_MS)).toBe(true);
    expect(shouldCheckForUpdate(1000, 1500, 500)).toBe(true);
  });
});

describe("watchForWaitingWorker", () => {
  it("reports a worker that is already waiting on a controlled page", () => {
    const registration = new FakeRegistration();
    registration.waiting = new FakeWorker();
    const onWaiting = vi.fn();
    watchForWaitingWorker(registration, () => true, onWaiting);
    expect(onWaiting).toHaveBeenCalledWith(registration.waiting);
  });

  it("reports a new version once it has installed", () => {
    const registration = new FakeRegistration();
    const onWaiting = vi.fn();
    watchForWaitingWorker(registration, () => true, onWaiting);

    const worker = registration.startUpdate();
    expect(onWaiting).not.toHaveBeenCalled();
    worker.moveTo("installed");
    expect(onWaiting).toHaveBeenCalledWith(worker);
  });

  it("ignores the first install (page not yet controlled)", () => {
    const registration = new FakeRegistration();
    registration.waiting = new FakeWorker();
    const onWaiting = vi.fn();
    watchForWaitingWorker(registration, () => false, onWaiting);
    registration.startUpdate().moveTo("installed");
    expect(onWaiting).not.toHaveBeenCalled();
  });

  it("stops listening after cleanup", () => {
    const registration = new FakeRegistration();
    const onWaiting = vi.fn();
    const stop = watchForWaitingWorker(registration, () => true, onWaiting);
    const worker = registration.startUpdate();
    stop();
    worker.moveTo("installed");
    registration.startUpdate().moveTo("installed");
    expect(onWaiting).not.toHaveBeenCalled();
  });
});

describe("requestSkipWaiting", () => {
  it("posts the skip-waiting message", () => {
    const worker = new FakeWorker();
    requestSkipWaiting(worker);
    expect(worker.postMessage).toHaveBeenCalledWith({ type: SW_MESSAGES.skipWaiting });
  });
});

describe("unregisterAppWorkers", () => {
  it("removes only registrations of /sw.js", async () => {
    const ours = new FakeRegistration();
    ours.active = new FakeWorker("http://localhost:3000/sw.js");
    const other = new FakeRegistration();
    other.active = new FakeWorker("http://localhost:3000/firebase-messaging-sw.js");
    const empty = new FakeRegistration();

    expect(await unregisterAppWorkers({ getRegistrations: async () => [ours, other, empty] })).toBe(1);
    expect(ours.unregister).toHaveBeenCalled();
    expect(other.unregister).not.toHaveBeenCalled();
    expect(isAppWorkerRegistration(empty)).toBe(false);
  });
});
