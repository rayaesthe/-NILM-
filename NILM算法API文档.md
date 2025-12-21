# NILM算法API文档

## 1. 概述

该API文档描述了NILM（Non-Intrusive Load Monitoring）算法与智能建筑管理系统之间的接口，用于获取设备识别结果、能耗分析数据和实时监测信息。

### 1.1 认证方式

API使用Bearer Token认证方式，所有请求需在HTTP头中包含：

```
Authorization: Bearer YOUR_API_TOKEN
```

### 1.2 响应格式

所有API响应采用JSON格式，基本结构如下：

```json
{
  "success": true,
  "data": { ... },
  "message": "请求成功"
}
```

### 1.3 错误处理

错误响应格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

## 2. API端点

### 2.1 设备识别API

#### 2.1.1 获取实时设备识别结果

```
GET /api/nilm/devices/realtime
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "timestamp": "2025-12-20T14:30:00Z",
    "totalPower": 235.5,
    "devices": [
      {
        "id": "device_1",
        "name": "HVAC",
        "type": "HVAC",
        "power": 120.0,
        "status": "ON",
        "confidence": 0.95,
        "icon": "hvac"
      },
      {
        "id": "device_2",
        "name": "Lighting",
        "type": "Lighting",
        "power": 45.5,
        "status": "ON",
        "confidence": 0.98,
        "icon": "lighting"
      },
      {
        "id": "device_3",
        "name": "Refrigerator",
        "type": "Appliance",
        "power": 35.0,
        "status": "ON",
        "confidence": 0.92,
        "icon": "refrigerator"
      },
      {
        "id": "device_4",
        "name": "TV",
        "type": "Entertainment",
        "power": 18.0,
        "status": "ON",
        "confidence": 0.89,
        "icon": "tv"
      }
    ]
  }
}
```

#### 2.1.2 获取设备识别历史记录

```
GET /api/nilm/devices/history
```

**查询参数：**
- `startTime`: 开始时间 (ISO 8601格式)
- `endTime`: 结束时间 (ISO 8601格式)
- `deviceId`: 设备ID (可选)
- `limit`: 结果数量限制 (默认: 100)

**响应示例：**

```json
{
  "success": true,
  "data": {
    "records": [
      {
        "timestamp": "2025-12-20T14:30:00Z",
        "totalPower": 235.5,
        "deviceStates": [
          {
            "deviceId": "device_1",
            "status": "ON",
            "power": 120.0
          },
          // ... 更多设备状态
        ]
      },
      // ... 更多记录
    ],
    "total": 1440,
    "page": 1,
    "pages": 15
  }
}
```

### 2.2 能耗分析API

#### 2.2.1 获取设备能耗统计

```
GET /api/nilm/energy/device-stats
```

**查询参数：**
- `startTime`: 开始时间 (ISO 8601格式)
- `endTime`: 结束时间 (ISO 8601格式)
- `granularity`: 时间粒度 (hourly, daily, monthly)

**响应示例：**

```json
{
  "success": true,
  "data": {
    "granularity": "daily",
    "totalConsumption": 1650.5,
    "deviceStats": [
      {
        "deviceId": "device_1",
        "name": "HVAC",
        "type": "HVAC",
        "consumption": 705.0,
        "percentage": 42.7,
        "cost": 105.75
      },
      {
        "deviceId": "device_2",
        "name": "Lighting",
        "type": "Lighting",
        "consumption": 462.0,
        "percentage": 28.0,
        "cost": 69.30
      },
      {
        "deviceId": "device_3",
        "name": "Refrigerator",
        "type": "Appliance",
        "consumption": 297.0,
        "percentage": 18.0,
        "cost": 44.55
      },
      {
        "deviceId": "device_4",
        "name": "TV",
        "type": "Entertainment",
        "consumption": 129.0,
        "percentage": 7.8,
        "cost": 19.35
      },
      {
        "deviceId": "other",
        "name": "Other",
        "type": "Other",
        "consumption": 57.5,
        "percentage": 3.5,
        "cost": 8.63
      }
    ]
  }
}
```

