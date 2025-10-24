'use client';

import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';
import { ReactNode, useEffect } from 'react';
import useRealtime from '../hooks/useRealtime';

export default function Providers({ children }: { children: ReactNode }) {
  const { initialize } = useRealtime();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(resource, init).then((res) => {
              if (!res.ok) {
                throw new Error('Unable to load data');
              }
              return res.json();
            }),
          revalidateOnFocus: true,
          dedupingInterval: 2000
        }}
      >
        {children}
      </SWRConfig>
    </ThemeProvider>
  );
}
