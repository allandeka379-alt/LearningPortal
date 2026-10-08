"use server";

import { formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { requestSchoolPlan } from "@/server/schools/billing";
import { auditRequest, requireSchoolAction } from "../_lib/context";

/** "Request a school plan": notifies the platform team (no payment is taken online). */
export async function requestPlanAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.billing.request_plan", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    await requestSchoolPlan(
      actor,
      { schoolId, seats: formText(formData, "seats"), planId: formText(formData, "planId"), message: formText(formData, "message") },
      await auditRequest(),
    );
    return { data: null, message: "Request sent. The platform team will contact your school with a quote.", revalidate: ["/school/billing"] };
  });
}
