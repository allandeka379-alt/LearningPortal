import { Search } from "lucide-react";
import Link from "next/link";
import { buttonStyles } from "@/components/ui/button-styles";
import { SEARCH_PATH } from "./links";
import { SearchCombobox } from "./SearchCombobox";

/**
 * Search entry for the student top bar (§28). Phones (where the bar already holds streak, countdown, bell and the
 * account menu) get a 44px icon link to /app/search, whose page field has autocomplete; wide screens get the
 * autocomplete field inline. Server component; only the combobox is a client island.
 */
export function HeaderSearch() {
  return (
    <>
      <Link
        href={SEARCH_PATH}
        aria-label="Search"
        className={buttonStyles({ variant: "ghost", iconOnly: true, className: "lg:hidden" })}
      >
        <Search aria-hidden="true" />
      </Link>
      <SearchCombobox
        variant="header"
        label="Search"
        labelHidden
        placeholder="Search"
        className="mr-auto hidden w-full max-w-xs lg:block xl:max-w-sm"
      />
    </>
  );
}
