import { z } from "zod";
import { apiRoute } from "@/server/lib/api";
import { readMultipartUpload } from "@/server/lib/uploads";
import { assertMayUpload, storeUpload, UPLOAD_ROUTE_PURPOSES, uploadCapFor } from "@/server/uploads/service";

/**
 * POST /api/v1/uploads?purpose=media|import|solver — streamed file uploads (ARCHITECTURE §3.11), so large files do not
 * need a bigger Server Action body limit for everyone. `multipart/form-data` with one `file` part plus the purpose's
 * text fields (media: alt text and licensing; import: subject, source, defaults; solver: none).
 *
 * Order matters: authentication (session cookie with the same-origin CSRF check, or a bearer token) and the purpose's
 * permission are checked BEFORE the body is read; the body is then read with a hard byte cap per purpose (refused on
 * `Content-Length`, cut off mid-stream otherwise); the bytes are type-checked by magic bytes; the purpose's service
 * stores the file (re-encoding, rate limit, audit). Responds 201 `{ data: { kind, id, … } }`.
 */

export const POST = apiRoute(
  {
    auth: "required",
    operation: "api.v1.uploads",
    input: { query: z.object({ purpose: z.enum(UPLOAD_ROUTE_PURPOSES, { message: "Choose what the upload is for." }) }) },
  },
  async ({ request, actor, query, requestId, ip, userAgent }) => {
    await assertMayUpload(actor, query.purpose);
    const upload = await readMultipartUpload(request, { maxFileBytes: await uploadCapFor(query.purpose) });
    const result = await storeUpload(actor, query.purpose, upload, { requestId, ip, userAgent });
    return Response.json({ data: result }, { status: 201 });
  },
);
