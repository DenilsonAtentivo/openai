import { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
      <div className={cn('glass-card w-full max-w-lg rounded-2xl border border-white/10 p-6')}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 hover:text-white"
          >
            Fechar
          </button>
        </div>
        <div className="mt-4 text-sm text-white/70">{children}</div>
      </div>
    </div>
  );
}
