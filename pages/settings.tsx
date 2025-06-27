import { useEffect, useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

const currencies = ["USD", "EUR", "RUB"];
const themes = ["auto", "light", "dark"];

export default function Settings() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [currency, setCurrency] = useState('USD');
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    const saved = localStorage.getItem('settings');
    if (saved) {
      const s = JSON.parse(saved);
      setCurrency(s.currency || 'USD');
      setTheme(s.theme || 'auto');
      setLanguage(s.language || i18n.language);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify({ language, currency, theme }));
    i18n.changeLanguage(language);
  }, [language, currency, theme]);

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>{t('settings')}</Typography>
      <Box sx={{ my: 3 }}>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>{t('language')}</InputLabel>
          <Select value={language} label={t('language')} onChange={e => setLanguage(e.target.value)}>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ru">Русский</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>{t('currency')}</InputLabel>
          <Select value={currency} label={t('currency')} onChange={e => setCurrency(e.target.value)}>
            {currencies.map(cur => <MenuItem key={cur} value={cur}>{cur}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl component="fieldset">
          <Typography sx={{ mb: 1 }}>{t('theme')}</Typography>
          <RadioGroup row value={theme} onChange={e => setTheme(e.target.value)}>
            {themes.map(opt => (
              <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt.charAt(0).toUpperCase() + opt.slice(1)} />
            ))}
          </RadioGroup>
        </FormControl>
      </Box>
    </Container>
  );
} 