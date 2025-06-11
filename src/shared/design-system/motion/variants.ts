// src/shared/design-system/motion/variants.ts
import { Variants, Transition } from 'framer-motion';

// Base transition configurations
export const transitions = {
  smooth: {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.3,
  } as Transition,

  spring: {
    type: 'spring',
    damping: 25,
    stiffness: 300,
    mass: 0.8,
  } as Transition,

  springBouncy: {
    type: 'spring',
    damping: 15,
    stiffness: 400,
    mass: 0.6,
  } as Transition,

  fast: {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.15,
  } as Transition,

  slow: {
    type: 'tween',
    ease: [0.4, 0, 0.2, 1],
    duration: 0.5,
  } as Transition,

  elastic: {
    type: 'spring',
    damping: 12,
    stiffness: 200,
    mass: 1,
  } as Transition,
} as const;

// Core animation variants
export const motionVariants = {
  // Fade animations
  fadeIn: {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      transition: transitions.fast,
    },
  } as Variants,

  fadeInUp: {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: transitions.fast,
    },
  } as Variants,

  fadeInDown: {
    hidden: {
      opacity: 0,
      y: -20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: transitions.fast,
    },
  } as Variants,

  fadeInLeft: {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      x: 20,
      transition: transitions.fast,
    },
  } as Variants,

  fadeInRight: {
    hidden: {
      opacity: 0,
      x: 20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: transitions.fast,
    },
  } as Variants,

  // Scale animations
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.springBouncy,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: transitions.fast,
    },
  } as Variants,

  scaleInCenter: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'center',
    },
    visible: {
      opacity: 1,
      scale: 1,
      transformOrigin: 'center',
      transition: transitions.elastic,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'center',
      transition: transitions.fast,
    },
  } as Variants,

  // Slide animations
  slideInLeft: {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  slideInRight: {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  slideInUp: {
    hidden: {
      y: '100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  slideInDown: {
    hidden: {
      y: '-100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      y: '-100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  } as Variants,

  // Flip animations
  flipIn: {
    hidden: {
      opacity: 0,
      rotateY: -90,
      transformPerspective: 1000,
    },
    visible: {
      opacity: 1,
      rotateY: 0,
      transformPerspective: 1000,
      transition: transitions.spring,
    },
    exit: {
      opacity: 0,
      rotateY: 90,
      transformPerspective: 1000,
      transition: transitions.smooth,
    },
  } as Variants,

  // Bounce animations
  bounceIn: {
    hidden: {
      opacity: 0,
      scale: 0.3,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 300,
        mass: 0.8,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      transition: transitions.fast,
    },
  } as Variants,

  // Rotation animations
  rotateIn: {
    hidden: {
      opacity: 0,
      rotate: -180,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: transitions.spring,
    },
    exit: {
      opacity: 0,
      rotate: 180,
      scale: 0.8,
      transition: transitions.smooth,
    },
  } as Variants,
} as const;

// Container variants for staggered animations
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
} as Variants;

export const staggerContainerVariants = {
  fast: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0,
      },
    },
  },
  normal: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  },
  slow: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  },
} as const;

// Page transition variants
export const pageVariants = {
  slideLeft: {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      x: '-100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  },
  slideRight: {
    hidden: {
      x: '-100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  },
  fade: {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      transition: transitions.fast,
    },
  },
  scale: {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: transitions.fast,
    },
  },
} as const;

// Interactive hover variants
export const hoverVariants = {
  lift: {
    initial: {},
    hover: {
      y: -4,
      scale: 1.02,
      transition: transitions.fast,
    },
    tap: {
      y: 0,
      scale: 0.98,
      transition: transitions.fast,
    },
  },
  scale: {
    initial: {},
    hover: {
      scale: 1.05,
      transition: transitions.fast,
    },
    tap: {
      scale: 0.95,
      transition: transitions.fast,
    },
  },
  glow: {
    initial: {
      boxShadow: '0 0 0 0 rgba(59, 145, 181, 0)',
    },
    hover: {
      boxShadow: '0 0 20px 0 rgba(59, 145, 181, 0.3)',
      transition: transitions.smooth,
    },
  },
  rotate: {
    initial: { rotate: 0 },
    hover: {
      rotate: 5,
      transition: transitions.spring,
    },
  },
  tilt: {
    initial: { rotateY: 0, rotateX: 0 },
    hover: {
      rotateY: 5,
      rotateX: 5,
      transformPerspective: 1000,
      transition: transitions.spring,
    },
  },
} as const;

// Loading animations
export const loadingVariants = {
  spin: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  bounce: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
  dots: {
    animate: {
      opacity: [0, 1, 0],
      transition: {
        duration: 1.4,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
} as const;

// Modal/overlay variants
export const overlayVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      transition: transitions.fast,
    },
  },
  modal: {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: transitions.springBouncy,
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: transitions.fast,
    },
  },
  drawer: {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: transitions.spring,
    },
    exit: {
      x: '100%',
      transition: transitions.smooth,
    },
  },
} as const;

