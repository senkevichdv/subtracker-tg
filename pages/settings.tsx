import { useState } from 'react';
import { Container, Typography, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../contexts/SettingsContext';

export default function Settings() {
  const { t } = useTranslation();
  const { settings, setCurrency, setTheme } = useSettings();
  const [currency, setCurrencyState] = useState(settings.currency);
  const [theme, setThemeState] = useState(settings.theme);

  const handleCurrencyChange = (e: any) => {
    setCurrencyState(e.target.value);
    setCurrency(e.target.value);
  };
  const handleThemeChange = (e: any) => {
    setThemeState(e.target.value);
    setTheme(e.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>{t('settings')}</Typography>
      <Box sx={{ my: 2 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t('currency')}</InputLabel>
          <Select value={currency} label={t('currency')} onChange={handleCurrencyChange}>
            <MenuItem value="RUB">₽ RUB</MenuItem>
            <MenuItem value="USD">$ USD</MenuItem>
            <MenuItem value="EUR">€ EUR</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>{t('theme')}</InputLabel>
          <Select value={theme} label={t('theme')} onChange={handleThemeChange}>
            <MenuItem value="auto">{t('auto')}</MenuItem>
            <MenuItem value="light">{t('light')}</MenuItem>
            <MenuItem value="dark">{t('dark')}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
} 