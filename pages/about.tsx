import { Container, Typography, Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const version = '1.0.0'; // Optionally import from package.json
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>{t('about')}</Typography>
      <Box sx={{ my: 3 }}>
        <Typography variant="body1">{t('version')}: {version}</Typography>
        <Typography variant="body1">{t('author')}: Subtracker Team</Typography>
        <Link href="mailto:support@subtracker.app" underline="hover" color="primary">
          {t('contact_support')}
        </Link>
      </Box>
    </Container>
  );
} 