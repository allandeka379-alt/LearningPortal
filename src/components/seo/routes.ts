import { SIGN_IN_HREF, SIGN_UP_HREF } from "@/components/marketing/site-nav";

/** Site routes the public curriculum pages link to (UI navigation, not content). Sign-up/in come from the site nav. */
export const PUBLIC_ROUTES = {
  register: SIGN_UP_HREF,
  login: SIGN_IN_HREF,
  pricing: "/pricing",
  schools: "/schools",
  daily: "/daily",
  subjects: "/subjects",
} as const;
