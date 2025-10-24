import dataStore from '../../../lib/store';

export default function AdminUsersPage() {
  const users = dataStore.getUsers();

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">User directory</h2>
        <p className="text-sm text-slate-500">
          Manage customers, assign roles, and monitor authentication health across tenants.
        </p>
      </header>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Name
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Email
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Role
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Tenant
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Status
              </th>
              <th scope="col" className="px-5 py-3 text-left font-semibold">
                Last login
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-600">
            {users.map((user) => {
              const tenant = user.tenantId
                ? dataStore.getTenants().find((item) => item.id === user.tenantId)?.name
                : 'Global';
              return (
                <tr key={user.id}>
                  <td className="px-5 py-4 font-semibold text-slate-800">{user.fullName}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4 capitalize">{user.role.replace('-', ' ')}</td>
                  <td className="px-5 py-4">{tenant}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`badge ${
                        user.status === 'active'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
