export const darkColors = {
  background: '#1A1A1A',
  card: '#262626',
  text: '#ADADAD',
  accent: '#FFFFFF',
  border: '#363636',
  danger: '#FF4C4C',
  inactive: '#555555',
  shadow: 'rgba(0,0,0,0.7)',
  textSecondary: '#888',
};

export const lightColors = {
  background: '#fff',
  card: '#f5f5f5',
  text: '#222',
  accent: '#1A1A1A',
  border: '#e0e0e0',
  danger: '#FF4C4C',
  inactive: '#bbb',
  shadow: 'rgba(0,0,0,0.06)',
  textSecondary: '#888',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const fontSizes = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 28,
};

export const fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export function getTheme(mode: 'system' | 'dark' | 'light', systemIsDark: boolean) {
  if (mode === 'system') return systemIsDark ? darkColors : lightColors;
  if (mode === 'dark') return darkColors;
  return lightColors;
}

export const theme = { colors: darkColors, spacing, fontSizes }; // default dark 