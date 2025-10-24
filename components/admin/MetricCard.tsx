type MetricCardProps = {
  label: string;
  value: string;
  change?: {
    value: string;
    positive?: boolean;
  };
  caption?: string;
};

export default function MetricCard({ label, value, change, caption }: MetricCardProps) {
  return (
    <article className="glass-panel flex flex-col gap-3 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-3xl font-semibold text-slate-900">{value}</p>
      {caption ? <p className="text-xs text-slate-500">{caption}</p> : null}
      {change ? (
        <p
          className={`text-xs font-semibold ${
            change.positive ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {change.positive ? '▲' : '▼'} {change.value}
        </p>
      ) : null}
    </article>
  );
}
