import {
  Award,
  Bell,
  BookOpen,
  Bot,
  Building,
  CalendarClock,
  CalendarDays,
  ChartColumn,
  ChartLine,
  CircleQuestionMark,
  ClipboardCheck,
  ClipboardList,
  CreditCard,
  FileText,
  Flag,
  FolderTree,
  Gauge,
  GraduationCap,
  House,
  Images,
  Landmark,
  Layers,
  LayoutDashboard,
  Library,
  LifeBuoy,
  ListTree,
  MessageCircle,
  NotebookPen,
  Package,
  Presentation,
  Receipt,
  Scale,
  School,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tags,
  Target,
  TicketPercent,
  Trophy,
  Upload,
  User,
  UserPlus,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { NavItem, ResolvedNavItem } from "./nav-types";

/**
 * Icon registry for navigation config. Nav items reference icons by NAME so nav definitions stay plain,
 * serialisable data (usable from config files, the DB or the API). Shells resolve names to elements on the server,
 * so this map never ships to the client; only the rendered icons do.
 *
 * Add icons here when a new area needs them (keep names semantic, not visual).
 */
export const NAV_ICONS = {
  home: House,
  dashboard: LayoutDashboard,
  subjects: BookOpen,
  lessons: Library,
  practice: Target,
  exams: ClipboardList,
  flashcards: Layers,
  progress: ChartLine,
  plan: CalendarDays,
  tutor: Sparkles,
  search: Search,
  leaderboard: Trophy,
  notifications: Bell,
  settings: Settings,
  profile: User,
  users: Users,
  /** Invite someone (referrals, §46). */
  invite: UserPlus,
  students: GraduationCap,
  teachers: Presentation,
  classes: UsersRound,
  children: UsersRound,
  school: School,
  schools: Building,
  boards: Landmark,
  qualifications: Award,
  syllabuses: FolderTree,
  topics: ListTree,
  questions: CircleQuestionMark,
  packs: Package,
  ai: Bot,
  subscriptions: Receipt,
  payments: CreditCard,
  analytics: ChartColumn,
  reports: FileText,
  content: NotebookPen,
  imports: Upload,
  audit: ShieldCheck,
  messages: MessageCircle,
  help: LifeBuoy,
  /** Admin review queue (content awaiting approval). */
  review: ClipboardCheck,
  /** Content quality flags ("Report a problem", §42). */
  flags: Flag,
  /** Plans & prices. */
  plans: Tags,
  /** Media library. */
  media: Images,
  /** Exam sessions (sitting dates). */
  sessions: CalendarClock,
  /** Grade schemes (grade boundaries). */
  grades: Scale,
  /** Promo codes. */
  promos: TicketPercent,
  /** Usage and spend dashboards. */
  usage: Gauge,
  /** Configuration of a feature area (e.g. AI settings). */
  tuning: SlidersHorizontal,
} as const satisfies Record<string, LucideIcon>;

export type NavIconName = keyof typeof NAV_ICONS;

/** Renders a registry icon as a decorative element. */
export function NavIcon({ name, className }: { name: NavIconName; className?: string }) {
  const Icon = NAV_ICONS[name];
  return <Icon aria-hidden="true" className={className} />;
}

/** Resolves icon names to rendered elements (call on the server before handing items to client nav). */
export function resolveNavItems(items: readonly NavItem[]): ResolvedNavItem[] {
  return items.map(({ icon, ...rest }) => ({ ...rest, icon: <NavIcon name={icon} /> }));
}
