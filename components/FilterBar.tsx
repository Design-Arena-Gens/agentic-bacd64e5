'use client';

import useSWR from 'swr';
import type { Category, Location } from '../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon, MapPinIcon, Squares2X2Icon } from '@heroicons/react/24/outline';

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories } = useSWR<Category[]>('/api/categories');
  const { data: locations } = useSWR<Location[]>('/api/locations');

  const setParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  const currentCategory = searchParams?.get('categoryId');
  const currentLocation = searchParams?.get('locationId');

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-sm">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
          <Squares2X2Icon className="h-4 w-4" />
          {currentCategory
            ? categories?.find((category) => category.id === currentCategory)?.name ??
              'Category'
            : 'Category'}
          <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-2xl border border-slate-200 bg-white p-2 shadow-lg focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setParam('categoryId')}
                  className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                    active ? 'bg-primary-50 text-primary-600' : 'text-slate-600'
                  }`}
                >
                  All categories
                </button>
              )}
            </Menu.Item>
            {categories?.map((category) => (
              <Menu.Item key={category.id}>
                {({ active }) => (
                  <button
                    onClick={() => setParam('categoryId', category.id)}
                    className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                      active ? 'bg-primary-50 text-primary-600' : 'text-slate-600'
                    }`}
                  >
                    {category.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary-200 hover:bg-primary-50 hover:text-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500">
          <MapPinIcon className="h-4 w-4" />
          {currentLocation
            ? locations?.find((location) => location.id === currentLocation)?.name ?? 'Location'
            : 'Location'}
          <ChevronDownIcon className="h-4 w-4" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-2xl border border-slate-200 bg-white p-2 shadow-lg focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setParam('locationId')}
                  className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                    active ? 'bg-primary-50 text-primary-600' : 'text-slate-600'
                  }`}
                >
                  All locations
                </button>
              )}
            </Menu.Item>
            {locations?.map((location) => (
              <Menu.Item key={location.id}>
                {({ active }) => (
                  <button
                    onClick={() => setParam('locationId', location.id)}
                    className={`w-full rounded-xl px-4 py-2 text-left text-sm ${
                      active ? 'bg-primary-50 text-primary-600' : 'text-slate-600'
                    }`}
                  >
                    {location.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
