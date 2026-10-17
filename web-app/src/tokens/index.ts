/**
 * CodeHurdle Atomic Design System Tokens
 * Master visual specifications for colors, typography, radii, spacing, and elevation.
 */

export const tokens = {
  colors: {
    base: {
      canvas: '#07090e',
      surface: '#0c101c',
      elevated: '#111625',
      sunken: '#05070a',
      border: 'rgba(255, 255, 255, 0.08)',
      borderHover: 'rgba(255, 255, 255, 0.16)',
      borderActive: 'rgba(16, 185, 129, 0.5)'
    },
    difficulty: {
      easy: {
        text: '#34d399',
        bg: 'rgba(16, 185, 129, 0.12)',
        border: 'rgba(16, 185, 129, 0.28)',
        hex: '#10b981'
      },
      medium: {
        text: '#fbbf24',
        bg: 'rgba(245, 158, 11, 0.12)',
        border: 'rgba(245, 158, 11, 0.28)',
        hex: '#f59e0b'
      },
      hard: {
        text: '#fb7185',
        bg: 'rgba(244, 63, 94, 0.12)',
        border: 'rgba(244, 63, 94, 0.28)',
        hex: '#f43f5e'
      }
    },
    divisions: {
      div1: {
        name: 'Division 1 (1900+)',
        color: '#22d3ee',
        bg: 'rgba(6, 182, 212, 0.12)',
        border: 'rgba(6, 182, 212, 0.28)'
      },
      div2: {
        name: 'Division 2 (1400-1899)',
        color: '#c084fc',
        bg: 'rgba(168, 85, 247, 0.12)',
        border: 'rgba(168, 85, 247, 0.28)'
      },
      div3: {
        name: 'Division 3 (<1400)',
        color: '#94a3b8',
        bg: 'rgba(148, 163, 184, 0.12)',
        border: 'rgba(148, 163, 184, 0.28)'
      }
    },
    gamification: {
      flame: '#f59e0b',
      flameGlow: 'rgba(245, 158, 11, 0.3)',
      xpBadge: '#10b981',
      proGradient: 'from-amber-400 via-emerald-400 to-cyan-400'
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
    glowEmerald: '0 0 25px -5px rgba(16, 185, 129, 0.2)',
    glowAmber: '0 0 25px -5px rgba(245, 158, 11, 0.2)',
    glowCyan: '0 0 25px -5px rgba(6, 182, 212, 0.2)'
  }
} as const;

export type DesignTokens = typeof tokens;
