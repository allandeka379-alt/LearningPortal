import Link from "next/link";
import type { ReactNode } from "react";
import { practiceHref } from "@/components/dashboard/links";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { Tab, TabList, TabPanel, Tabs } from "@/components/ui/Tabs";

export interface MasteryTopicRow {
  topicId: string;
  name: string;
  subjectId: string;
  subjectName: string;
  score: number;
}

export interface MasteryTabsCardProps {
  /** Heading id (unique per page). */
  id: string;
  title?: string;
  description?: string;
  weak: readonly MasteryTopicRow[];
  strong: readonly MasteryTopicRow[];
  weakEmpty: ReactNode;
  strongEmpty: ReactNode;
  /** Hide the subject under each topic (a single-subject page). */
  hideSubject?: boolean;
  className?: string;
}

function TopicRows({ topics, variant, hideSubject }: { topics: readonly MasteryTopicRow[]; variant: "weak" | "strong"; hideSubject: boolean }) {
  return (
    <ul className="space-y-4">
      {topics.map((topic) => (
        <li key={topic.topicId}>
          <MasteryBar label={topic.name} score={topic.score} href={`/app/subjects/${topic.subjectId}/topics/${topic.topicId}`} />
          <div className="mt-1 flex items-center justify-between gap-3 text-xs text-muted">
            <span className="min-w-0 truncate">{hideSubject ? "" : topic.subjectName}</span>
            {variant === "weak" && (
              <Link
                href={practiceHref({ subjectId: topic.subjectId, topicId: topic.topicId, count: 10 })}
                className="-my-3 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                Practise<span className="sr-only"> {topic.name}</span>
              </Link>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

/**
 * Topics to work on and strongest topics in ONE card with two tabs (replaces two stacked lists, §6, §11). Bands are
 * always written out next to the colour (MasteryBar); weak topics offer a targeted practice session. Server component
 * (only the tab switch runs on the client; both panels are in the HTML).
 */
export function MasteryTabsCard({ id, title = "Topic mastery", description, weak, strong, weakEmpty, strongEmpty, hideSubject = false, className }: MasteryTabsCardProps) {
  return (
    <Card as="section" aria-labelledby={id} className={className}>
      <CardHeader titleAs="h2" title={<span id={id}>{title}</span>} description={description} />
      <CardBody className="pt-2 sm:pt-3">
        <Tabs defaultValue="weak" variant="pills">
          <TabList aria-label="Topic mastery views">
            <Tab value="weak">To work on</Tab>
            <Tab value="strong">Strongest</Tab>
          </TabList>
          <TabPanel value="weak">
            {weak.length === 0 ? <div className="text-sm text-muted">{weakEmpty}</div> : <TopicRows topics={weak} variant="weak" hideSubject={hideSubject} />}
          </TabPanel>
          <TabPanel value="strong">
            {strong.length === 0 ? <div className="text-sm text-muted">{strongEmpty}</div> : <TopicRows topics={strong} variant="strong" hideSubject={hideSubject} />}
          </TabPanel>
        </Tabs>
      </CardBody>
    </Card>
  );
}
