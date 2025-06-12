import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Paket', href: '/packages' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
];

export function MarketingHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Prestige Academy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button>Daftar</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white py-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-4 space-y-2 px-4">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full">Masuk</Button>
              </Link>
              <Link href="/register" className="block">
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}