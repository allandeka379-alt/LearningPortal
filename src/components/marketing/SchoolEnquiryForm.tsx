"use client";

import { CircleCheck, Send } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState, type FormEvent } from "react";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type { ActionResult } from "@/server/lib/errors";

export type EnquiryAction = (previous: ActionResult<{ reference: string }> | null, formData: FormData) => Promise<ActionResult<{ reference: string }>>;

export interface SchoolEnquiryFormProps {
  action: EnquiryAction;
  /** Examination boards from the catalogue (short names), offered as checkboxes. */
  boards: readonly string[];
  /** Privacy notice link shown next to the consent box. */
  privacyHref: string;
}

interface Values {
  schoolName: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  learners: string;
  message: string;
  boards: string[];
  consent: boolean;
}

const EMPTY: Values = { schoolName: "", contactName: "", role: "", email: "", phone: "", learners: "", message: "", boards: [], consent: false };

function readValues(form: HTMLFormElement): Values {
  const data = new FormData(form);
  const text = (name: string) => {
    const value = data.get(name);
    return typeof value === "string" ? value : "";
  };
  return {
    schoolName: text("schoolName"),
    contactName: text("contactName"),
    role: text("role"),
    email: text("email"),
    phone: text("phone"),
    learners: text("learners"),
    message: text("message"),
    boards: data.getAll("boards").filter((value): value is string => typeof value === "string"),
    consent: data.get("consent") === "on",
  };
}

/**
 * "Talk to us" form for schools (§53). Works before hydration (a plain form post to the Server Action); once hydrated,
 * typed values are mirrored into `defaultValue`s so React's automatic form reset after the action never wipes what a
 * visitor typed when there is a validation error. Errors are tied to fields (`Field`) and summarised in an alert.
 */
export function SchoolEnquiryForm({ action, boards, privacyHref }: SchoolEnquiryFormProps) {
  const [result, formAction, pending] = useActionState(action, null);
  const [values, setValues] = useState<Values>(EMPTY);
  const [dismissed, setDismissed] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const success = result?.ok ? result.data : null;
  const error = result && !result.ok ? result.error : null;
  const fieldErrors = error?.fieldErrors ?? {};
  const showSuccess = success !== null && dismissed !== success.reference;

  useEffect(() => {
    if (showSuccess) successRef.current?.focus();
  }, [showSuccess]);
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  if (showSuccess) {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="rounded-card border border-success/40 bg-success-soft p-6 outline-none">
        <div className="flex gap-3">
          <CircleCheck aria-hidden="true" className="mt-0.5 size-6 shrink-0 text-success-text" />
          <div>
            <h3 className="text-lg font-semibold text-text">Thank you, we have your enquiry</h3>
            <p className="mt-1 text-sm text-text">
              Someone from our team will get back to you. Your reference is <strong className="font-semibold">{success.reference}</strong>.
            </p>
            <Button
              variant="ghost"
              className="mt-4 -ml-3"
              onClick={() => {
                setValues(EMPTY);
                setDismissed(success.reference);
              }}
            >
              Send another enquiry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const onChange = (event: FormEvent<HTMLFormElement>) => setValues(readValues(event.currentTarget));
  const firstError = error ? (Object.values(fieldErrors).flat()[0] ?? error.message) : null;

  return (
    <form action={formAction} onChange={onChange} noValidate className="space-y-5" aria-describedby={error ? "enquiry-error" : undefined}>
      {error && (
        <div ref={errorRef} tabIndex={-1} id="enquiry-error" className="outline-none">
          <Alert role="alert" tone="danger" title={error.code === "VALIDATION" ? "Please check the form" : "Your enquiry wasn't sent"}>
            {error.code === "VALIDATION" ? firstError : error.message}
          </Alert>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="School name" error={fieldErrors.schoolName} className="sm:col-span-2">
          <Input name="schoolName" autoComplete="organization" required maxLength={200} defaultValue={values.schoolName} />
        </Field>
        <Field label="Your name" error={fieldErrors.contactName}>
          <Input name="contactName" autoComplete="name" required maxLength={120} defaultValue={values.contactName} />
        </Field>
        <Field label="Your role" optional hint="For example: head, deputy head, head of department" error={fieldErrors.role}>
          <Input name="role" autoComplete="organization-title" maxLength={120} defaultValue={values.role} />
        </Field>
        <Field label="Work email" error={fieldErrors.email}>
          <Input name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} defaultValue={values.email} />
        </Field>
        <Field label="Phone number" optional hint="If you would like us to call you." error={fieldErrors.phone}>
          <Input name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={24} defaultValue={values.phone} />
        </Field>
        <Field label="Approximate number of learners" optional error={fieldErrors.learners}>
          <Input name="learners" inputMode="numeric" pattern="[0-9]*" maxLength={6} defaultValue={values.learners} />
        </Field>
      </div>

      {boards.length > 0 && (
        <fieldset>
          <legend className="text-sm font-medium text-text">
            Examination boards you teach <span className="font-normal text-muted">(optional)</span>
          </legend>
          <div className="mt-1 flex flex-wrap gap-x-6">
            {boards.map((board) => (
              <Checkbox key={board} name="boards" value={board} label={board} defaultChecked={values.boards.includes(board)} />
            ))}
          </div>
        </fieldset>
      )}

      <Field label="What would you like to know?" optional error={fieldErrors.message}>
        <Textarea name="message" rows={5} maxLength={2000} defaultValue={values.message} />
      </Field>

      {/* Honeypot for bots: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="enquiry-website">Website</label>
        <input id="enquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <Checkbox
          name="consent"
          required
          defaultChecked={values.consent}
          invalid={Boolean(fieldErrors.consent)}
          aria-describedby={fieldErrors.consent ? "enquiry-consent-error" : undefined}
          label="You may contact me about this enquiry."
          description="We use these details only to reply to this enquiry and to set up your school if you go ahead."
        />
        {fieldErrors.consent && (
          <p id="enquiry-consent-error" className="text-sm text-danger-text">
            {fieldErrors.consent[0]}
          </p>
        )}
        <p className="mt-1 text-sm text-muted">
          Read how we handle personal data in our{" "}
          <Link href={privacyHref} className="text-primary underline underline-offset-4">
            privacy notice
          </Link>
          .
        </p>
      </div>

      <Button type="submit" size="lg" loading={pending} loadingText="Sending…" iconEnd={<Send aria-hidden="true" />} className="w-full sm:w-auto">
        Send enquiry
      </Button>
    </form>
  );
}
