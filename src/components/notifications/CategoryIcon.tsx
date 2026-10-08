import { AlarmClock, Award, Bell, BookOpen, ClipboardList, CreditCard, Info, Megaphone, ShieldCheck, UserRound, Users, type LucideIcon } from "lucide-react";
import type { NotificationCategoryKey } from "./format";

const ICONS: Readonly<Record<NotificationCategoryKey, LucideIcon>> = {
  ACCOUNT: UserRound,
  SECURITY: ShieldCheck,
  LEARNING: BookOpen,
  REMINDER: AlarmClock,
  ASSIGNMENT: ClipboardList,
  ANNOUNCEMENT: Megaphone,
  PARENT: Users,
  BILLING: CreditCard,
  ACHIEVEMENT: Award,
  SYSTEM: Info,
};

/** Decorative icon for a notification category (the category is always also shown as text). Server-compatible. */
export function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const Icon = ICONS[category as NotificationCategoryKey] ?? Bell;
  return <Icon aria-hidden="true" className={className} />;
}
