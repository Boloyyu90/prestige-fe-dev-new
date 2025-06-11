// src/shared/components/layout/enhanced-header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/cn';
import { navVariants, overlayVariants } from '@/shared/design-system/motion/variants';
import { useScrollAnimation } from '@/shared/design-system/motion/hooks';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Paket', href: '/packages' },
  { name: 'Tentang', href: '/about' },
  { name: 'Kontak', href: '/contact' },
];

interface MarketingHeaderProps {
  variant?: 'marketing' | 'dashboard' | 'minimal';
  transparent?: boolean;
  sticky?: boolean;
}

export function MarketingHeader({
                                 variant = 'marketing',
                                 transparent = false,
                                 sticky = true
                               }: MarketingHeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollProgress, isScrollingDown } = useScrollAnimation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    'transition-all duration-300 z-50',
    {
      'fixed top-0 left-0 right-0': sticky,
      'bg-white/80 backdrop-blur-md border-b shadow-sm': isScrolled || !transparent,
      'bg-transparent': transparent && !isScrolled,
      'transform -translate-y-full': sticky && isScrollingDown && scrollProgress > 0.1,
      'transform translate-y-0': sticky && (!isScrollingDown || scrollProgress <= 0.1),
    }
  );

  return (
    <motion.header
      className={headerClasses}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <nav className="container mx-auto px-4" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center group">
              <motion.span
                className="text-2xl font-bold gradient-text-animated transition-all duration-300 group-hover:scale-105"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                Prestige Academy
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex items-center space-x-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'relative text-sm font-medium transition-colors hover:text-primary',
                    pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      layoutId="underline"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop CTA */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/login">
              <Button variant="outline" animation="scale">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="gradient" animation="glow">
                Daftar
              </Button>
            </Link>
          </motion.div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <motion.button
              type="button"
              className="text-muted-foreground hover:text-primary transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">Open menu</span>
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden border-t"
              variants={navVariants.mobileMenu}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={navVariants.menuItem}
                    custom={index}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-3 px-4 text-base font-medium rounded-lg transition-colors',
                        pathname === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-muted-foreground hover:text-primary hover:bg-muted'
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-4 pb-4 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button variant="gradient" className="w-full">
                    Daftar
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
