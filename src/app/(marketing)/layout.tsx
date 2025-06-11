// prestige-fe/src/app/(marketing)/layout.tsx
import { MarketingHeader } from '@/shared/components/layout/header/marketing-header';
import { Footer } from '@/shared/components/layout/footer'; // Menggunakan nama file index
import { ScrollToTop } from '@/shared/components/ui/scroll-to-top';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}