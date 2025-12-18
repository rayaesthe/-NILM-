import { Bell, User, Search } from 'lucide-react';
import { Badge } from './ui/badge';
import platformImage from 'figma:asset/f94dba9f54b5f0bdb12e2a82c3097ae8013331e2.png';

interface TopBarProps {
  breadcrumbPath: string[];
  onNavigate: (path: string) => void;
}

export function TopBar({ breadcrumbPath, onNavigate }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      {/* Left: Platform Title */}
      <div className="flex items-center gap-4">
        <img src={platformImage} alt="宿舍电力管理平台" className="h-10 object-contain" />
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm ml-6">
          {breadcrumbPath.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <span className="text-gray-400">/</span>}
              <button
                onClick={() => {
                  // Handle breadcrumb navigation if needed
                }}
                className={`${
                  index === breadcrumbPath.length - 1
                    ? 'text-gray-900'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Search, Notifications, User */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="搜索..."
            className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            管
          </div>
          <div className="text-sm">
            <div className="text-gray-900">管理员</div>
          </div>
        </div>
      </div>
    </div>
  );
}
