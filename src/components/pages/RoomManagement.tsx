import { useState } from 'react';
import { Home, Users, Search, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';

interface RoomManagementProps {
  onNavigate: (path: string) => void;
  onBreadcrumbChange: (path: string[]) => void;
}

interface Room {
  id: string;
  building: string;
  floor: number;
  roomNumber: string;
  capacity: number;
  occupied: number;
  residents: string[];
  status: 'normal' | 'warning' | 'error';
}

export function RoomManagement({ onNavigate, onBreadcrumbChange }: RoomManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('all');

  const rooms: Room[] = [
    { id: '1', building: '1号楼', floor: 4, roomNumber: '401', capacity: 4, occupied: 4, residents: ['张三', '李四', '王五', '赵六'], status: 'normal' },
    { id: '2', building: '1号楼', floor: 4, roomNumber: '402', capacity: 4, occupied: 3, residents: ['孙七', '周八', '吴九'], status: 'normal' },
    { id: '3', building: '1号楼', floor: 4, roomNumber: '403', capacity: 4, occupied: 4, residents: ['郑十', '钱一', '陈二', '朱三'], status: 'warning' },
    { id: '4', building: '2号楼', floor: 3, roomNumber: '301', capacity: 4, occupied: 2, residents: ['刘四', '杨五'], status: 'normal' },
    { id: '5', building: '2号楼', floor: 3, roomNumber: '302', capacity: 4, occupied: 4, residents: ['黄六', '林七', '徐八', '马九'], status: 'error' },
    { id: '6', building: '3号楼', floor: 5, roomNumber: '501', capacity: 4, occupied: 4, residents: ['何十', '罗一', '宋二', '梁三'], status: 'normal' },
  ];

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.includes(searchTerm) || 
                         room.building.includes(searchTerm) ||
                         room.residents.some(r => r.includes(searchTerm));
    const matchesBuilding = selectedBuilding === 'all' || room.building === selectedBuilding;
    return matchesSearch && matchesBuilding;
  });

  const buildings = Array.from(new Set(rooms.map(r => r.building)));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'error':
        return 'bg-red-100 text-red-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'error':
        return '异常';
      case 'warning':
        return '注意';
      default:
        return '正常';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>住户与房间管理</h1>
          <p className="text-gray-500 mt-1">管理宿舍房间和住户信息</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          + 添加住户
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总房间数</p>
              <p className="mt-1">{rooms.length} 间</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总住户数</p>
              <p className="mt-1">{rooms.reduce((sum, r) => sum + r.occupied, 0)} 人</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">入住率</p>
              <p className="mt-1">
                {((rooms.reduce((sum, r) => sum + r.occupied, 0) / rooms.reduce((sum, r) => sum + r.capacity, 0)) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">空余床位</p>
              <p className="mt-1">
                {rooms.reduce((sum, r) => sum + (r.capacity - r.occupied), 0)} 个
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索房间号或住户姓名..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedBuilding}
          onChange={(e) => setSelectedBuilding(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
        >
          <option value="all">全部楼栋</option>
          {buildings.map(building => (
            <option key={building} value={building}>{building}</option>
          ))}
        </select>
      </div>

      {/* Rooms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRooms.map((room) => (
          <Card key={room.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3>{room.building} - {room.roomNumber}</h3>
                  <p className="text-gray-500 text-sm">{room.floor} 层</p>
                </div>
              </div>
              <Badge className={getStatusColor(room.status)}>
                {getStatusText(room.status)}
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">入住情况</span>
                <span className="text-gray-900">{room.occupied}/{room.capacity} 人</span>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-2">住户：</p>
                <div className="flex flex-wrap gap-1">
                  {room.residents.map((resident, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {resident}
                    </Badge>
                  ))}
                  {room.occupied < room.capacity && (
                    <Badge variant="outline" className="text-xs text-gray-400">
                      空位 {room.capacity - room.occupied}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                查看详情
              </button>
              <button className="flex-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                编辑
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
