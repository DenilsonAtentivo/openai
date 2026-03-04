import { createContext, useContext, useMemo, useState } from 'react';

interface AppStore {
  tenant: string;
  setTenant: (tenant: string) => void;
  selectedTree: string[];
  setSelectedTree: (ids: string[]) => void;
  isAuthenticated: boolean;
}

const AppStoreContext = createContext<AppStore | null>(null);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState('Contoso LTDA');
  const [selectedTree, setSelectedTree] = useState<string[]>([]);

  const value = useMemo(
    () => ({ tenant, setTenant, selectedTree, setSelectedTree, isAuthenticated: true }),
    [tenant, selectedTree]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export const useAppStore = () => {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be inside AppStoreProvider');
  return ctx;
};
