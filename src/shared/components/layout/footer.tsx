import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Prestige Academy</h3>
            <p className="text-gray-400">
              Platform tryout online terpercaya untuk persiapan ujian CASN.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">Tentang</Link></li>
              <li><Link href="/packages" className="hover:text-white">Paket</Link></li>
              <li><Link href="/contact" className="hover:text-white">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="#" className="hover:text-white">Tryout CPNS</Link></li>
              <li><Link href="#" className="hover:text-white">Tryout PPPK</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@prestigeacademy.id</li>
              <li>Phone: +62 812-3456-7890</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2024 Prestige Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}