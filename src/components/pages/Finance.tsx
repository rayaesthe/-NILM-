import { 
  Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, 
  AlertCircle, CheckCircle, Building2, Search, Download, Filter 
} from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export function Finance() {
  const [selectedBuilding, setSelectedBuilding] = useState('全部');
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // 每月费用趋势
  const monthlyTrend = [
    { month: '7月', amount: 38520 },
    { month: '8月', amount: 42180 },
    { month: '9月', amount: 39820 },
    { month: '10月', amount: 41750 },
    { month: '11月', amount: 43290 },
    { month: '12月', amount: 45280 },
  ];

  // 楼栋费用统计
  const buildingStats = [
    { name: 'A栋', rooms: 120, totalCost: 8520, avgCost: 71, status: 'normal', unpaid: 2 },
    { name: 'B栋', rooms: 120, totalCost: 7890, avgCost: 65.8, status: 'normal', unpaid: 1 },
    { name: 'C栋', rooms: 96, totalCost: 6920, avgCost: 72.1, status: 'warning', unpaid: 5 },
    { name: 'D栋', rooms: 84, totalCost: 5850, avgCost: 69.6, status: 'normal', unpaid: 0 },
    { name: 'E栋', rooms: 108, totalCost: 7680, avgCost: 71.1, status: 'normal', unpaid: 3 },
    { name: 'F栋', rooms: 120, totalCost: 8420, avgCost: 70.2, status: 'normal', unpaid: 1 },
  ];

  // 宿舍拓扑结构 - 以A栋为例
  const dormTopology = {
    building: 'A栋',
    floors: [
      {
        floor: 6,
        rooms: [
          { id: '601', occupants: 4, cost: 89.5, status: 'paid', devices: 8, power: 125 },
          { id: '602', occupants: 4, cost: 72.3, status: 'paid', devices: 7, power: 98 },
          { id: '603', occupants: 3, cost: 65.8, status: 'pending', devices: 6, power: 85 },
          { id: '604', occupants: 4, cost: 91.2, status: 'paid', devices: 9, power: 132 },
          { id: '605', occupants: 4, cost: 68.5, status: 'paid', devices: 7, power: 92 },
          { id: '606', occupants: 4, cost: 78.9, status: 'paid', devices: 8, power: 108 },
          { id: '607', occupants: 4, cost: 82.1, status: 'paid', devices: 8, power: 115 },
          { id: '608', occupants: 3, cost: 59.6, status: 'paid', devices: 5, power: 78 },
          { id: '609', occupants: 4, cost: 95.3, status: 'overdue', devices: 10, power: 145 },
          { id: '610', occupants: 4, cost: 73.8, status: 'paid', devices: 7, power: 101 },
        ]
      },
      {
        floor: 5,
        rooms: [
          { id: '501', occupants: 4, cost: 76.2, status: 'paid', devices: 7, power: 102 },
          { id: '502', occupants: 4, cost: 69.8, status: 'paid', devices: 7, power: 95 },
          { id: '503', occupants: 4, cost: 88.5, status: 'paid', devices: 9, power: 128 },
          { id: '504', occupants: 4, cost: 71.3, status: 'pending', devices: 6, power: 89 },
          { id: '505', occupants: 3, cost: 62.1, status: 'paid', devices: 6, power: 82 },
          { id: '506', occupants: 4, cost: 79.6, status: 'paid', devices: 8, power: 110 },
          { id: '507', occupants: 4, cost: 85.2, status: 'paid', devices: 8, power: 118 },
          { id: '508', occupants: 4, cost: 74.9, status: 'paid', devices: 7, power: 103 },
          { id: '509', occupants: 4, cost: 91.7, status: 'paid', devices: 9, power: 135 },
          { id: '510', occupants: 4, cost: 67.5, status: 'paid', devices: 6, power: 88 },
        ]
      },
      {
        floor: 4,
        rooms: [
          { id: '401', occupants: 4, cost: 73.8, status: 'paid', devices: 7, power: 98 },
          { id: '402', occupants: 4, cost: 82.5, status: 'paid', devices: 8, power: 115 },
          { id: '403', occupants: 4, cost: 68.2, status: 'paid', devices: 6, power: 90 },
          { id: '404', occupants: 3, cost: 58.9, status: 'paid', devices: 5, power: 75 },
          { id: '405', occupants: 4, cost: 77.3, status: 'paid', devices: 7, power: 105 },
          { id: '406', occupants: 4, cost: 86.1, status: 'paid', devices: 8, power: 122 },
          { id: '407', occupants: 4, cost: 72.6, status: 'pending', devices: 7, power: 96 },
          { id: '408', occupants: 4, cost: 79.8, status: 'paid', devices: 8, power: 112 },
          { id: '409', occupants: 4, cost: 93.2, status: 'paid', devices: 9, power: 138 },
          { id: '410', occupants: 4, cost: 71.5, status: 'paid', devices: 7, power: 95 },
        ]
      },
    ]
  };

  // 获取房间状态颜色
  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  // 获取房间状态文本
  const getRoomStatusText = (status: string) => {
    switch (status) {
      case 'paid': return '已缴费';
      case 'pending': return '待缴费';
      case 'overdue': return '已逾期';
      default: return '未知';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>财务与结算</h1>
          <p className="text-gray-500 mt-1">管理能耗费用和结算记录 - 按宿舍精准计费</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-blue-700">
            <Download className="w-4 h-4" />
            导出报表
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 text-sm">本月总费用</p>
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-gray-900">¥45,280</p>
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <TrendingUp className="w-3 h-3" />
              <span>较上月 +4.6%</span>
            </div>
          </div>
        </Card>

        <Card className="p-5 border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 text-sm">已结算金额</p>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-gray-900">¥32,930</p>
            <p className="text-sm text-gray-500">占比 72.7%</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 text-sm">待结算金额</p>
            <Calendar className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-gray-900">¥10,180</p>
            <p className="text-sm text-gray-500">12间宿舍</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 text-sm">逾期未缴</p>
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl text-gray-900">¥2,170</p>
            <p className="text-sm text-red-600">12间宿舍待催缴</p>
          </div>
        </Card>
      </div>

      {/* 月度趋势与楼栋统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 月度费用趋势 */}
        <Card className="p-6">
          <h2 className="mb-4">月度费用趋势</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
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
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* 楼栋费用对比 */}
        <Card className="p-6">
          <h2 className="mb-4">楼栋费用对比</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={buildingStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="name" 
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
              <Bar dataKey="totalCost" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* 楼栋概览 */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2>楼栋费用概览</h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-600">已缴费</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">待缴费</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">已逾期</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildingStats.map((building) => (
            <div 
              key={building.name}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedBuilding(building.name)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-700" />
                  <span className="text-lg text-gray-900">{building.name}</span>
                </div>
                {building.unpaid > 0 && (
                  <Badge variant="destructive" className="text-xs">
                    {building.unpaid}间未缴
                  </Badge>
                )}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">总费用</span>
                  <span className="text-gray-900">¥{building.totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">平均费用</span>
                  <span className="text-gray-900">¥{building.avgCost}/间</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">房间数</span>
                  <span className="text-gray-900">{building.rooms}间</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 宿舍拓扑图 - A栋详情 */}
      <Card className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2>宿舍拓扑图 - {dormTopology.building}</h2>
              <p className="text-sm text-gray-500 mt-1">点击房间查看详细费用明细</p>
            </div>
            <div className="flex items-center gap-2">
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>A栋</option>
                <option>B栋</option>
                <option>C栋</option>
                <option>D栋</option>
                <option>E栋</option>
                <option>F栋</option>
              </select>
            </div>
          </div>
        </div>

        {/* 楼层拓扑 */}
        <div className="space-y-6">
          {dormTopology.floors.map((floorData) => (
            <div key={floorData.floor}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-300">
                  <div className="text-center">
                    <div className="text-xs text-gray-500">第</div>
                    <div className="text-lg text-gray-900">{floorData.floor}</div>
                    <div className="text-xs text-gray-500">层</div>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-5 md:grid-cols-10 gap-2">
                  {floorData.rooms.map((room) => (
                    <div
                      key={room.id}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                        selectedRoom === room.id 
                          ? 'border-blue-500 shadow-lg' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      onClick={() => setSelectedRoom(room.id)}
                    >
                      {/* 房间状态指示器 */}
                      <div className={`absolute top-1 right-1 w-2 h-2 rounded-full ${getRoomStatusColor(room.status)}`}></div>
                      
                      {/* 房间号 */}
                      <div className="text-center">
                        <div className="text-xs text-gray-900 mb-1">{room.id}</div>
                        <div className="text-xs text-gray-900">¥{room.cost}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 选中房间的详细信息 */}
        {selectedRoom && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            {dormTopology.floors.map((floorData) => {
              const room = floorData.rooms.find(r => r.id === selectedRoom);
              if (!room) return null;
              
              return (
                <div key={selectedRoom}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg text-gray-900">房间 {room.id} 费用详情</h3>
                      <p className="text-sm text-gray-600 mt-1">本月电费明细</p>
                    </div>
                    <Badge 
                      variant={room.status === 'paid' ? 'default' : room.status === 'pending' ? 'warning' : 'destructive'}
                    >
                      {getRoomStatusText(room.status)}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-3 bg-white rounded-lg border border-blue-100">
                      <p className="text-xs text-gray-600 mb-1">总费用</p>
                      <p className="text-xl text-gray-900">¥{room.cost}</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-100">
                      <p className="text-xs text-gray-600 mb-1">入住人数</p>
                      <p className="text-xl text-gray-900">{room.occupants}人</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-100">
                      <p className="text-xs text-gray-600 mb-1">用电设备</p>
                      <p className="text-xl text-gray-900">{room.devices}台</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-blue-100">
                      <p className="text-xs text-gray-600 mb-1">总功率</p>
                      <p className="text-xl text-gray-900">{room.power}W</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-white rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-600 mb-2">费用构成</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">基础电费</span>
                        <span className="text-gray-900">¥{(room.cost * 0.65).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">峰值电费</span>
                        <span className="text-gray-900">¥{(room.cost * 0.25).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">服务费</span>
                        <span className="text-gray-900">¥{(room.cost * 0.1).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-200">
                        <span className="text-gray-900">合计</span>
                        <span className="text-gray-900">¥{room.cost}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
