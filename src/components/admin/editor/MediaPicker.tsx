"use client";

import { ImagePlus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { MediaThumb } from "./MediaThumb";
import type { MediaPick, MediaSearchAction } from "./types";

/**
 * "Insert image" dialog for the markdown editor: searches the media library (description, caption, file name) and
 * inserts `![alt](asset:<id>)` for the chosen file. Uploading happens in the media library itself (alt text and
 * licensing are required there), which the dialog links to.
 */
export function MediaPicker({ searchAction, onPick }: { searchAction: MediaSearchAction; onPick: (pick: MediaPick) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MediaPick[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const request = useRef(0);

  useEffect(() => {
    if (!open) return;
    const ticket = ++request.current;
    const timer = setTimeout(() => {
      startTransition(async () => {
        const result = await searchAction(query);
        if (ticket !== request.current) return;
        if (result?.ok) {
          setResults(result.data);
          setError(null);
        } else {
          setError(result?.error.message ?? "Search failed.");
        }
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [open, query, searchAction]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      size="lg"
      title="Insert an image"
      description="Choose an uploaded image or diagram. Its description becomes the alt text; edit it in the text if this use needs a different one."
      trigger={
        <Button type="button" variant="ghost" size="sm" iconStart={<ImagePlus aria-hidden="true" />}>
          Image
        </Button>
      }
    >
      <div className="space-y-4">
        <Field label="Search the media library">
          <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} startIcon={<Search />} placeholder="Description, caption or file name" autoComplete="off" />
        </Field>
        <p className="sr-only" aria-live="polite">
          {pending ? "Searching…" : results ? `${results.length} images found` : ""}
        </p>
        {error && <p className="text-sm text-danger-text">{error}</p>}
        {results && results.length === 0 && (
          <p className="text-sm text-muted">
            No images match. <Link href="/admin/media" className="font-medium text-primary underline underline-offset-2">Upload one in the media library</Link>.
          </p>
        )}
        {results && results.length > 0 && (
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {results.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full flex-col gap-1 rounded-control border border-border bg-surface p-2 text-left hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
                  onClick={() => {
                    onPick(item);
                    setOpen(false);
                  }}
                >
                  <span className="flex h-24 items-center justify-center overflow-hidden rounded-sm bg-subtle">
                    <MediaThumb src={item.src} alt="" width={item.width} height={item.height} />
                  </span>
                  <span className="line-clamp-2 text-xs text-text">{item.altText ?? "No description"}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Dialog>
  );
}
