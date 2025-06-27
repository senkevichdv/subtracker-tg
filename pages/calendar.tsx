import { Container, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function Calendar() {
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>{t('calendar', 'Calendar')}</Typography>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {t('calendar_coming_soon', 'Calendar features coming soon!')}
        </Typography>
      </Box>
    </Container>
  );
} 