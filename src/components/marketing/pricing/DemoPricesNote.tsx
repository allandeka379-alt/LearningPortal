import { Alert } from "@/components/ui/Alert";

/** Development-only flag on dev-seed demo prices (CLAUDE.md rule 6: demo data is always labelled as demo). */
export function DemoPricesNote({ className }: { className?: string }) {
  return (
    <Alert tone="warning" title="Demo prices" className={className}>
      These prices come from the development seed data. Real prices are set by an administrator before launch.
    </Alert>
  );
}
