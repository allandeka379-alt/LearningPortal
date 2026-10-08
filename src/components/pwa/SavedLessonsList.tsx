"use client";

import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { APP_NAME, DEFAULT_LOCALE } from "@/lib/config";
import { MAX_SAVED_LESSONS } from "@/lib/pwa/constants";
import {
  clearOfflineData,
  formatSavedAt,
  getCacheStorage,
  listSavedLessons,
  type SavedLesson,
} from "@/lib/pwa/saved-lessons";

type ListState =
  | { status: "loading" }
  | { status: "unsupported" }
  | { status: "error" }
  | { status: "ready"; lessons: SavedLesson[] };

async function loadSavedLessons(): Promise<ListState> {
  const storage = getCacheStorage();
  if (storage === null) return { status: "unsupported" };
  try {
    return { status: "ready", lessons: await listSavedLessons(storage, window.location.origin, APP_NAME) };
  } catch {
    return { status: "error" };
  }
}

/**
 * The lessons saved on this device for offline reading, read from Cache Storage on the client (the service worker
 * saves each lesson page a student opens while online; docs/OFFLINE.md). Shows an honest empty state when there are
 * none. Links are plain anchors: a full navigation is answered by the service worker from its saved copy.
 */
export function SavedLessonsList() {
  const [state, setState] = useState<ListState>({ status: "loading" });
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    let active = true;
    void loadSavedLessons().then((next) => {
      if (active) setState(next);
    });
    return () => {
      active = false;
    };
  }, []);

  const removeAll = async () => {
    setRemoving(true);
    await clearOfflineData();
    setState(await loadSavedLessons());
    setRemoving(false);
  };

  switch (state.status) {
    case "loading":
      return (
        <p role="status" className="text-sm text-muted">
          Checking this device for saved lessons…
        </p>
      );
    case "unsupported":
      return <p className="text-sm text-muted">This browser can’t keep lessons for offline reading.</p>;
    case "error":
      return <p className="text-sm text-muted">Saved lessons on this device couldn’t be read.</p>;
    case "ready":
      if (state.lessons.length === 0) {
        return (
          <EmptyState
            titleAs="h3"
            icon={<BookOpen aria-hidden="true" />}
            title="No saved lessons yet"
            description={`Lessons you open while online are saved on this device automatically (the last ${MAX_SAVED_LESSONS}).`}
          />
        );
      }
      return (
        <div className="space-y-4">
          <ul className="divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
            {state.lessons.map((lesson) => (
              <li key={lesson.path}>
                <a
                  href={lesson.path}
                  className="flex min-h-14 items-center gap-3 px-4 py-3 transition-colors hover:bg-subtle focus-visible:-outline-offset-2"
                >
                  <BookOpen aria-hidden="true" className="size-5 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-text">{lesson.title ?? "Untitled lesson"}</span>
                    {lesson.savedAt && (
                      <span className="block text-xs text-muted">Saved {formatSavedAt(lesson.savedAt, DEFAULT_LOCALE)}</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <Button variant="ghost" onClick={() => void removeAll()} loading={removing} loadingText="Removing…">
            Remove saved lessons from this device
          </Button>
        </div>
      );
  }
}
