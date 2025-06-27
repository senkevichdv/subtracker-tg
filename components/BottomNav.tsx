import React, { useMemo } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function BottomNav() {
  const router = useRouter();
  const { t } = useTranslation();
  const navItems = useMemo(() => [
    { labelKey: t("main_tab"), icon: <HomeIcon />, route: "/" },
    { labelKey: t("calendar_tab"), icon: <CalendarTodayIcon />, route: "/calendar" },
    { labelKey: t("settings_tab"), icon: <SettingsIcon />, route: "/settings" },
  ], [t]);
  const current = navItems.findIndex(item => item.route === router.pathname);

  return (
    <BottomNavigation
      value={current}
      onChange={(_, newValue) => router.push(navItems[newValue].route)}
      showLabels
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      {navItems.map(item => (
        <BottomNavigationAction key={item.route} label={t(item.labelKey)} icon={item.icon} />
      ))}
    </BottomNavigation>
  );
} 