import { useState } from 'react';
import { Box, Button, TextField, MenuItem, FormControlLabel, Switch, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

const periods = [
  { value: 'monthly', label: 'monthly' },
  { value: 'yearly', label: 'yearly' },
  { value: 'weekly', label: 'weekly' },
];

export interface SubscriptionFormValues {
  name: string;
  price: string;
  period: 'monthly' | 'yearly' | 'weekly';
  notes?: string;
  active: boolean;
}

interface Props {
  initialValues?: SubscriptionFormValues;
  onSave: (values: SubscriptionFormValues) => void;
  onCancel: () => void;
}

export default function SubscriptionForm({ initialValues, onSave, onCancel }: Props) {
  const { t } = useTranslation();
  const [values, setValues] = useState<SubscriptionFormValues>(
    initialValues || { name: '', price: '', period: 'monthly', notes: '', active: true }
  );
  const [error, setError] = useState('');

  const handleChange = (field: keyof SubscriptionFormValues) => (e: any) => {
    setValues(v => ({ ...v, [field]: field === 'active' ? e.target.checked : e.target.value }));
  };

  const handleSubmit = () => {
    let normalizedPrice = values.price.replace(',', '.');
    if (/^\d+[\.,]$/.test(values.price)) {
      normalizedPrice += '00';
    }
    if (!values.name.trim() || !normalizedPrice.trim() || !/^\d+(\.\d+)?$/.test(normalizedPrice)) {
      setError(t('validation_message'));
      return;
    }
    setError('');
    onSave({ ...values, price: normalizedPrice });
  };

  return (
    <Box component="form" sx={{ mt: 2 }}>
      <Stack spacing={2}>
        <TextField
          label={t('name')}
          value={values.name}
          onChange={handleChange('name')}
          required
        />
        <TextField
          label={t('price')}
          value={values.price}
          onChange={handleChange('price')}
          required
          inputProps={{ inputMode: 'decimal', pattern: '[0-9.,]*' }}
        />
        <TextField
          select
          label={t('period')}
          value={values.period}
          onChange={handleChange('period')}
        >
          {periods.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{t(opt.label)}</MenuItem>
          ))}
        </TextField>
        <TextField
          label={t('notes')}
          value={values.notes}
          onChange={handleChange('notes')}
          multiline
        />
        <FormControlLabel
          control={<Switch checked={values.active} onChange={handleChange('active')} />}
          label={t('active')}
        />
        {error && <Box color="error.main">{error}</Box>}
        <Stack direction="row" spacing={2}>
          <Button variant="contained" onClick={handleSubmit}>{t('save')}</Button>
          <Button variant="outlined" onClick={onCancel}>{t('cancel')}</Button>
        </Stack>
      </Stack>
    </Box>
  );
} 