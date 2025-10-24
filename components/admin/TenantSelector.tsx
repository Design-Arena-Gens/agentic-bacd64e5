"use client";

import useSWR from "swr";
import type { Tenant } from "../../types";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function TenantSelector() {
  const { data: tenants } = useSWR<Tenant[]>("/api/tenants");
  const [selected, setSelected] = useState<string | undefined>(tenants?.[0]?.id);

  useEffect(() => {
    if (tenants?.length && !selected) {
      setSelected(tenants[0].id);
    }
  }, [tenants, selected]);

  if (!tenants?.length) return null;

  return (
    <div className="w-full max-w-xs">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500">
            <span>
              {tenants.find((tenant) => tenant.id === selected)?.name ??
                tenants[0]?.name ??
                "Select tenant"}
            </span>
            <ChevronUpDownIcon className="h-5 w-5 text-slate-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl border border-slate-200 bg-white py-2 text-sm shadow-lg focus:outline-none">
            {tenants.map((tenant) => (
              <Listbox.Option
                key={tenant.id}
                value={tenant.id}
                className={({ active }) =>
                  `flex cursor-pointer items-center justify-between px-4 py-2 ${
                    active ? "bg-primary-50 text-primary-600" : "text-slate-700"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <div>
                      <p className="font-semibold">{tenant.name}</p>
                      <p className="text-xs text-slate-400">
                        {tenant.plan.toUpperCase()} • {tenant.active ? "Active" : "Suspended"}
                      </p>
                    </div>
                    {selected ? <CheckIcon className="h-4 w-4" /> : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
