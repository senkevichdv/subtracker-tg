import React from 'react';
import { ListItem, ListItemText, IconButton, ListItemSecondaryAction, Chip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Subscription } from '../contexts/SubscriptionContext';

interface Props {
  sub: Subscription;
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
}

function getPeriodLabel(period: string) {
  switch (period) {
    case 'monthly': return 'Monthly';
    case 'yearly': return 'Yearly';
    case 'weekly': return 'Weekly';
    default: return period;
  }
}

export default function SubscriptionItem({ sub, onEdit, onDelete }: Props) {
  return (
    <ListItem divider>
      <ListItemText
        primary={sub.name}
        secondary={
          <>
            <Box component="span">{sub.price} / {getPeriodLabel(sub.period)}</Box>
            {sub.notes && <Box component="span" sx={{ ml: 1, color: 'text.secondary' }}>({sub.notes})</Box>}
          </>
        }
      />
      <Chip
        icon={sub.reminder ? <NotificationsActiveIcon /> : <NotificationsOffIcon />}
        label={sub.reminder ? 'Reminder On' : 'No Reminder'}
        size="small"
        sx={{ mr: 1 }}
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="edit" onClick={() => onEdit(sub)}>
          <EditIcon />
        </IconButton>
        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(sub.id)}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
} 