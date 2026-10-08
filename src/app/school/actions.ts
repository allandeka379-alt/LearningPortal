"use server";

import { redirect } from "next/navigation";
import { requireRoleForAction } from "@/server/auth/guards";
import { isAppError } from "@/server/lib/errors";
import { setCurrentSchool } from "./_lib/context";

/** Switches the admin's current school (account menu). Refusals simply return to the overview. */
export async function switchSchoolAction(formData: FormData): Promise<void> {
  const actor = await requireRoleForAction("SCHOOL_ADMIN");
  const schoolId = formData.get("schoolId");
  if (typeof schoolId === "string") {
    try {
      await setCurrentSchool(actor, schoolId);
    } catch (error) {
      if (!isAppError(error)) throw error;
    }
  }
  redirect("/school");
}
