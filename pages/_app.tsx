import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import { getTelegramTheme, onTelegramThemeChanged } from '../utils/telegram';

function MyApp({ Component, pageProps }: AppProps) {
  const [tgTheme, setTgTheme] = useState<any>(getTelegramTheme() || {});

  useEffect(() => {
    onTelegramThemeChanged(() => {
      setTgTheme(getTelegramTheme() || {});
    });
  }, []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: tgTheme.bg_color ? (tgTheme.bg_color === '#ffffff' ? 'light' : 'dark') : 'light',
      background: { default: tgTheme.bg_color || '#fff' },
      primary: { main: tgTheme.accent_text_color || '#1976d2' },
      secondary: { main: tgTheme.button_color || '#1976d2' },
      text: { primary: tgTheme.text_color || '#222' },
    },
  }), [tgTheme]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp); 