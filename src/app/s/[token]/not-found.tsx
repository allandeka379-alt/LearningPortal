import { Link2Off } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { APP_NAME } from "@/lib/config";

/** A share link that was turned off, has expired or never existed (§46). Says nothing about whose it was. */
export default function ShareNotFound() {
  return (
    <EmptyState
      icon={<Link2Off aria-hidden="true" />}
      title="This link isn't available"
      description="It may have been turned off by the person who shared it, or it has expired."
      action={<ButtonLink href="/register">Try {APP_NAME} for free</ButtonLink>}
    />
  );
}
