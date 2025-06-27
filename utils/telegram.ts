export function getTelegramWebApp() {
  return (window as any).Telegram?.WebApp;
}

export function getTelegramUser() {
  return getTelegramWebApp()?.initDataUnsafe?.user;
}

export function getTelegramTheme() {
  return getTelegramWebApp()?.themeParams;
}

export function onTelegramThemeChanged(callback: () => void) {
  const tg = getTelegramWebApp();
  if (tg && tg.onEvent) {
    tg.onEvent('themeChanged', callback);
  }
} 