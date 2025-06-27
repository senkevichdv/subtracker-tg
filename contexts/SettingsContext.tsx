import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark' | 'auto';

type Settings = {
  currency: string;
  theme: ThemeMode;
};

interface SettingsContextType {
  settings: Settings;
  setCurrency: (currency: string) => void;
  setTheme: (theme: ThemeMode) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: Settings = {
  currency: 'RUB',
  theme: 'auto',
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const setCurrency = (currency: string) => setSettings(s => ({ ...s, currency }));
  const setTheme = (theme: ThemeMode) => setSettings(s => ({ ...s, theme }));

  return (
    <SettingsContext.Provider value={{ settings, setCurrency, setTheme }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}; 