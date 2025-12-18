import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { DashboardOverview } from './components/pages/DashboardOverview';
import { SpaceOverview } from './components/pages/SpaceOverview';
import { AlertCenter } from './components/pages/AlertCenter';
import { ViolationMonitoring } from './components/pages/ViolationMonitoring';
import { RoomManagement } from './components/pages/RoomManagement';
import { DeviceManagement } from './components/pages/DeviceManagement';
import { WorkOrders } from './components/pages/WorkOrders';
import { Announcements } from './components/pages/Announcements';
import { PolicyManagement } from './components/pages/PolicyManagement';
import { GrayRelease } from './components/pages/GrayRelease';
import { EnergyReports } from './components/pages/EnergyReports';
import { LoadAnalytics } from './components/pages/LoadAnalytics';
import { ClassificationTuning } from './components/pages/ClassificationTuning';
import { UserPermissions } from './components/pages/UserPermissions';
import { Finance } from './components/pages/Finance';
import { AuditLogs } from './components/pages/AuditLogs';
import { SystemSettings } from './components/pages/SystemSettings';
import { SelfCheck } from './components/pages/SelfCheck';

export default function App() {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>(['总览']);

  // Simulate route change
  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
  };

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Render current page based on route
  const renderPage = () => {
    switch (currentPath) {
      case '/dashboard':
        return <DashboardOverview />;
      case '/spaces':
        return <SpaceOverview onNavigate={navigate} onBreadcrumbChange={setBreadcrumbPath} />;
      case '/alerts':
        return <AlertCenter />;
      case '/violations':
        return <ViolationMonitoring />;
      case '/rooms':
        return <RoomManagement onNavigate={navigate} onBreadcrumbChange={setBreadcrumbPath} />;
      case '/devices':
        return <DeviceManagement />;
      case '/workorders':
        return <WorkOrders />;
      case '/announcements':
        return <Announcements />;
      case '/policies':
        return <PolicyManagement />;
      case '/policies/releases':
        return <GrayRelease />;
      case '/reports':
        return <EnergyReports />;
      case '/analytics/load':
        return <LoadAnalytics />;
      case '/analytics/classification-tuning':
        return <ClassificationTuning />;
      case '/admin':
        return <UserPermissions />;
      case '/finance':
        return <Finance />;
      case '/settings/audit':
        return <AuditLogs />;
      case '/settings':
        return <SystemSettings />;
      case '/help/self-check':
        return <SelfCheck />;
      default:
        // Handle detail routes (e.g., /alerts/:id)
        if (currentPath.startsWith('/alerts/')) {
          return <AlertCenter detailId={currentPath.split('/')[2]} onNavigate={navigate} />;
        }
        return <DashboardOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath={currentPath} onNavigate={navigate} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopBar breadcrumbPath={breadcrumbPath} onNavigate={navigate} />
        
        <div className="flex-1 overflow-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}