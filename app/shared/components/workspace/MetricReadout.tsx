interface MetricReadoutProps {
  readonly label: string;
  readonly value: string | number;
  readonly note?: string;
}

export function MetricReadout({ label, value, note }: MetricReadoutProps) {
  return <div className="min-w-0 border-l-2 border-hairline px-4 py-1 first:border-l-0 first:pl-0"><p className="workspace-kicker truncate">{label}</p><p className="mt-2 truncate text-xl font-semibold tabular-nums text-ink">{value}</p>{note && <p className="mt-1 truncate text-xs text-ink-muted">{note}</p>}</div>;
}