#### 2.2.2 获取能耗趋势

```
GET /api/nilm/energy/trends
```

**查询参数：**
- `startTime`: 开始时间 (ISO 8601格式)
- `endTime`: 结束时间 (ISO 8601格式)
- `granularity`: 时间粒度 (hourly, daily, monthly)
- `deviceId`: 设备ID (可选，默认返回总能耗)

**响应示例：**

```json
{
  "success": true,
  "data": {
    "granularity": "daily",
    "deviceId": "total",
    "data": [
      {
        "timestamp": "2025-12-14T00:00:00Z",
        "day": "Mon",
        "consumption": 245.0,
        "target": 280.0
      },
      {
        "timestamp": "2025-12-15T00:00:00Z",
        "day": "Tue",
        "consumption": 238.0,
        "target": 280.0
      },
      // ... 更多数据点
    ]
  }
}
```

### 2.3 实时监测API

#### 2.3.1 获取实时能耗数据

```
GET /api/nilm/monitoring/realtime
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "timestamp": "2025-12-20T14:30:00Z",
    "totalPower": 235.5,
    "activeDevices": 12,
    "peakPower": 285.0,
    "peakTime": "2025-12-20T12:30:00Z",
    "avgPower": 187.2,
    "temperature": 22.5,
    "humidity": 45.0
  }
}
```

#### 2.3.2 获取设备状态变更记录

```
GET /api/nilm/monitoring/events
```

**查询参数：**
- `startTime`: 开始时间 (ISO 8601格式)
- `endTime`: 结束时间 (ISO 8601格式)
- `type`: 事件类型 (ON, OFF, ANOMALY) (可选)
- `deviceId`: 设备ID (可选)
- `limit`: 结果数量限制 (默认: 100)

**响应示例：**

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "event_1",
        "timestamp": "2025-12-20T14:30:00Z",
        "deviceId": "device_1",
        "deviceName": "HVAC",
        "type": "ON",
        "power": 120.0,
        "description": "设备启动"
      },
      {
        "id": "event_2",
        "timestamp": "2025-12-20T14:25:00Z",
        "deviceId": "device_2",
        "deviceName": "Lighting",
        "type": "ON",
        "power": 45.5,
        "description": "设备启动"
      },
      {
        "id": "event_3",
        "timestamp": "2025-12-20T14:20:00Z",
        "deviceId": "device_3",
        "deviceName": "Refrigerator",
        "type": "ANOMALY",
        "power": 45.0,
        "description": "功率异常，当前功率高于正常值28%"
      }
    ],
    "total": 56,
    "page": 1,
    "pages": 1
  }
}
```

### 2.4 设备管理API

#### 2.4.1 获取设备列表

```
GET /api/nilm/devices/list
```

**查询参数：**
- `type`: 设备类型 (可选)
- `status`: 设备状态 (ON, OFF) (可选)
- `limit`: 结果数量限制 (默认: 100)

**响应示例：**

```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "id": "device_1",
        "name": "HVAC",
        "type": "HVAC",
        "model": "Model X100",
        "manufacturer": "HVAC Corp",
        "location": "Floor 1, Room 101",
        "status": "ON",
        "power": 120.0,
        "avgPower": 98.5,
        "dailyConsumption": 236.4,
        "monthlyConsumption": 7092.0
      },
      // ... 更多设备
    ],
    "total": 45,
    "page": 1,
    "pages": 1
  }
}
```

#### 2.4.2 获取设备详情

```
GET /api/nilm/devices/{deviceId}
```

**响应示例：**

```json
{
  "success": true,
  "data": {
    "deviceId": "device_1",
    "name": "HVAC",
    "type": "HVAC",
    "model": "Model X100",
    "manufacturer": "HVAC Corp",
    "location": "Floor 1, Room 101",
    "installationDate": "2023-01-15",
    "status": "ON",
    "power": 120.0,
    "voltage": 220.0,
    "current": 0.545,
    "frequency": 50.0,
    "powerFactor": 0.98,
    "dailyConsumption": 236.4,
    "weeklyConsumption": 1654.8,
    "monthlyConsumption": 7092.0,
    "yearlyConsumption": 85104.0,
    "costPerMonth": 1063.80,
    "efficiencyRating": "A+",
    "maintenanceSchedule": "每月检查一次",
    "lastMaintenance": "2025-11-20"
  }
}
```

## 3. 数据集成示例

以下是将NILM API数据集成到前端组件的示例代码：

### 3.1 EnergyChart组件集成

```typescript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEffect, useState } from 'react';

