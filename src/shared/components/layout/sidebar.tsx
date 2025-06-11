'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Package,
  FileText,
  CreditCard,
  User,
  Settings,
  Users,
  HelpCircle,
  BarChart3,
  Calendar,
  Bell
} from 'lucide-react';
import { cn } from '@/shared/lib/utils/cn';
import { navVariants } from '@/shared/design-system/motion/variants';

interface SidebarItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
  children?: SidebarItem[];
}

interface SidebarProps {
  variant?: 'dashboard' | 'admin';
  collapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const dashboardItems: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: Home },
  { id: 'packages', label: 'Paket Saya', href: '/dashboard/packages', icon: Package, badge: 'New' },
  { id: 'tests', label: 'Riwayat Tryout', href: '/dashboard/tests', icon: FileText },
  { id: 'schedule', label: 'Jadwal', href: '/dashboard/schedule', icon: Calendar, badge: 3 },
  { id: 'transactions', label: 'Transaksi', href: '/dashboard/transactions', icon: CreditCard },
  { id: 'profile', label: 'Profil', href: '/dashboard/profile', icon: User },
  { id: 'settings', label: 'Pengaturan', href: '/dashboard/settings', icon: Settings },
  { id: 'help', label: 'Bantuan', href: '/dashboard/help', icon: HelpCircle },
];

const adminItems: SidebarItem[] = [
  { id: 'admin-dashboard', label: 'Dashboard', href: '/admin/dashboard', icon: BarChart3 },
  { id: 'users', label: 'Pengguna', href: '/admin/users', icon: Users, badge: 'Hot' },
  { id: 'packages', label: 'Paket', href: '/admin/packages', icon: Package },
  { id: 'questions', label: 'Bank Soal', href: '/admin/questions', icon: FileText },
  { id: 'transactions', label: 'Transaksi', href: '/admin/transactions', icon: CreditCard },
  { id: 'notifications', label: 'Notifikasi', href: '/admin/notifications', icon: Bell, badge: 12 },
  { id: 'settings', label: 'Pengaturan', href: '/admin/settings', icon: Settings },
];

export function Sidebar({
                                  variant = 'dashboard',
                                  collapsed = false,
                                  onToggle,
                                  className
                                }: SidebarProps) {
  const pathname = usePathname();
  const items = variant === 'admin' ? adminItems : dashboardItems;

  return (
    <motion.aside
      className={cn(
        'bg-white border-r border-border h-screen sticky top-0 transition-all duration-300 flex flex-col shadow-sm',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!collapsed ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
                <span className="font-bold text-lg gradient-text">
                  Prestige
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="logo-collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mx-auto"
              >
                <span className="text-white font-bold text-sm">P</span>
              </motion.div>
            )}
          </AnimatePresence>

          {onToggle && (
            <motion.button
              onClick={onToggle}
              className="p-1 rounded-md hover:bg-muted transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {items.map((item, index) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={cn(
                  'group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all relative',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                </motion.div>

                <AnimatePresence>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-3 flex items-center justify-between flex-1"
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={cn(
                            'inline-flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full',
                            typeof item.badge === 'number'
                              ? 'bg-red-500 text-white'
                              : 'bg-secondary text-secondary-foreground'
                          )}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute right-2 w-2 h-2 bg-white rounded-full"
                    layoutId="sidebar-active-indicator"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                    {item.badge && (
                      <span className="ml-1 bg-red-500 px-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <AnimatePresence>
          {!collapsed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs text-muted-foreground"
            >
              <div className="mb-2">Prestige Academy</div>
              <div>v1.0.0</div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center mx-auto"
            >
              <span className="text-xs font-mono">v1</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
}