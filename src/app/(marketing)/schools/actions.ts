"use server";

import { safeAction, type ActionResult } from "@/server/lib/errors";
import { getClientIp } from "@/server/lib/request";
import { submitSchoolEnquiry } from "@/server/marketing/enquiry";
import { enquiryFromFormData } from "@/server/marketing/enquiry-schema";

/**
 * /schools "Talk to us" (§53). Thin: parse the form, hand it to the enquiry service (validation, rate limits, delivery to
 * platform admins and the support inbox). Reading the client IP here keeps the page itself static.
 */
const submit = safeAction(
  async (formData: FormData) => submitSchoolEnquiry(enquiryFromFormData(formData), { ip: await getClientIp() }),
  { operation: "marketing.schoolEnquiry" },
);

export async function submitSchoolEnquiryAction(_previous: ActionResult<{ reference: string }> | null, formData: FormData): Promise<ActionResult<{ reference: string }>> {
  return submit(formData);
}
