import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pagination } from "@/components/ui/Pagination";

interface SampleRow {
  id: string;
  title: string;
  status: "DRAFT" | "IN_REVIEW" | "PUBLISHED";
  aiGenerated: boolean;
}

const ROWS: SampleRow[] = [
  { id: "q1", title: "Sample question A", status: "DRAFT", aiGenerated: true },
  { id: "q2", title: "Sample question B", status: "IN_REVIEW", aiGenerated: false },
  { id: "q3", title: "Sample question C", status: "PUBLISHED", aiGenerated: false },
];

const STATUS_TONE = { DRAFT: "neutral", IN_REVIEW: "warning", PUBLISHED: "success" } as const;

const COLUMNS: DataTableColumn<SampleRow>[] = [
  { key: "title", header: "Title", primary: true, cell: (row) => row.title },
  {
    key: "status",
    header: "Status",
    cell: (row) => <Badge tone={STATUS_TONE[row.status]}>{row.status.replace("_", " ").toLowerCase()}</Badge>,
  },
  { key: "source", header: "Source", cell: (row) => (row.aiGenerated ? <Badge tone="info">AI draft</Badge> : "Editor") },
];

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default async function AdminShellPreviewPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const title = slug?.[0] ? titleCase(slug[0]) : "Dashboard";

  return (
    <Container size="wide">
      <PageHeader
        title={title}
        description="AdminShell preview: grouped dense sidebar from 1024px; below that, a menu button opens the same navigation in a sheet."
        actions={<Button>New item</Button>}
      />
      <DataTable caption={`${title} (sample rows)`} columns={COLUMNS} rows={ROWS} rowKey={(row) => row.id} />
      <Pagination className="mt-4" nextHref="/dev/shell/admin/questions?cursor=sample" summary="Sample pagination" />
    </Container>
  );
}
