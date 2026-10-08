import { Inbox } from "lucide-react";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatTile } from "@/components/ui/StatTile";

const TITLES: Record<string, string> = {
  home: "Home",
  subjects: "Subjects",
  practice: "Practice",
  exams: "Exams",
  progress: "Progress",
  flashcards: "Flashcards",
  plan: "Study plan",
  tutor: "AI tutor",
  profile: "Profile",
  settings: "Settings",
};

export default async function AppShellPreviewPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  if (process.env.NODE_ENV === "production") notFound();
  const { slug } = await params;
  const key = slug?.[0] ?? "home";
  const title = TITLES[key] ?? key;

  return (
    <Container>
      <PageHeader
        title={title}
        description="AppShell preview. Below 1024px: top bar + bottom tab bar (first five items). From 1024px: sidebar."
        breadcrumbs={slug ? [{ label: "Home", href: "/dev/shell/app" }, { label: title }] : undefined}
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Questions attempted" value={null} />
        <StatTile label="Accuracy" value={null} />
        <StatTile label="Current streak" value={null} />
        <StatTile label="Mock exam average" value={null} />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <EmptyState
          motif
          icon={<Inbox aria-hidden="true" />}
          title="Nothing here yet"
          description="Honest empty state: dashboards show real values or this — never invented numbers."
          action={<ButtonLink href="/dev/shell/app/practice">Start practising</ButtonLink>}
        />
        <Card>
          <CardHeader title="Scroll test" description="Long content checks the tab bar never covers the page end." />
          <CardBody className="space-y-3 text-sm text-muted">
            {Array.from({ length: 14 }, (_, i) => (
              <p key={i}>Row {i + 1}</p>
            ))}
            <p className="font-semibold text-text">End of page content.</p>
          </CardBody>
        </Card>
      </div>
    </Container>
  );
}
