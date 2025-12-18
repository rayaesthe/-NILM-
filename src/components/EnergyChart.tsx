import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: 'Mon', consumption: 245, target: 280 },
  { day: 'Tue', consumption: 238, target: 280 },
  { day: 'Wed', consumption: 252, target: 280 },
  { day: 'Thu', consumption: 229, target: 280 },
  { day: 'Fri', consumption: 241, target: 280 },
  { day: 'Sat', consumption: 186, target: 280 },
  { day: 'Sun', consumption: 178, target: 280 },
];

export function EnergyChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#666" />
        <YAxis stroke="#666" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e5e7eb',
            borderRadius: '8px'
          }}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="consumption" 
          stroke="#3b82f6" 
          strokeWidth={2}
          name="Consumption (kWh)"
          dot={{ fill: '#3b82f6', r: 4 }}
        />
        <Line 
          type="monotone" 
          dataKey="target" 
          stroke="#94a3b8" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Target (kWh)"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
