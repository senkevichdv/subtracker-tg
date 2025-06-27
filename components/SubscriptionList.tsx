import React from 'react';
import { Box, Typography, List, Divider } from '@mui/material';
import SubscriptionItem from './SubscriptionItem';
import { Subscription } from '../contexts/SubscriptionContext';
import EmptyState from './EmptyState';

interface Props {
  subscriptions: Subscription[];
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
}

function groupByActive(subs: Subscription[]) {
  return {
    active: subs.filter(s => s.active),
    inactive: subs.filter(s => !s.active)
  };
}

export default function SubscriptionList({ subscriptions, onEdit, onDelete }: Props) {
  if (!subscriptions.length) return <EmptyState />;
  const { active, inactive } = groupByActive(subscriptions);
  return (
    <Box>
      {active.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Active
          </Typography>
          <List>
            {active.map(sub => (
              <SubscriptionItem key={sub.id} sub={sub} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </List>
        </>
      )}
      {inactive.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Inactive
          </Typography>
          <List>
            {inactive.map(sub => (
              <SubscriptionItem key={sub.id} sub={sub} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </List>
        </>
      )}
    </Box>
  );
} 