import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { RadioGroup, type RadioOption } from "@/components/ui/RadioGroup";

export interface ChoiceCardOption {
  /** Submitted value ("" is allowed, e.g. "I'm not sure yet"). */
  value: string;
  label: ReactNode;
  description?: ReactNode;
  /** Listed but not selectable (catalogue "coming soon", §50). */
  comingSoon?: boolean;
  /** Small tag after the label, e.g. "Recommended". */
  tag?: string;
}

export interface ChoiceCardsProps {
  /** The question, read when entering the group (visually hidden when the page heading already asks it). */
  legend: string;
  legendHidden?: boolean;
  name: string;
  options: readonly ChoiceCardOption[];
  defaultValue?: string | null;
  hint?: ReactNode;
  /** Card grid (default) or wrapping chips for short labels such as grades and minutes. */
  layout?: "grid" | "chips";
  /** Native `required` (browsers ask for a choice before posting; the server validates anyway). */
  required?: boolean;
  /** Id of the screen's error region (`StepForm errorId`), so a "Please check your answer" message describes the group. */
  describedBy?: string;
  className?: string;
}

/**
 * Large selectable cards for one onboarding answer (country, board, level, year, examination, ability, grade, goal).
 * Native radios in a fieldset with a legend (§43), styled without JavaScript; "coming soon" options are shown and
 * disabled so students see what is planned without being able to pick it. Server component.
 */
export function ChoiceCards({ legend, legendHidden = true, name, options, defaultValue, hint, layout = "grid", required = true, describedBy, className }: ChoiceCardsProps) {
  const radioOptions: RadioOption[] = options.map((option) => ({
    value: option.value,
    label:
      option.comingSoon || option.tag ? (
        <span className="inline-flex flex-wrap items-center gap-2">
          <span>{option.label}</span>
          {option.comingSoon && (
            <Badge tone="neutral" size="sm">
              Coming soon
            </Badge>
          )}
          {option.tag && !option.comingSoon && (
            <Badge tone="primary" size="sm">
              {option.tag}
            </Badge>
          )}
        </span>
      ) : (
        option.label
      ),
    description: option.description,
    disabled: option.comingSoon === true,
  }));
  return (
    <RadioGroup
      legend={legend}
      legendHidden={legendHidden}
      name={name}
      options={radioOptions}
      defaultValue={defaultValue ?? undefined}
      hint={hint}
      appearance="card"
      orientation={layout === "chips" ? "horizontal" : "vertical"}
      required={required}
      describedBy={describedBy}
      className={className}
    />
  );
}
