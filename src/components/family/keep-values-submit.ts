"use client";

import { startTransition, type FormEvent } from "react";

/**
 * `onSubmit` handler that sends the form's data to a `useActionState` dispatcher WITHOUT React's automatic form reset
 * (which happens for `<form action={…}>`). Use it where a failed attempt must keep what the person typed or picked
 * (a mistyped code, a wallet number, a ticked confirmation), so they can correct it instead of starting over.
 *
 * Give such forms `method="post"`: if someone submits before hydration, the browser then never puts the fields
 * (codes, phone numbers, emails) into a URL.
 */
export function keepValuesSubmit(dispatch: (formData: FormData) => void) {
  return (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget, (event.nativeEvent as SubmitEvent).submitter ?? undefined);
    startTransition(() => dispatch(formData));
  };
}
