import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Subscription } from '../contexts/SubscriptionContext';
import { useTranslation } from 'react-i18next';

// For demo, use a simple calendar grid (not a full-featured calendar lib)
function getNextPayments(subs: Subscription[]) {
  // For demo: assume all payments are due on the 1st of the month
  return subs.map(sub => ({ ...sub, dueDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }));
}

export default function CalendarView({ subscriptions }: { subscriptions: Subscription[] }) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const payments = getNextPayments(subscriptions);
  const dueSubs = selectedDate
    ? payments.filter(p => p.dueDate.toDateString() === selectedDate.toDateString())
    : [];

  return (
    <Box>
      <Typography variant="h6" mb={2}>{t('calendar')}</Typography>
      {/* Simple calendar: just show the 1st of this and next month for demo */}
      <Box display="flex" gap={2} mb={2}>
        {[0, 1].map(offset => {
          const date = new Date(new Date().getFullYear(), new Date().getMonth() + offset, 1);
          return (
            <Box
              key={date.toISOString()}
              onClick={() => setSelectedDate(date)}
              sx={{ p: 2, border: '1px solid #ccc', borderRadius: 2, cursor: 'pointer', background: selectedDate?.toDateString() === date.toDateString() ? '#eee' : '#fff' }}
            >
              {date.toLocaleDateString()}
            </Box>
          );
        })}
      </Box>
      {selectedDate && (
        <Box>
          <Typography variant="subtitle1">{t('subscriptionsDue')}</Typography>
          <List>
            {dueSubs.length === 0 && <ListItem><ListItemText primary={t('noSubscriptionsDue')} /></ListItem>}
            {dueSubs.map(sub => (
              <ListItem key={sub.id}>
                <ListItemText primary={sub.name} secondary={`${sub.price} / ${sub.period}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
} 