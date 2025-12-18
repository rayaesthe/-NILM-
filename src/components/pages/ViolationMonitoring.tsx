import { useState } from 'react';
import { AlertTriangle, Zap, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface Violation {
  id: string;
  room: string;
  building: string;
  deviceType: string;
  power: number;
  duration: number;
  timestamp: string;
  status: 'active' | 'handled';
}

export function ViolationMonitoring() {
  const [searchTerm, setSearchTerm] = useState('');

  const violations: Violation[] = [
    { id: '1', room: '401', building: '3号楼', deviceType: '电热水器', power: 2.8, duration: 45, timestamp: '2025-12-18 14:20', status: 'active' },
    { id: '2', room: '205', building: '6号楼', deviceType: '电磁炉', power: 2.2, duration: 30, timestamp: '2025-12-18 13:45', status: 'active' },
    { id: '3', room: '308', building: '1号楼', deviceType: '电吹风', power: 1.8, duration: 15, timestamp: '2025-12-18 12:30', status: 'handled' },
    { id: '4', room: '502', building: '4号楼', deviceType: '电暖器', power: 2.5, duration: 120, timestamp: '2025-12-18 11:00', status: 'active' },
    { id: '5', room: '103', building: '2号楼', deviceType: '热得快', power: 1.5, duration: 25, timestamp: '2025-12-18 10:15', status: 'handled' },
  ];

  const filteredViolations = violations.filter(v =>
    v.room.includes(searchTerm) || v.building.includes(searchTerm) || v.deviceType.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>违规设备监测</h1>
          <p className="text-gray-500 mt-1">实时监测大功率违规用电设备</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="px-3 py-1">
            进行中 {violations.filter(v => v.status === 'active').length}
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            已处理 {violations.filter(v => v.status === 'handled').length}
          </Badge>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">今日违规次数</p>
              <p className="mt-1">{violations.length} 次</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">平均功率</p>
              <p className="mt-1">{(violations.reduce((sum, v) => sum + v.power, 0) / violations.length).toFixed(1)} kW</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">涉及楼栋</p>
              <p className="mt-1">{new Set(violations.map(v => v.building)).size} 栋</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">平均持续时间</p>
              <p className="mt-1">{(violations.reduce((sum, v) => sum + v.duration, 0) / violations.length).toFixed(0)} 分钟</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="搜索房间号、楼栋或设备类型..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Violations List */}
      <div className="space-y-3">
        {filteredViolations.map((violation) => (
          <Card key={violation.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{violation.building} - {violation.room}室</h3>
                    <Badge variant={violation.status === 'active' ? 'destructive' : 'default'}>
                      {violation.status === 'active' ? '进行中' : '已处理'}
                    </Badge>
                  </div>
                  <div className="text-gray-600 text-sm space-y-1">
                    <p>违规设备：{violation.deviceType}</p>
                    <p>功率：<span className="text-red-600">{violation.power} kW</span> · 持续时间：{violation.duration} 分钟</p>
                    <p className="text-gray-500">{violation.timestamp}</p>
                  </div>
                </div>
              </div>
              {violation.status === 'active' && (
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  处理
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