interface EnergyData {
  day: string;
  consumption: number;
  target: number;
}

export function EnergyChart() {
  const [data, setData] = useState<EnergyData[]>([]);
  
  useEffect(() => {
    // 调用API获取能耗趋势数据
    const fetchEnergyData = async () => {
      try {
        const response = await fetch('/api/nilm/energy/trends?startTime=2025-12-14T00:00:00Z&endTime=2025-12-20T23:59:59Z&granularity=daily', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        const result = await response.json();
        if (result.success) {
          // 转换数据格式以适配图表组件
          const formattedData = result.data.data.map((item: any) => ({
            day: new Date(item.timestamp).toLocaleDateString('en-US', { weekday: 'short' }),
            consumption: item.consumption,
            target: item.target || 280
          }));
          setData(formattedData);
        }
      } catch (error) {
        console.error('获取能耗数据失败:', error);
      }
    };
    
    fetchEnergyData();
    
    // 设置定时刷新
    const interval = setInterval(fetchEnergyData, 5 * 60 * 1000); // 每5分钟刷新一次
    
    return () => clearInterval(interval);
  }, []);
  
  // 如果数据未加载，显示加载状态
  if (data.length === 0) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

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
```

### 3.2 EnergyPanel组件集成

```typescript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HourlyData {
  hour: string;
  usage: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

export function EnergyPanel() {
  const [hourlyData, setHourlyData] = useState<HourlyData[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [todayUsage, setTodayUsage] = useState<number>(0);
  const [peakDemand, setPeakDemand] = useState<number>(0);
  
  useEffect(() => {
    // 调用API获取小时级能耗数据
    const fetchHourlyData = async () => {
      try {
        const response = await fetch('/api/nilm/energy/trends?startTime=2025-12-20T00:00:00Z&endTime=2025-12-20T23:59:59Z&granularity=hourly', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        const result = await response.json();
        if (result.success) {
          const formattedData = result.data.data.map((item: any) => ({
            hour: new Date(item.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            usage: item.consumption
          }));
          setHourlyData(formattedData);
        }
      } catch (error) {
        console.error('获取小时级能耗数据失败:', error);
      }
    };
    
    // 调用API获取分类能耗数据
    const fetchCategoryData = async () => {
      try {
        const response = await fetch('/api/nilm/energy/device-stats?startTime=2025-12-20T00:00:00Z&endTime=2025-12-20T23:59:59Z&granularity=daily', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        const result = await response.json();
        if (result.success) {
          const colors = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];
          const formattedData = result.data.deviceStats.map((item: any, index: number) => ({
            name: item.name,
            value: item.percentage,
            color: colors[index % colors.length]
          }));
          setCategoryData(formattedData);
        }
      } catch (error) {
        console.error('获取分类能耗数据失败:', error);
      }
    };
    
    // 调用API获取实时监测数据
    const fetchRealTimeData = async () => {
      try {
        const response = await fetch('/api/nilm/monitoring/realtime', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        const result = await response.json();
        if (result.success) {
          setTodayUsage(result.data.totalPower);
          setPeakDemand(result.data.peakPower);
        }
      } catch (error) {
        console.error('获取实时数据失败:', error);
      }
    };
    
    fetchHourlyData();
    fetchCategoryData();
    fetchRealTimeData();
    
    // 设置定时刷新
    const interval = setInterval(() => {
      fetchRealTimeData();
    }, 1 * 60 * 1000); // 每1分钟刷新一次实时数据
    
    return () => clearInterval(interval);
  }, []);
  
  // 如果数据未加载，显示加载状态
  if (hourlyData.length === 0 || categoryData.length === 0) {
    return <div className="flex justify-center items-center h-64">加载中...</div>;
  }

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
          <div className="text-2xl mb-1">{todayUsage.toFixed(1)} kWh</div>
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
          <div className="text-2xl mb-1">{peakDemand.toFixed(0)} kW</div>
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
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={(entry) => `${entry.value}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((item) => (
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
```

## 4. 集成建议

1. **数据缓存**：实现客户端数据缓存机制，减少API请求次数
2. **错误处理**：添加完善的错误处理和重试机制
3. **实时更新**：使用WebSocket或定时轮询实现关键数据的实时更新
4. **数据转换**：根据前端组件需求，在客户端进行数据格式转换
5. **性能优化**：实现分页加载、按需获取数据等性能优化策略
6. **认证管理**：实现安全的API令牌管理和刷新机制

## 5. 扩展功能

API设计支持以下扩展功能：

1. **能耗预测**：基于历史数据预测未来能耗
2. **异常检测**：识别设备异常运行状态
3. **节能建议**：提供个性化的节能优化建议
4. **成本分析**：基于能耗数据进行成本分析和预测
5. **设备寿命预测**：基于运行数据预测设备剩余寿命

## 6. 示例数据更新

以下是使用API数据更新前端组件的示例：

### 6.1 更新Dashboard.tsx组件

```typescript
import { Activity, Zap, Thermometer, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatCard } from './StatCard';
import { EnergyChart } from './EnergyChart';
import { OccupancyGrid } from './OccupancyGrid';
import { AlertsList } from './AlertsList';
import { useEffect, useState } from 'react';

export function Dashboard() {
  const [energyUsage, setEnergyUsage] = useState<string>('0 kWh');
  const [avgTemperature, setAvgTemperature] = useState<string>('0°C');
  const [occupancy, setOccupancy] = useState<string>('0/0');
  const [systemStatus, setSystemStatus] = useState<string>('Unknown');
  
  useEffect(() => {
    // 调用API获取实时数据
    const fetchRealTimeData = async () => {
      try {
        // 获取能耗数据
        const energyResponse = await fetch('/api/nilm/monitoring/realtime', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        if (energyResponse.ok) {
          const energyResult = await energyResponse.json();
          if (energyResult.success) {
            setEnergyUsage(`${energyResult.data.totalPower.toFixed(1)} kWh`);
          }
        }
        
        // 获取温度数据
        // 注意：这里假设温度数据来自其他API，实际实现中可能需要调整
        const tempResponse = await fetch('/api/building/temperature', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        if (tempResponse.ok) {
          const tempResult = await tempResponse.json();
          if (tempResult.success) {
            setAvgTemperature(`${tempResult.data.avgTemperature.toFixed(0)}°C`);
          }
        }
        
        // 获取占用率数据
        const occupancyResponse = await fetch('/api/building/occupancy', {
          headers: {
            'Authorization': 'Bearer YOUR_API_TOKEN'
          }
        });
        
        if (occupancyResponse.ok) {
          const occupancyResult = await occupancyResponse.json();
          if (occupancyResult.success) {
            setOccupancy(`${occupancyResult.data.current}/${occupancyResult.data.capacity}`);
          }
        }
        
        // 系统状态
        setSystemStatus('Optimal');
      } catch (error) {
        console.error('获取仪表盘数据失败:', error);
      }
    };
    
    fetchRealTimeData();
    
    // 设置定时刷新
    const interval = setInterval(fetchRealTimeData, 5 * 60 * 1000); // 每5分钟刷新一次
    
    return () => clearInterval(interval);
  }, []);

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
          value={energyUsage}
          change="-12%"
          positive={true}
          iconColor="text-yellow-600"
          bgColor="bg-yellow-50"
        />
        <StatCard
          icon={Thermometer}
          label="Avg Temperature"
          value={avgTemperature}
          change="+1°C"
          positive={false}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={Users}
          label="Occupancy"
          value={occupancy}
          change="69%"
          positive={true}
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={Activity}
          label="System Status"
          value={systemStatus}
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
```

