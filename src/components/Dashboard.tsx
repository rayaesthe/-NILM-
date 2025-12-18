import { Activity, Zap, Thermometer, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { EnergyChart } from './EnergyChart';
import { OccupancyGrid } from './OccupancyGrid';
import { AlertsList } from './AlertsList';

export function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Building Overview</h1>
        <p className="text-gray-600">Real-time monitoring and control</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Zap}
          label="Energy Usage"
          value="234.5 kWh"
          change="-12%"
          positive={true}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={Thermometer}
          label="Avg Temperature"
          value="22°C"
          change="+1°C"
          positive={false}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={Users}
          label="Occupancy"
          value="347/500"
          change="69%"
          positive={true}
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={Activity}
          label="System Status"
          value="Optimal"
          change="98% uptime"
          positive={true}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2>Energy Consumption</h2>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <EnergyChart />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2>Alerts</h2>
            <span className="px-2 py-1 bg-red-100 text-red-600 rounded text-sm">3 Active</span>
          </div>
          <AlertsList />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>Floor Occupancy</h2>
            <p className="text-gray-600 text-sm">Real-time space utilization</p>
          </div>
          <OccupancyGrid />
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>System Status</h2>
          </div>
          <div className="space-y-4">
            <SystemStatusRow label="HVAC System" status="operational" />
            <SystemStatusRow label="Lighting Control" status="operational" />
            <SystemStatusRow label="Security System" status="operational" />
            <SystemStatusRow label="Fire Detection" status="operational" />
            <SystemStatusRow label="Elevator System" status="warning" />
            <SystemStatusRow label="Water Management" status="operational" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SystemStatusRow({ label, status }: { label: string; status: 'operational' | 'warning' | 'error' }) {
  const getStatusColor = () => {
    if (status === 'operational') return 'text-green-600 bg-green-50';
    if (status === 'warning') return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getStatusText = () => {
    if (status === 'operational') return 'Operational';
    if (status === 'warning') return 'Warning';
    return 'Error';
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        {status === 'operational' ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
        )}
        <span>{label}</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
        {getStatusText()}
      </span>
    </div>
  );
}
