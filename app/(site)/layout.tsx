import { ReactNode } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
