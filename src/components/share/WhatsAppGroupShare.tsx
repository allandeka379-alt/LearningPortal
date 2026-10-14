import { buttonStyles, type ButtonSize } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { cn } from "@/lib/cn";
import { WhatsAppIcon } from "./WhatsAppIcon";

export interface WhatsAppGroupShareProps {
  url: string;
  message?: string;
  label?: string;
  size?: ButtonSize;
  className?: string;
}

function whatsappHref(message: string): string {
  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}

/** Public class/group share CTA for acquisition moments after signup, payment, mocks and daily questions. */
export function WhatsAppGroupShare({ url, message, label = "Share with class/group", size = "md", className }: WhatsAppGroupShareProps) {
  const text = message ?? `Join my class/group on ${APP_NAME}: ${url}`;
  return (
    <a
      href={whatsappHref(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonStyles({
        size,
        className: cn("border-transparent bg-[#25D366] text-white not-disabled:hover:bg-[#1ebe5d]", className),
      })}
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}
