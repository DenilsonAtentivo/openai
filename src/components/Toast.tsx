import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { cn } from '../lib/utils';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

interface ToastContextValue {
  notify: (message: Omit<ToastMessage, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const notify = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = crypto.randomUUID();
    setMessages((prev) => [...prev, { ...message, id }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((item) => item.id !== id));
    }, 3200);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'glass-card w-72 rounded-xl border border-white/10 px-4 py-3 text-sm text-white shadow-glow'
            )}
          >
            <p className="font-semibold text-white">{message.title}</p>
            {message.description && <p className="mt-1 text-xs text-white/60">{message.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
