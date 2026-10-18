/**
 * CodeHurdle Atomic Design System Tokens
 * Master visual specifications for colors, typography, radii, spacing, and elevation.
 */

export const tokens = {
  colors: {
    base: {
      canvas: '#000000',
      surface: '#111111',
      elevated: '#171717',
      sunken: '#050505',
      border: 'rgba(255, 255, 255, 0.08)',
      borderHover: 'rgba(255, 255, 255, 0.16)',
      borderActive: 'rgba(132, 204, 22, 0.5)'
    },
    difficulty: {
      easy: {
        text: '#4ade80',
        bg: 'rgba(34, 197, 94, 0.12)',
        border: 'rgba(34, 197, 94, 0.28)',
        hex: '#22c55e'
      },
      medium: {
        text: '#bef264',
        bg: 'rgba(132, 204, 22, 0.12)',
        border: 'rgba(132, 204, 22, 0.28)',
        hex: '#84cc16'
      },
      hard: {
        text: '#f87171',
        bg: 'rgba(239, 68, 68, 0.12)',
        border: 'rgba(239, 68, 68, 0.28)',
        hex: '#ef4444'
      }
    },
    divisions: {
      div1: {
        name: 'Division 1 (1900+)',
        color: '#60a5fa',
        bg: 'rgba(96, 165, 250, 0.12)',
        border: 'rgba(96, 165, 250, 0.28)'
      },
      div2: {
        name: 'Division 2 (1400-1899)',
        color: '#fbbf24',
        bg: 'rgba(251, 191, 36, 0.12)',
        border: 'rgba(251, 191, 36, 0.28)'
      },
      div3: {
        name: 'Division 3 (<1400)',
        color: '#a1a1aa',
        bg: 'rgba(161, 161, 170, 0.12)',
        border: 'rgba(161, 161, 170, 0.28)'
      }
    },
    gamification: {
      flame: '#fbbf24',
      flameGlow: 'rgba(251, 191, 36, 0.3)',
      xpBadge: '#84cc16',
      proGradient: 'from-lime-400 via-green-400 to-lime-400'
    }
  },
  typography: {
    fontSans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontMono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem' // 30px
    }
  },
  radii: {
    sm: '0.375rem',  // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.25rem',// 20px
    full: '9999px'
  },
  shadows: {
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    card: '0 4px 20px -2px rgba(0, 0, 0, 0.5)',
    glowEmerald: '0 0 25px -5px rgba(132, 204, 22, 0.2)',
    glowAmber: '0 0 25px -5px rgba(251, 191, 36, 0.2)',
    glowCyan: '0 0 25px -5px rgba(96, 165, 250, 0.2)'
  }
} as const;

export type DesignTokens = typeof tokens;
