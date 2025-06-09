import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">Prestige Academy</h3>
            <p className="text-gray-400 text-sm">
              Platform tryout online terpercaya untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-400 hover:text-primary transition-colors">
                  Paket Tryout
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tryout-cpns" className="text-gray-400 hover:text-primary transition-colors">
                  Tryout CPNS
                </Link>
              </li>
              <li>
                <Link href="/tryout-pppk" className="text-gray-400 hover:text-primary transition-colors">
                  Tryout PPPK
                </Link>
              </li>
              <li>
                <Link href="/tryout-kedinasan" className="text-gray-400 hover:text-primary transition-colors">
                  Tryout Kedinasan
                </Link>
              </li>
              <li>
                <Link href="/event" className="text-gray-400 hover:text-primary transition-colors">
                  Event Tryout
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@prestigeacademy.id</li>
              <li>Phone: +62 812-3456-7890</li>
              <li>WhatsApp: +62 812-3456-7890</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Prestige Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}