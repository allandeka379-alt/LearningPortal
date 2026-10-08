import { serializeJsonLd, type JsonLd as JsonLdData } from "@/server/seo/structured-data";

/**
 * Inline schema.org JSON-LD (§44). The payload is built by the pure builders in `src/server/seo/structured-data.ts`
 * and serialised by `serializeJsonLd`, which escapes `<`, `>` and `&`: text from the CMS can never close the script
 * element. React would HTML-escape a text child (corrupting the JSON), hence the audited `dangerouslySetInnerHTML`.
 */
export function JsonLd({ data }: { data: JsonLdData | readonly JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger -- JSON-LD serialised by serializeJsonLd (script-safe escaping)
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
