import { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { getTelegramUser } from '../utils/telegram';
import SubscriptionForm, { SubscriptionFormValues } from '../components/SubscriptionForm';

interface Subscription {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly' | 'weekly';
  notes?: string;
  active: boolean;
}

export default function Home() {
  const { t } = useTranslation();
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [user, setUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editSub, setEditSub] = useState<Subscription | null>(null);

  useEffect(() => {
    setUser(getTelegramUser());
    const saved = localStorage.getItem('subscriptions');
    if (saved) setSubs(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subs));
  }, [subs]);

  const handleDelete = (id: string) => {
    setSubs(subs => subs.filter(s => s.id !== id));
  };

  const handleAdd = () => {
    setEditSub(null);
    setDialogOpen(true);
  };

  const handleEdit = (sub: Subscription) => {
    setEditSub(sub);
    setDialogOpen(true);
  };

  const handleSave = (values: SubscriptionFormValues) => {
    if (editSub) {
      setSubs(subs => subs.map(s => s.id === editSub.id ? { ...s, ...values, price: Number(values.price) } : s));
    } else {
      setSubs(subs => [
        ...subs,
        { ...values, id: Date.now().toString(), price: Number(values.price) }
      ]);
    }
    setDialogOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>{t('subscriptions')}</Typography>
      {user && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
      )}
      <Box sx={{ my: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          {t('add_subscription')}
        </Button>
      </Box>
      <List>
        {subs.map(sub => (
          <ListItem key={sub.id} secondaryAction={
            <>
              <IconButton edge="end" aria-label={t('edit_subscription')} onClick={() => handleEdit(sub)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label={t('delete')} onClick={() => handleDelete(sub.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText
              primary={`${sub.name} — ${sub.price} (${t(sub.period)})`}
              secondary={sub.notes}
            />
          </ListItem>
        ))}
      </List>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{editSub ? t('edit_subscription') : t('add_subscription')}</DialogTitle>
        <DialogContent>
          <SubscriptionForm
            initialValues={editSub ? {
              name: editSub.name,
              price: editSub.price.toString(),
              period: editSub.period,
              notes: editSub.notes,
              active: editSub.active
            } : undefined}
            onSave={handleSave}
            onCancel={() => setDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </Container>
  );
} 