// Navigation variants
export const navVariants = {
  mobileMenu: {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: 'auto',
      opacity: 1,
      transition: {
        height: transitions.spring,
        opacity: { delay: 0.1, ...transitions.smooth },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        opacity: transitions.fast,
        height: { delay: 0.1, ...transitions.smooth },
      },
    },
  },
  menuItem: {
    hidden: {
      x: -20,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.smooth,
    },
  },
  underline: {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: transitions.smooth,
    },
  },
} as const;

// Form animation variants
export const formVariants = {
  field: {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: transitions.smooth,
    },
    error: {
      x: [0, -5, 5, -5, 5, 0],
      transition: { duration: 0.4 },
    },
  },
  success: {
    hidden: {
      opacity: 0,
      scale: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: transitions.springBouncy,
    },
  },
} as const;

// Toast notification variants
export const toastVariants = {
  slide: {
    hidden: {
      x: '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: transitions.spring,
    },
    exit: {
      x: '100%',
      opacity: 0,
      transition: transitions.smooth,
    },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      transition: transitions.fast,
    },
  },
} as const;

// Marketing section variants
export const marketingVariants = {
  hero: {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },
  heroImage: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: 100,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.2,
      },
    },
  },
  feature: {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },
  testimonial: {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: transitions.smooth,
    },
    exit: {
      opacity: 0,
      x: -30,
      transition: transitions.fast,
    },
  },
} as const;

// Complex animation presets
export const presetVariants = {
  // Typewriter effect
  typewriter: {
    hidden: { width: 0 },
    visible: {
      width: '100%',
      transition: {
        duration: 2,
        ease: 'easeInOut',
      },
    },
  },

  // Reveal text
  revealText: {
    hidden: {
      opacity: 0,
      y: 50,
      skewY: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      skewY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  },

  // Parallax scroll
  parallax: {
    scroll: {
      y: [-50, 50],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  },

  // Floating element
  float: {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Magnetic hover effect
  magnetic: {
    hover: {
      scale: 1.1,
      rotate: [0, 1, -1, 0],
      transition: {
        scale: transitions.fast,
        rotate: {
          duration: 0.6,
          ease: 'easeInOut',
        },
      },
    },
  },

  // Morphing shape
  morph: {
    initial: { borderRadius: '20px' },
    hover: {
      borderRadius: '50px',
      transition: transitions.smooth,
    },
  },

  // Gradient animation
  gradientShift: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
} as const;

// Utility functions for creating custom variants
export const createStaggerContainer = (staggerDelay: number = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: staggerDelay,
    },
  },
});

export const createDelayedVariant = (
  baseVariant: Variants,
  delay: number = 0
): Variants => {
  return {
    ...baseVariant,
    visible: {
      ...baseVariant.visible,
      transition: {
        ...(baseVariant.visible as any).transition,
        delay,
      },
    },
  };
};

export const createResponsiveVariant = (
  mobileVariant: Variants,
  desktopVariant: Variants
): Variants => {
  return {
    hidden: mobileVariant.hidden,
    visible: {
      ...mobileVariant.visible,
      '@media (min-width: 768px)': desktopVariant.visible,
    },
    exit: mobileVariant.exit,
  };
};

// Animation hooks integration types
export type MotionVariantKey = keyof typeof motionVariants;
export type ContainerVariantKey = keyof typeof staggerContainerVariants;
export type PageVariantKey = keyof typeof pageVariants;
export type HoverVariantKey = keyof typeof hoverVariants;
export type LoadingVariantKey = keyof typeof loadingVariants;
export type PresetVariantKey = keyof typeof presetVariants;