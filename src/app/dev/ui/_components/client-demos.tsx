"use client";

import { LogOut, Settings, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose } from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Tag } from "@/components/ui/Tag";
import { useToast, type ToastTone } from "@/components/ui/Toast";

const TOAST_SAMPLES: { tone: ToastTone; title: string; description?: string; label: string }[] = [
  { tone: "success", title: "Answer saved", label: "Success" },
  { tone: "info", title: "New lesson available", description: "Sample description text.", label: "Info" },
  { tone: "warning", title: "Connection is slow", description: "Changes will sync when you're back online.", label: "Warning" },
  { tone: "danger", title: "Couldn't save", description: "Please try again.", label: "Danger" },
  { tone: "neutral", title: "Copied to clipboard", label: "Neutral" },
];

export function ToastDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      {TOAST_SAMPLES.map((sample) => (
        <Button
          key={sample.tone}
          variant="outline"
          onClick={() => toast({ title: sample.title, description: sample.description, tone: sample.tone })}
        >
          {sample.label} toast
        </Button>
      ))}
      <Button variant="ghost" onClick={() => toast({ title: "Stays until dismissed", duration: null })}>
        Persistent toast
      </Button>
    </div>
  );
}

export function ControlledDialogDemo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { toast } = useToast();
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open controlled dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Rename study plan"
        description="Focus starts in the input (data-autofocus) and returns to the button on close."
        footer={
          <>
            <DialogClose>Cancel</DialogClose>
            <Button
              onClick={() => {
                setOpen(false);
                toast({ title: `Renamed to “${name || "Untitled"}”`, tone: "success" });
              }}
            >
              Save
            </Button>
          </>
        }
      >
        <Field label="Plan name">
          <Input data-autofocus value={name} onChange={(event) => setName(event.target.value)} />
        </Field>
      </Dialog>
    </>
  );
}

export function RemovableTagsDemo() {
  const [tags, setTags] = useState(["Mathematics", "Physics", "English Language"]);
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Tag key={tag} onRemove={() => setTags((current) => current.filter((t) => t !== tag))} removeLabel={`Remove ${tag}`}>
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && (
        <Button size="sm" variant="ghost" onClick={() => setTags(["Mathematics", "Physics", "English Language"])}>
          Reset tags
        </Button>
      )}
    </div>
  );
}

export function DropdownMenuDemo() {
  const { toast } = useToast();
  return (
    <div className="flex flex-wrap gap-4">
      <DropdownMenu trigger="Options">
        <DropdownMenuItem onSelect={() => toast({ title: "Duplicated" })}>Duplicate</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => toast({ title: "Archived" })}>Archive</DropdownMenuItem>
        <DropdownMenuItem disabled>Export (disabled)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem tone="danger" onSelect={() => toast({ title: "Deleted", tone: "danger" })}>
          Delete
        </DropdownMenuItem>
      </DropdownMenu>
      <DropdownMenu trigger="Account" align="start">
        <DropdownMenuLabel>Signed in as Sample Student</DropdownMenuLabel>
        <DropdownMenuItem href="/dev/ui#navigation" icon={<User aria-hidden="true" />}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem href="/dev/ui#navigation" icon={<Settings aria-hidden="true" />}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<LogOut aria-hidden="true" />} onSelect={() => toast({ title: "Signed out (demo)" })}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenu>
    </div>
  );
}

export function ControlledSwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div>
      <Switch
        label="Daily reminder"
        description={`Controlled: currently ${on ? "on" : "off"}.`}
        checked={on}
        onCheckedChange={setOn}
      />
    </div>
  );
}
