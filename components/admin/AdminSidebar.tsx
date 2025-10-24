"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Squares2X2Icon,
  BuildingStorefrontIcon,
  Cog6ToothIcon,
  ChartPieIcon,
  UsersIcon,
  MapIcon,
  RectangleGroupIcon,
  ShieldCheckIcon,
  BookOpenIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";

const navigation = [
  { href: "/admin", label: "Overview", icon: Squares2X2Icon },
  { href: "/admin/vendors", label: "Vendors", icon: BuildingStorefrontIcon },
  { href: "/admin/products", label: "Services", icon: RectangleGroupIcon },
  { href: "/admin/users", label: "Users", icon: UsersIcon },
  { href: "/admin/categories", label: "Categories", icon: Cog6ToothIcon },
  { href: "/admin/locations", label: "Locations", icon: MapIcon },
  { href: "/admin/reports", label: "Reports", icon: ChartPieIcon },
  { href: "/admin/cms", label: "CMS", icon: BookOpenIcon },
  { href: "/admin/security", label: "Security", icon: ShieldCheckIcon }
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r border-slate-200 bg-white/80 p-6 lg:block">
      <div className="space-y-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Tenant
          </span>
          <p className="mt-2 text-sm font-semibold text-slate-900">Pulse Ventures</p>
          <p className="text-xs text-slate-500">Enterprise · 98 vendors</p>
        </div>
        <nav className="space-y-2 text-sm font-semibold text-slate-600">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-4 py-2 transition",
                  active
                    ? "bg-primary-50 text-primary-600"
                    : "hover:bg-slate-100 hover:text-slate-900"
                )}
              >
                <Icon className={clsx("h-5 w-5", active ? "text-primary-500" : "text-slate-400")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
