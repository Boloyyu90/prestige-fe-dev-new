import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface Breadcrumb {
  name: string;
  href?: string;
  current?: boolean;
}

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  loading?: boolean;
}

export function PageWrapper({
                              children,
                              className,
                              title,
                              description,
                              breadcrumbs,
                              actions,
                              loading = false,
                            }: PageWrapperProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Header Section */}
      {(title || breadcrumbs || actions) && (
        <motion.div
          className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-40"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-6">
            {/* Breadcrumbs */}
            {breadcrumbs && (
              <motion.nav
                className="mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                aria-label="Breadcrumb"
              >
                <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-foreground transition-colors flex items-center"
                    >
                      <Home className="w-4 h-4" />
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="w-4 h-4 mx-2" />
                      {crumb.href && !crumb.current ? (
                        <Link
                          href={crumb.href}
                          className="hover:text-foreground transition-colors"
                        >
                          {crumb.name}
                        </Link>
                      ) : (
                        <span className={cn(
                          crumb.current ? 'text-foreground font-medium' : 'text-muted-foreground'
                        )}>
                          {crumb.name}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </motion.nav>
            )}

            {/* Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="min-w-0 flex-1">
                {title && (
                  <motion.h1
                    className="text-2xl md:text-3xl font-bold tracking-tight text-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {title}
                  </motion.h1>
                )}
                {description && (
                  <motion.p
                    className="mt-2 text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {description}
                  </motion.p>
                )}
              </div>

              {actions && (
                <motion.div
                  className="flex-shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {actions}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <motion.main
        className="flex-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        ) : (
          children
        )}
      </motion.main>
    </div>
  );
}