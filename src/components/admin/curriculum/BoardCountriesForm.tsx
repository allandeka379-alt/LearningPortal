import { ActionForm } from "@/components/admin/ActionForm";
import type { AdminFormAction } from "@/components/admin/form-state";

/**
 * Where a board is offered (onboarding lists boards per country). One row per country: offered (checkbox) and its
 * position in that country's list. Unticking keeps the history (the link is deactivated, never deleted).
 * Server component around the shared `ActionForm`.
 */
export function BoardCountriesForm({
  action,
  boardId,
  countries,
  links,
  disabled,
}: {
  action: AdminFormAction<unknown>;
  boardId: string;
  countries: readonly { id: string; name: string; isoCode: string }[];
  links: readonly { countryId: string; isActive: boolean; sortOrder: number }[];
  disabled: boolean;
}) {
  const byCountry = new Map(links.map((link) => [link.countryId, link]));
  const table = (
    <fieldset className="min-w-0 md:col-span-2" disabled={disabled}>
      <legend className="mb-2 text-sm font-medium text-text">Offered in</legend>
      <div className="relative overflow-x-auto rounded-card border border-border">
        <table className="w-full text-sm">
          <caption className="sr-only">Countries where this board is offered, and its order in each country&apos;s onboarding list</caption>
          <thead>
            <tr className="border-b border-border text-left text-xs tracking-wide text-muted uppercase">
              <th scope="col" className="px-3 py-2 font-semibold">
                Country
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Order in onboarding
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {countries.map((country, index) => {
              const link = byCountry.get(country.id);
              const checkboxId = `country-${country.id}`;
              return (
                <tr key={country.id}>
                  <td className="px-3 py-1">
                    <input type="hidden" name={`links.${index}.countryId`} value={country.id} />
                    <label htmlFor={checkboxId} className="flex min-h-11 cursor-pointer items-center gap-3">
                      <input id={checkboxId} type="checkbox" name={`links.${index}.isActive`} defaultChecked={link?.isActive ?? false} className="size-5 accent-primary" />
                      <span>
                        {country.name} <span className="text-muted">({country.isoCode})</span>
                      </span>
                    </label>
                  </td>
                  <td className="px-3 py-1">
                    <input
                      type="number"
                      min={0}
                      name={`links.${index}.sortOrder`}
                      defaultValue={link?.sortOrder ?? 0}
                      aria-label={`Order of this board in ${country.name}'s list`}
                      className="min-h-11 w-24 rounded-control border border-border-strong bg-surface px-3 text-text"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </fieldset>
  );
  if (disabled) return table;
  return (
    <ActionForm action={action} submitLabel="Save availability" hiddenFields={{ boardId }} successAs="toast" columns="two">
      {table}
    </ActionForm>
  );
}
