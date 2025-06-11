/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      // Design Token Integration
      fontFamily: {
        sans: ['var(--font-poppins)', ...fontFamily.sans],
        mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace'],
      },

      colors: {
        // CSS Variables for theme switching
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Brand Colors
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#eef6fa',
          100: '#d9eaf4',
          200: '#b9d9e9',
          300: '#8ac2da',
          400: '#57a7c9',
          500: '#3b91b5',
          600: '#327498',
          700: '#2c617f',
          800: '#295168',
          900: '#254658',
          950: '#172e3a',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          50: '#fef8f0',
          100: '#fdeed8',
          200: '#fbd9b0',
          300: '#f8c182',
          400: '#f4a854',
          500: '#F0A243',
          600: '#d5872c',
          700: '#b26b21',
          800: '#91561f',
          900: '#78481e',
          950: '#422610',
        },

        // Semantic Colors
        success: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        warning: {
          DEFAULT: '#f59e0b',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        error: {
          DEFAULT: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        info: {
          DEFAULT: '#3b82f6',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // UI Colors
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 4px)',
        sm: 'calc(var(--radius) - 8px)',
      },

      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '10xl': ['10rem', { lineHeight: '1' }],
      },

      boxShadow: {
        'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
        'elevation-4': '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)',
        'elevation-5': '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)',
        'glow': '0 0 20px rgba(59, 145, 181, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 145, 181, 0.2)',
      },

      animation: {
        // Performance optimized animations
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.6s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.6s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'bounce-in': 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'text-shimmer': 'text-shimmer 2.5s ease-in-out infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'bounce-in': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 5px rgba(59, 145, 181, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 145, 181, 0.4)' },
        },
        'text-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-y': {
          '0%, 100%': { backgroundPosition: '50% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
        },
        'gradient-xy': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '25%': { backgroundPosition: '100% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
          '75%': { backgroundPosition: '0% 100%' },
        },
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'bounce-out': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      zIndex: {
        'hide': '-1',
        'base': '0',
        'docked': '10',
        'dropdown': '1000',
        'sticky': '1100',
        'banner': '1200',
        'overlay': '1300',
        'modal': '1400',
        'popover': '1500',
        'skipLink': '1600',
        'toast': '1700',
        'tooltip': '1800',
      },

      // Custom utilities for design system
      letterSpacing: {
        'extra-wide': '0.2em',
      },

      lineHeight: {
        'extra-loose': '2.5',
        'extra-tight': '1.1',
      },

      maxWidth: {
        'prose': '65ch',
        '8xl': '88rem',
        '9xl': '96rem',
      },

      screens: {
        'xs': '475px',
        '3xl': '1680px',
        '4xl': '2048px',
      },

      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),

    // Custom plugin for design system utilities
    function({ addUtilities, addComponents, theme }) {
      // Gradient utilities
      addUtilities({
        '.gradient-text': {
          background: `linear-gradient(135deg, ${theme('colors.primary.600')}, ${theme('colors.secondary.500')})`,
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.gradient-text-animated': {
          background: `linear-gradient(135deg, ${theme('colors.primary.600')}, ${theme('colors.secondary.500')}, ${theme('colors.primary.600')})`,
          'background-size': '200% 200%',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          animation: 'gradient-x 3s ease infinite',
        },
        '.marketing-gradient': {
          background: `radial-gradient(circle at top left, hsl(${theme('colors.primary.DEFAULT')} / 0.1), transparent 40%), radial-gradient(circle at bottom right, hsl(${theme('colors.secondary.DEFAULT')} / 0.1), transparent 40%)`,
        },
        '.glass-effect': {
          background: 'rgba(255, 255, 255, 0.25)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        '.shimmer-effect': {
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
            animation: 'shimmer 2s ease-in-out infinite',
          },
        },
      });

      // Component utilities
      addComponents({
        '.btn-base': {
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: theme('borderRadius.lg'),
          fontSize: theme('fontSize.sm'),
          fontWeight: theme('fontWeight.semibold'),
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: theme('colors.primary.500'),
            outlineOffset: '2px',
          },
          '&:disabled': {
            pointerEvents: 'none',
            opacity: '0.5',
          },
        },
        '.card-base': {
          backgroundColor: theme('colors.card.DEFAULT'),
          color: theme('colors.card.foreground'),
          borderRadius: theme('borderRadius.2xl'),
          border: `1px solid ${theme('colors.border')}`,
          boxShadow: theme('boxShadow.sm'),
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '.section': {
          paddingTop: theme('spacing.20'),
          paddingBottom: theme('spacing.20'),
          '@screen md': {
            paddingTop: theme('spacing.24'),
            paddingBottom: theme('spacing.24'),
          },
          '@screen lg': {
            paddingTop: theme('spacing.28'),
            paddingBottom: theme('spacing.28'),
          },
        },
        '.container-prose': {
          maxWidth: theme('maxWidth.prose'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
        },
      });
    },
  ],
};