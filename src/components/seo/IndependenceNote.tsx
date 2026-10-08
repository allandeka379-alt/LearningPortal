import { APP_NAME } from "@/lib/config";

/**
 * Plain statement that the platform is independent of the examination board whose name appears on the page (board
 * names are trademarks of their owners; we must never look official). Server component.
 */
export function IndependenceNote({ boardName, className }: { boardName: string; className?: string }) {
  return (
    <p className={className ?? "text-xs text-muted"}>
      {APP_NAME} is an independent study platform. It is not affiliated with or endorsed by {boardName}.
    </p>
  );
}
