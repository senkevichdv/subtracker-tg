import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function EmptyState() {
  const { t } = useTranslation();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={8}>
      <Image src="/images/empty-state.svg" alt="Empty" width={180} height={180} />
      <Typography variant="h6" color="textSecondary" mt={2} align="center">
        {t('emptyState')}
      </Typography>
    </Box>
  );
} 