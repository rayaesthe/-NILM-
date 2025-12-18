import { useState } from 'react';
import { Building2, Users, Zap, ThermometerSun, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

interface SpaceOverviewProps {
  onNavigate: (path: string) => void;
  onBreadcrumbChange: (path: string[]) => void;
}

interface Building {
  id: string;
  name: string;
  floors: number;
  rooms: number;
  occupancy: number;
  totalCapacity: number;
  energyUsage: number;
  avgTemp: number;
  alerts: number;
}

export function SpaceOverview({ onNavigate, onBreadcrumbChange }: SpaceOverviewProps) {
  const [selectedCampus] = useState('北区');
  
  const buildings: Building[] = [
    { id: '1', name: '1号楼', floors: 6, rooms: 180, occupancy: 165, totalCapacity: 180, energyUsage: 2340, avgTemp: 22.5, alerts: 2 },
    { id: '2', name: '2号楼', floors: 6, rooms: 180, occupancy: 178, totalCapacity: 180, energyUsage: 2450, avgTemp: 23.1, alerts: 0 },
    { id: '3', name: '3号楼', floors: 8, rooms: 240, occupancy: 232, totalCapacity: 240, energyUsage: 3120, avgTemp: 22.8, alerts: 5 },
    { id: '4', name: '4号楼', floors: 8, rooms: 240, occupancy: 240, totalCapacity: 240, energyUsage: 3280, avgTemp: 23.5, alerts: 1 },
    { id: '5', name: '5号楼', floors: 10, rooms: 300, occupancy: 285, totalCapacity: 300, energyUsage: 3850, avgTemp: 22.3, alerts: 3 },
    { id: '6', name: '6号楼', floors: 10, rooms: 300, occupancy: 298, totalCapacity: 300, energyUsage: 4020, avgTemp: 23.2, alerts: 0 },
  ];

  const handleBuildingClick = (building: Building) => {
    onBreadcrumbChange([selectedCampus, building.name]);
    // In a real app, navigate to building detail page
  };

  const totalStats = {
    buildings: buildings.length,
    rooms: buildings.reduce((sum, b) => sum + b.rooms, 0),
    occupancy: buildings.reduce((sum, b) => sum + b.occupancy, 0),
    capacity: buildings.reduce((sum, b) => sum + b.totalCapacity, 0),
    energy: buildings.reduce((sum, b) => sum + b.energyUsage, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Campus Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>宿舍空间总览</h1>
          <p className="text-gray-500 mt-1">当前校区：{selectedCampus}</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="px-4 py-2">
            <Building2 className="w-4 h-4 mr-2" />
            {totalStats.buildings} 栋楼
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Users className="w-4 h-4 mr-2" />
            {totalStats.occupancy}/{totalStats.capacity} 人
          </Badge>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总楼栋数</p>
              <p className="mt-1">{totalStats.buildings} 栋</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总房间数</p>
              <p className="mt-1">{totalStats.rooms} 间</p>
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
              <p className="mt-1">{((totalStats.occupancy / totalStats.capacity) * 100).toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总能耗 (今日)</p>
              <p className="mt-1">{totalStats.energy} kWh</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Buildings Grid */}
      <div>
        <h2 className="mb-4">楼栋列表</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {buildings.map((building) => (
            <Card 
              key={building.id} 
              className="p-5 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleBuildingClick(building)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3>{building.name}</h3>
                    <p className="text-gray-500 text-sm">{building.floors} 层 · {building.rooms} 间</p>
                  </div>
                </div>
                {building.alerts > 0 && (
                  <Badge variant="destructive">{building.alerts}</Badge>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>入住率</span>
                  </div>
                  <span className="text-gray-900">
                    {building.occupancy}/{building.totalCapacity} ({((building.occupancy / building.totalCapacity) * 100).toFixed(0)}%)
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Zap className="w-4 h-4" />
                    <span>能耗 (今日)</span>
                  </div>
                  <span className="text-gray-900">{building.energyUsage} kWh</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ThermometerSun className="w-4 h-4" />
                    <span>平均温度</span>
                  </div>
                  <span className="text-gray-900">{building.avgTemp}°C</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full flex items-center justify-between text-sm text-blue-600 hover:text-blue-700">
                  <span>查看详情</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
