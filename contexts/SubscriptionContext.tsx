import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Subscription = {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly' | 'weekly';
  notes?: string;
  active: boolean;
  reminder: boolean;
};

interface SubscriptionContextType {
  subscriptions: Subscription[];
  addSubscription: (sub: Omit<Subscription, 'id'>) => void;
  editSubscription: (id: string, sub: Omit<Subscription, 'id'>) => void;
  deleteSubscription: (id: string) => void;
  undoDelete: () => void;
  setSubscriptions: (subs: Subscription[]) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const DEMO_SUBSCRIPTIONS: Subscription[] = [
  { id: '1', name: 'Netflix', price: 12.99, period: 'monthly', notes: 'HD plan', active: true, reminder: true },
  { id: '2', name: 'Spotify', price: 99, period: 'yearly', notes: '', active: true, reminder: false }
];

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [lastDeleted, setLastDeleted] = useState<Subscription | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('subscriptions');
    if (saved) setSubscriptions(JSON.parse(saved));
    else setSubscriptions(DEMO_SUBSCRIPTIONS);
  }, []);

  useEffect(() => {
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const addSubscription = (sub: Omit<Subscription, 'id'>) => {
    setSubscriptions((subs) => [
      ...subs,
      { ...sub, id: Date.now().toString() }
    ]);
  };

  const editSubscription = (id: string, sub: Omit<Subscription, 'id'>) => {
    setSubscriptions((subs) => subs.map(s => s.id === id ? { ...s, ...sub } : s));
  };

  const deleteSubscription = (id: string) => {
    setSubscriptions((subs) => {
      const toDelete = subs.find(s => s.id === id) || null;
      setLastDeleted(toDelete);
      return subs.filter(s => s.id !== id);
    });
  };

  const undoDelete = () => {
    if (lastDeleted) {
      setSubscriptions((subs) => [...subs, lastDeleted]);
      setLastDeleted(null);
    }
  };

  return (
    <SubscriptionContext.Provider value={{ subscriptions, addSubscription, editSubscription, deleteSubscription, undoDelete, setSubscriptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscriptions = () => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error('useSubscriptions must be used within SubscriptionProvider');
  return ctx;
}; 