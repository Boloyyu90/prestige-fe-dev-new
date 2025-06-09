import { MarketingHeader } from '@/shared/components/layout/header/marketing-header'
import { Footer } from '@/shared/components/layout/footer'
import { ScrollToTop } from '@/shared/components/ui/scroll-to-top'

export default function MarketingLayout({
                                          children,
                                        }: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketingHeader />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}