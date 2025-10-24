import { ReactNode } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import TenantSelector from '../../components/admin/TenantSelector';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="flex-1 overflow-hidden">
        <AdminHeader />
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <TenantSelector />
        </div>
        <main className="space-y-6 p-6">{children}</main>
      </div>
    </div>
  );
}
