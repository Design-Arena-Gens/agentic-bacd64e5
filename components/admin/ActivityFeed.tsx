import dataStore from '../../lib/store';

export default function ActivityFeed() {
  const activities = dataStore.getActivities(10);

  return (
    <section className="glass-panel h-full overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Recent activity
        </h2>
      </div>
      <ul className="divide-y divide-slate-200">
        {activities.map((activity) => (
          <li key={activity.id} className="px-5 py-4">
            <p className="text-sm font-semibold text-slate-700">{activity.actor}</p>
            <p className="mt-1 text-sm text-slate-500">{activity.action}</p>
            <p className="text-xs text-slate-400">{activity.target}</p>
            <p className="mt-1 text-xs text-slate-400">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
