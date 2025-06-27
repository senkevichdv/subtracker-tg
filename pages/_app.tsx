import '../utils/i18n';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { getTelegramTheme, onTelegramThemeChanged } from '../utils/telegram';
import { SubscriptionProvider } from '../contexts/SubscriptionContext';
import { SettingsProvider, useSettings } from '../contexts/SettingsContext';
import { NotificationProvider } from '../contexts/NotificationContext';
import BottomNav from '../components/BottomNav';
import { getTheme, darkColors, lightColors, fontFamily } from '../styles/theme';

function ThemedApp({ Component, pageProps }: AppProps) {
  const [tgTheme, setTgTheme] = useState<any>(getTelegramTheme() || {});
  const { settings } = useSettings();
  const [systemIsDark, setSystemIsDark] = useState(false);

  useEffect(() => {
    onTelegramThemeChanged(() => {
      setTgTheme(getTelegramTheme() || {});
    });
    // Listen to system theme changes
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
    setSystemIsDark(mq.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  // Determine theme mode
  let mode: 'light' | 'dark' | 'system' = settings.theme === 'auto' ? 'system' : settings.theme;
  const colors = getTheme(mode, systemIsDark);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: colors === darkColors ? 'dark' : 'light',
      background: { default: colors.background },
      primary: { main: colors.accent },
      secondary: { main: colors.inactive },
      text: { primary: colors.text, secondary: colors.textSecondary },
    },
    shape: { borderRadius: 12 },
    spacing: 8,
    typography: {
      fontSize: 16,
      fontFamily,
    },
  }), [colors]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
      <BottomNav />
    </ThemeProvider>
  );
}

function MyApp(props: AppProps) {
  return (
    <SettingsProvider>
      <SubscriptionProvider>
        <NotificationProvider>
          <ThemedApp {...props} />
        </NotificationProvider>
      </SubscriptionProvider>
    </SettingsProvider>
  );
}

export default MyApp; 