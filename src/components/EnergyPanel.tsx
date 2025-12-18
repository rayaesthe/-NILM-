import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, TrendingUp, Zap } from 'lucide-react';

const hourlyData = [
  { hour: '00:00', usage: 45 },
  { hour: '04:00', usage: 38 },
  { hour: '08:00', usage: 125 },
  { hour: '12:00', usage: 235 },
  { hour: '16:00', usage: 198 },
  { hour: '20:00', usage: 87 },
  { hour: '23:00', usage: 52 },
];

const consumptionByCategory = [
  { name: 'HVAC', value: 42, color: '#3b82f6' },
  { name: 'Lighting', value: 28, color: '#f59e0b' },
  { name: 'Equipment', value: 18, color: '#10b981' },
  { name: 'Elevators', value: 8, color: '#8b5cf6' },
  { name: 'Other', value: 4, color: '#6b7280' },
];

export function EnergyPanel() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1>Energy Management</h1>
        <p className="text-gray-600">Monitor and optimize energy consumption</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingDown className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-gray-600 text-sm mb-1">Today&apos;s Usage</div>
          <div className="text-2xl mb-1">234.5 kWh</div>
          <div className="text-sm text-green-600">12% below target</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Monthly Savings</div>
          <div className="text-2xl mb-1">$1,247</div>
          <div className="text-sm text-gray-600">vs last month</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-gray-600 text-sm mb-1">Peak Demand</div>
          <div className="text-2xl mb-1">285 kW</div>
          <div className="text-sm text-gray-600">at 2:30 PM</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>Hourly Consumption</h2>
            <p className="text-gray-600 text-sm">Today&apos;s energy usage pattern</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="usage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="mb-6">
            <h2>By Category</h2>
            <p className="text-gray-600 text-sm">Energy distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={consumptionByCategory}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.value}%`}
              >
                {consumptionByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {consumptionByCategory.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
                <span className="text-gray-600">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2>Energy Optimization Recommendations</h2>
        </div>
        <div className="space-y-4">
          <RecommendationCard
            title="Adjust HVAC Schedule"
            description="Reduce cooling during low occupancy hours (6 PM - 7 AM) to save up to $450/month"
            potential="$450/mo"
            difficulty="Easy"
          />
          <RecommendationCard
            title="LED Lighting Upgrade"
            description="Replace remaining fluorescent fixtures on floors 3-5 for 25% lighting energy reduction"
            potential="$280/mo"
            difficulty="Medium"
          />
          <RecommendationCard
            title="Solar Panel Installation"
            description="Roof capacity analysis shows potential for 150kW solar installation"
            potential="$1,200/mo"
            difficulty="Complex"
          />
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  title,
  description,
  potential,
  difficulty,
}: {
  title: string;
  description: string;
  potential: string;
  difficulty: string;
}) {
  const getDifficultyColor = () => {
    if (difficulty === 'Easy') return 'bg-green-100 text-green-700';
    if (difficulty === 'Medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="mb-2">{title}</div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs ${getDifficultyColor()}`}>
            {difficulty}
          </span>
          <span className="text-green-600">Savings: {potential}</span>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Learn More
        </button>
      </div>
    </div>
  );
}
