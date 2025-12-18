import { AlertTriangle, Info, XCircle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High Temperature',
    description: 'Floor 8 temperature above threshold',
    time: '5 min ago',
  },
  {
    id: 2,
    type: 'error',
    title: 'Elevator Maintenance',
    description: 'Elevator 3 requires inspection',
    time: '23 min ago',
  },
  {
    id: 3,
    type: 'info',
    title: 'Energy Peak Alert',
    description: 'Approaching daily energy target',
    time: '1 hour ago',
  },
];

export function AlertsList() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start gap-3">
            {alert.type === 'warning' && (
              <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            )}
            {alert.type === 'error' && (
              <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            )}
            {alert.type === 'info' && (
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <div className="mb-1">{alert.title}</div>
              <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
              <span className="text-xs text-gray-500">{alert.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
