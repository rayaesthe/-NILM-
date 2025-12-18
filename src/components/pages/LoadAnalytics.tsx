import { Activity, Zap, TrendingUp, TrendingDown, Lightbulb, Wind, Flame, Monitor, RefrigeratorIcon, Coffee, Fan, Cpu } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';

export function LoadAnalytics() {
  // 每日负荷趋势数据
  const dailyLoadData = [
    { time: '0', value: 145 },
    { time: '2', value: 128 },
    { time: '4', value: 95 },
    { time: '6', value: 165 },
    { time: '8', value: 285 },
    { time: '10', value: 342 },
    { time: '12', value: 398 },
    { time: '14', value: 375 },
    { time: '16', value: 425 },
    { time: '18', value: 462 },
    { time: '20', value: 398 },
    { time: '22', value: 285 },
    { time: '24', value: 178 },
  ];

  // 建筑负载分解数据 (NILM识别的不同楼栋)
  const buildingLoadData = [
    { name: '宿舍楼A', value: [180, 220], category: 'building' },
    { name: '宿舍楼B', value: [160, 195], category: 'building' },
    { name: '教学楼', value: [240, 270], category: 'highlight' },
    { name: '宿舍楼C', value: [210, 245], category: 'building' },
    { name: '宿舍楼D', value: [145, 178], category: 'building' },
    { name: '行政楼', value: [195, 235], category: 'building' },
    { name: '宿舍楼E', value: [175, 208], category: 'building' },
    { name: '宿舍楼F', value: [280, 315], category: 'building' },
    { name: '宿舍楼G', value: [360, 385], category: 'highlight' },
    { name: '宿舍楼H', value: [215, 248], category: 'building' },
    { name: '未分类', value: [98, 125], category: 'unclassified' },
  ];

  // 设备性能分解数据
  const devicePerformanceData = [
    { name: '空调', value: [125, 165], category: 'building' },
    { name: '照明', value: [85, 195], category: 'building' },
    { name: '电脑', value: [230, 265], category: 'highlight' },
    { name: '热水器', value: [145, 185], category: 'building' },
    { name: '冰箱', value: [95, 135], category: 'building' },
    { name: '风扇', value: [65, 115], category: 'building' },
  ];

  // 用电分类数据（饼图）
  const loadTypeData = [
    { name: '照明负荷', value: 52.1, color: '#60a5fa' },
    { name: '供暖负荷', value: 22.8, color: '#34d399' },
    { name: '制冷负荷', value: 15.9, color: '#a78bfa' },
  ];

  // 具体用电器识别数据（NILM分解结果）
  const applianceData = [
    { name: '空调', value: 28.5, icon: Wind, color: '#60a5fa', type: '制冷负荷' },
    { name: '照明', value: 22.3, icon: Lightbulb, color: '#fbbf24', type: '照明负荷' },
    { name: '电脑', value: 18.7, icon: Monitor, color: '#8b5cf6', type: '照明负荷' },
    { name: '热水器', value: 15.2, icon: Flame, color: '#f87171', type: '供暖负荷' },
    { name: '冰箱', value: 8.9, icon: RefrigeratorIcon, color: '#10b981', type: '制冷负荷' },
    { name: '其他', value: 6.4, icon: Coffee, color: '#6b7280', type: '其他' },
  ];

  // 电力消耗列表
  const powerConsumptionList = [
    { name: '空调', value: 245, trend: 'up', percent: 12.5 },
    { name: '照明', value: 186, trend: 'down', percent: -5.2 },
    { name: '热水器', value: 158, trend: 'up', percent: 8.3 },
    { name: '电脑', value: 142, trend: 'up', percent: 3.7 },
    { name: '冰箱', value: 95, trend: 'down', percent: -2.1 },
    { name: '风扇', value: 67, trend: 'up', percent: 15.6 },
  ];

  const COLORS = ['#60a5fa', '#34d399', '#a78bfa', '#fbbf24', '#f87171', '#10b981'];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>负荷分析</h1>
          <p className="text-gray-500 mt-1">基于NILM非接触式负荷分解的智能识别与分析</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            实时监测中
          </Badge>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">总负荷实时负荷</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-900">265</span>
              <span className="text-sm text-gray-600">kW</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown className="w-3 h-3" />
              <span>↓10.03%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-gray-200">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">昨日电量</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-900">3,671</span>
              <span className="text-sm text-gray-600">kWh</span>
            </div>
            <div className="flex items-center gap-1 text-red-600 text-sm">
              <TrendingDown className="w-3 h-3" />
              <span>↓0.03%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">昨日费用</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-900">156</span>
              <span className="text-sm text-gray-600">元</span>
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingDown className="w-3 h-3" />
              <span>↓10.03%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-gray-200">
          <div className="space-y-2">
            <p className="text-gray-600 text-sm">总设备数</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl text-gray-900">318</span>
              <span className="text-sm text-gray-600">台</span>
            </div>
          </div>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 每日负荷趋势图 */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2>每日负荷趋势</h2>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="text-gray-500">Total Projects</span>
                <span className="text-gray-500">Operating Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span className="text-gray-600">50万</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                  <span className="text-gray-600">下50万</span>
                </div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={dailyLoadData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* 电力消耗列表 */}
        <Card className="p-6">
          <h2 className="mb-4">电力消耗</h2>
          <div className="space-y-4">
            {powerConsumptionList.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-1 bg-gray-900 rounded"></div>
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-900">{item.value} kW</span>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-red-500" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* NILM负荷分解区域 */}
      <div>
        <div className="mb-4">
          <h2>NILM负荷分解</h2>
          <p className="text-sm text-gray-500 mt-1">非接触式负荷监测 - 智能识别各类用电器负荷特征</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 建筑负载分解 */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm">建筑负载分解</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={buildingLoadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {buildingLoadData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        entry.category === 'highlight' ? '#000000' : 
                        entry.category === 'unclassified' ? '#9ca3af' :
                        index % 2 === 0 ? '#818cf8' : '#6ee7b7'
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* 设备性能分解 */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm">设备性能分解</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={devicePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 11 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9ca3af', fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {devicePerformanceData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.category === 'highlight' ? '#000000' : '#60a5fa'} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* 用电分类（饼图） */}
          <Card className="p-6">
            <h3 className="mb-4 text-sm">用电分类</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={loadTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {loadTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {loadTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 用电器识别详情 */}
      <Card className="p-6">
        <div className="mb-6">
          <h2>用电器识别详情</h2>
          <p className="text-sm text-gray-500 mt-1">基于NILM算法自动识别的具体用电器及其负荷占比</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {applianceData.map((appliance, index) => {
            const Icon = appliance.icon;
            return (
              <div key={index} className="flex flex-col items-center">
                {/* 圆形图标 */}
                <div className="relative mb-3">
                  <svg width="120" height="120" className="transform -rotate-90">
                    {/* 背景圆环 */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    {/* 进度圆环 */}
                    <circle
                      cx="60"
                      cy="60"
                      r="50"
                      fill="none"
                      stroke={appliance.color}
                      strokeWidth="12"
                      strokeDasharray={`${(appliance.value / 100) * 314} 314`}
                      strokeLinecap="round"
                    />
                  </svg>
                  {/* 中心图标 */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${appliance.color}20` }}
                    >
                      <Icon className="w-8 h-8" style={{ color: appliance.color }} />
                    </div>
                  </div>
                </div>
                
                {/* 信息 */}
                <div className="text-center">
                  <p className="text-sm text-gray-900 mb-1">{appliance.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{appliance.type}</p>
                  <Badge variant="outline" className="text-xs">
                    {appliance.value}%
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
