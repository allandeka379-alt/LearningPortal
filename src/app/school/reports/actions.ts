"use server";

import { formList, formText, runAdminAction } from "@/components/admin/server-action";
import type { AdminActionState } from "@/components/admin/form-state";
import { requestSchoolReport } from "@/server/schools/reports";
import { auditRequest, requireSchoolAction } from "../_lib/context";

/** Queue a report; it is prepared in the background and appears in the list when ready. */
export async function requestReportAction(_state: AdminActionState, formData: FormData): Promise<AdminActionState> {
  return runAdminAction("school.reports.request", formData, async () => {
    const { actor, schoolId } = await requireSchoolAction();
    const classIds = formList(formData, "classIds");
    const result = await requestSchoolReport(
      actor,
      {
        schoolId,
        kind: formText(formData, "kind"),
        periodStart: formText(formData, "periodStart"),
        periodEnd: formText(formData, "periodEnd"),
        ...(classIds.length ? { classIds } : {}),
      },
      await auditRequest(),
    );
    return { data: result, message: "Report requested. It is being prepared: refresh this page in a minute.", revalidate: ["/school/reports"] };
  });
}
