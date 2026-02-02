import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastProvider } from './components/Toast';
import { AppLayout } from './layout/AppLayout';
import { ConnectMicrosoft } from './pages/ConnectMicrosoft';
import { Dashboard } from './pages/Dashboard';
import { Jobs } from './pages/Jobs';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';
import { Tenants } from './pages/Tenants';

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route
          path="/connect-microsoft"
          element={
            <AppLayout>
              <ConnectMicrosoft />
            </AppLayout>
          }
        />
        <Route
          path="/tenants"
          element={
            <AppLayout>
              <Tenants />
            </AppLayout>
          }
        />
        <Route
          path="/jobs"
          element={
            <AppLayout>
              <Jobs />
            </AppLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <AppLayout>
              <Settings />
            </AppLayout>
          }
        />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ToastProvider>
  );
}
