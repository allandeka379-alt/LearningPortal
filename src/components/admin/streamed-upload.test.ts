/** @vitest-environment jsdom */
import { afterEach, describe, expect, it, vi } from "vitest";
import { progressText, streamedUploadAction, type UploadProgress } from "./streamed-upload";

/** A minimal XMLHttpRequest stand-in: records the request, reports progress, answers with `reply`. */
function fakeXhr(reply: { status: number; body: unknown } | "network-error") {
  const sent: { method: string; url: string; body: unknown }[] = [];
  class FakeXhr {
    status = 0;
    responseText = "";
    upload: { onprogress: ((event: { loaded: number; total: number; lengthComputable: boolean }) => void) | null } = { onprogress: null };
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    onabort: (() => void) | null = null;
    private method = "";
    private url = "";
    open(method: string, url: string) {
      this.method = method;
      this.url = url;
    }
    setRequestHeader() {}
    send(body: unknown) {
      sent.push({ method: this.method, url: this.url, body });
      queueMicrotask(() => {
        this.upload.onprogress?.({ loaded: 5 * 1024 * 1024, total: 10 * 1024 * 1024, lengthComputable: true });
        if (reply === "network-error") {
          this.onerror?.();
          return;
        }
        this.status = reply.status;
        this.responseText = JSON.stringify(reply.body);
        this.onload?.();
      });
    }
  }
  vi.stubGlobal("XMLHttpRequest", FakeXhr);
  return sent;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

function formData(): FormData {
  const data = new FormData();
  data.set("altText", "A blue square");
  data.set("file", new File([new Uint8Array([1, 2, 3])], "a.png", { type: "image/png" }));
  return data;
}

describe("streamedUploadAction", () => {
  it("posts the form to the purpose's route, reports progress and maps success to message + redirect", async () => {
    const sent = fakeXhr({ status: 201, body: { data: { id: "m1", href: "/admin/media/m1" } } });
    const progress: (UploadProgress | null)[] = [];
    const action = streamedUploadAction<{ id: string; href: string }>("media", (data) => ({ message: "Uploaded.", redirectTo: data.href }), (p) => progress.push(p));
    const body = formData();
    const state = await action(null, body);
    expect(sent).toEqual([{ method: "POST", url: "/api/v1/uploads?purpose=media", body }]);
    expect(state).toEqual({ ok: true, data: { id: "m1", href: "/admin/media/m1" }, message: "Uploaded.", redirectTo: "/admin/media/m1" });
    expect(progress).toContainEqual({ loaded: 5 * 1024 * 1024, total: 10 * 1024 * 1024 });
    expect(progress.at(-1)).toBeNull();
  });

  it("returns the route's field errors with the text fields to re-fill, and a calm message when the network fails", async () => {
    fakeXhr({ status: 422, body: { error: { code: "VALIDATION", message: "The file is too large (maximum 10 MB).", fieldErrors: { file: ["The file is too large (maximum 10 MB)."] } } } });
    const failed = await streamedUploadAction("media", () => ({ message: "x" }))(null, formData());
    expect(failed).toEqual({
      ok: false,
      error: { code: "VALIDATION", message: "The file is too large (maximum 10 MB).", fieldErrors: { file: ["The file is too large (maximum 10 MB)."] } },
      values: { altText: "A blue square" },
    });

    fakeXhr("network-error");
    const offline = await streamedUploadAction("import", () => ({ message: "x" }))(null, formData());
    expect(offline).toMatchObject({ ok: false, error: { code: "INTERNAL", message: expect.stringMatching(/interrupted/) } });
  });

  it("formats progress for the bar", () => {
    expect(progressText({ loaded: 3.2 * 1024 * 1024, total: 9.8 * 1024 * 1024 })).toBe("3.2 of 9.8 MB uploaded");
    expect(progressText({ loaded: 1024 * 1024, total: null })).toBe("1.0 MB uploaded");
  });
});
