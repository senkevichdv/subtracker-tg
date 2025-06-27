import React from 'react';
import { Box, Typography } from '@mui/material';
import { Subscription } from '../contexts/SubscriptionContext';
import { useSettings } from '../contexts/SettingsContext';

function getMonthlyEquivalent(sub: Subscription) {
  switch (sub.period) {
    case 'monthly': return sub.price;
    case 'yearly': return sub.price / 12;
    case 'weekly': return sub.price * 52 / 12;
    default: return sub.price;
  }
}

function getYearlyEquivalent(sub: Subscription) {
  switch (sub.period) {
    case 'monthly': return sub.price * 12;
    case 'yearly': return sub.price;
    case 'weekly': return sub.price * 52;
    default: return sub.price;
  }
}

export default function SubscriptionSummary({ subscriptions }: { subscriptions: Subscription[] }) {
  const { settings } = useSettings();
  const totalMonthly = subscriptions.reduce((sum, sub) => sum + getMonthlyEquivalent(sub), 0);
  const totalYearly = subscriptions.reduce((sum, sub) => sum + getYearlyEquivalent(sub), 0);
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
      <Typography variant="subtitle2">
        {`Total Monthly: ${totalMonthly.toFixed(2)} ${settings.currency}`}
      </Typography>
      <Typography variant="subtitle2">
        {`Total Yearly: ${totalYearly.toFixed(2)} ${settings.currency}`}
      </Typography>
    </Box>
  );
} 