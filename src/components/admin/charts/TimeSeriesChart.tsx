import { formatLocalDate, formatLocalDateShort } from "../format";
import { LineChart, type LineChartProps } from "./LineChart";

/**
 * Server wrapper for {@link LineChart} over calendar days: formats the date labels on the server (one ICU build),
 * then hands plain strings to the client chart. Use this from Server Components.
 */
export function TimeSeriesChart({ dates, ...props }: Omit<LineChartProps, "labels" | "shortLabels"> & { dates: readonly string[] }) {
  return <LineChart {...props} labels={dates.map((date) => formatLocalDate(date))} shortLabels={dates.map((date) => formatLocalDateShort(date))} />;
}
