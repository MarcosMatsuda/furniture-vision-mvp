/**
 * Furniture Vision — Design System Tokens
 *
 * Single source of truth for all visual properties.
 * Never use raw values in components — always reference tokens.
 */

export const colors = {
  // Brand
  brand: {
    primary: '#c4a265',
    primaryLight: '#d4b87a',
    primaryDark: '#a8873f',
    secondary: '#1a1a2e',
    accent: '#e8d5b0',
  },

  // Neutrals
  neutral: {
    50: '#faf9f6',
    100: '#f5f2ec',
    200: '#ebe6dc',
    300: '#d8d2c6',
    400: '#b0a594',
    500: '#7a6f5f',
    600: '#5a5248',
    700: '#3d3730',
    800: '#2c2418',
    900: '#1a1610',
  },

  // Semantic
  success: '#22c55e',
  warning: '#eab308',
  error: '#ef4444',
  info: '#3b82f6',

  // Surfaces
  background: {
    primary: '#faf9f6',
    secondary: '#f5f2ec',
    tertiary: '#ebe6dc',
    inverse: '#1a1a2e',
  },

  // Text
  text: {
    primary: '#2c2418',
    secondary: '#7a6f5f',
    tertiary: '#b0a594',
    inverse: '#faf9f6',
    brand: '#c4a265',
  },

  // Borders
  border: {
    light: 'rgba(0,0,0,0.06)',
    medium: 'rgba(0,0,0,0.12)',
    strong: 'rgba(0,0,0,0.20)',
    brand: '#c4a265',
  },

  // Wood palette (for 3D configurator)
  wood: {
    branco: '#f0ebe2',
    carvalho: '#c4a265',
    tabaco: '#6b4226',
    preto: '#2a2a2a',
    freijo: '#a07850',
    nogueira: '#5c3d2e',
    cinza: '#9e9a92',
    amendoa: '#d4b896',
    canela: '#8b5e3c',
  },

  // Overlays
  overlay: {
    light: 'rgba(255,255,255,0.85)',
    dark: 'rgba(0,0,0,0.5)',
    brand: 'rgba(196,162,101,0.1)',
  },
} as const;

export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    // TODO: Replace with custom fonts (DM Sans)
    // regular: 'DMSans-Regular',
    // medium: 'DMSans-Medium',
    // bold: 'DMSans-Bold',
  },

  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 22,
    '2xl': 28,
    '3xl': 34,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
} as const;

export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
} as const;

export const animation = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400,
  },
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  animation,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Spacing = keyof typeof spacing;
