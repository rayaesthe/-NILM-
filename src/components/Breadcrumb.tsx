import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbProps {
  path: string[];
  onNavigate: (path: string) => void;
}

export function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-2 text-sm">
        <button 
          onClick={() => onNavigate('/spaces')}
          className="text-gray-500 hover:text-gray-700 transition-colors"
          title="返回空间总览"
        >
          <Home className="w-4 h-4" />
        </button>
        
        {path.map((segment, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className={index === path.length - 1 ? 'text-gray-900' : 'text-gray-500'}>
              {segment}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
