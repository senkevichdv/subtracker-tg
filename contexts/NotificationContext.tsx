import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NotificationContextType {
  showMessage: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<'success' | 'error' | 'info'>('info');

  const showMessage = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessage(msg);
    setType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      {message && (
        <div style={{ position: 'fixed', bottom: 16, left: 0, right: 0, zIndex: 9999, display: 'flex', justifyContent: 'center' }}>
          <div style={{ background: type === 'error' ? '#f44336' : type === 'success' ? '#4caf50' : '#333', color: '#fff', padding: '12px 24px', borderRadius: 8 }}>
            {message}
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}; 