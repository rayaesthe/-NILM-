import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  positive: boolean;
  iconColor: string;
  bgColor: string;
}

export function StatCard({ icon: Icon, label, value, change, positive, iconColor, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className="text-gray-600 text-sm mb-1">{label}</div>
      <div className="text-2xl mb-2">{value}</div>
      <div className={`text-sm ${positive ? 'text-green-600' : 'text-gray-600'}`}>
        {change} from last week
      </div>
    </div>
  );
}
