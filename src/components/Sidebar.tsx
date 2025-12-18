import { 
  Building2, LayoutDashboard, Grid3x3, Bell, AlertTriangle, 
  Home, Cpu, ClipboardList, Megaphone, FileText, GitBranch,
  BarChart3, Activity, Settings as SettingsIcon, Users, Wallet,
  FileSearch, HelpCircle
} from 'lucide-react';
import { Badge } from './ui/badge';
import { useState, useEffect } from 'react';
import logoImage from 'figma:asset/880a47f996559cfc753dcf41a0cc637d9227473b.png';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  path: string;
  badge?: {
    count?: number;
    variant?: 'default' | 'destructive' | 'warning' | 'success';
  };
  children?: MenuItem[];
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  // Mock data for badges - in real app, fetch from API
  const [alertCount, setAlertCount] = useState(12);
  const [violationCount, setViolationCount] = useState(5);
  const [deviceWarnings, setDeviceWarnings] = useState(8);
  const [slaOverdue, setSlaOverdue] = useState(3);

  const menuSections = [
    {
      title: '仪表盘',
      items: [
        { id: 'dashboard', label: '总览与仪表盘', icon: LayoutDashboard, path: '/dashboard' },
        { id: 'spaces', label: '宿舍空间总览', icon: Grid3x3, path: '/spaces' },
      ]
    },
    {
      title: '监控',
      items: [
        { 
          id: 'alerts', 
          label: '告警中心', 
          icon: Bell, 
          path: '/alerts',
          badge: { count: alertCount, variant: 'destructive' as const }
        },
        { 
          id: 'violations', 
          label: '违规设备监测', 
          icon: AlertTriangle, 
          path: '/violations',
          badge: { count: violationCount, variant: 'warning' as const }
        },
      ]
    },
    {
      title: '运维',
      items: [
        { id: 'rooms', label: '住户与房间', icon: Home, path: '/rooms' },
        { 
          id: 'devices', 
          label: '设备与网关', 
          icon: Cpu, 
          path: '/devices',
          badge: { count: deviceWarnings, variant: 'warning' as const }
        },
        { 
          id: 'workorders', 
          label: '工单与巡检', 
          icon: ClipboardList, 
          path: '/workorders',
          badge: { count: slaOverdue, variant: 'destructive' as const }
        },
        { id: 'announcements', label: '公告与消息', icon: Megaphone, path: '/announcements' },
      ]
    },
    {
      title: '策略',
      items: [
        { id: 'policies', label: '策略与阈值', icon: FileText, path: '/policies' },
        { id: 'releases', label: '灰度发布与回滚', icon: GitBranch, path: '/policies/releases' },
      ]
    },
    {
      title: '分析',
      items: [
        { id: 'reports', label: '能耗分析与报表', icon: BarChart3, path: '/reports' },
        { id: 'load', label: '负荷分析', icon: Activity, path: '/analytics/load' },
        { id: 'classification', label: '设备识别校正台', icon: SettingsIcon, path: '/analytics/classification-tuning' },
      ]
    },
    {
      title: '系统管理',
      items: [
        { id: 'admin', label: '用户与权限', icon: Users, path: '/admin' },
        { id: 'finance', label: '财务与结算', icon: Wallet, path: '/finance' },
        { id: 'audit', label: '审计与日志', icon: FileSearch, path: '/settings/audit' },
        { id: 'settings', label: '系统设置', icon: SettingsIcon, path: '/settings' },
      ]
    },
    {
      title: '帮助',
      items: [
        { id: 'help', label: '问题自查', icon: HelpCircle, path: '/help/self-check' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        {/* 健思研 Logo */}
        <div className="flex items-center justify-center">
          <img src={logoImage} alt="健思研" className="h-16 object-contain" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {menuSections.map((section) => (
            <div key={section.title}>
              <div className="px-3 mb-2 text-xs text-gray-500 uppercase tracking-wider">
                {section.title}
              </div>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPath === item.path;
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => onNavigate(item.path)}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                        
                        {item.badge && item.badge.count && item.badge.count > 0 && (
                          <Badge 
                            variant={item.badge.variant || 'default'}
                            className="h-5 min-w-5 px-1.5 text-xs"
                          >
                            {item.badge.count}
                          </Badge>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            管
          </div>
          <div>
            <div className="text-sm">管理员</div>
            <div className="text-xs text-gray-500">admin@building.com</div>
          </div>
        </div>
      </div>
    </aside>
  );
}