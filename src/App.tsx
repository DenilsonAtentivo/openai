import { Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layout/AppLayout';
import { DashboardPage } from './pages/Dashboard';
import { ScheduleNewPage } from './pages/ScheduleNew';
import { SchedulesPage } from './pages/Schedules';
import { SettingsPage } from './pages/Settings';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/schedules" element={<SchedulesPage />} />
        <Route path="/schedules/new" element={<ScheduleNewPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
