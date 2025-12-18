import { Cpu, WifiOff, Zap, Thermometer } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function DeviceManagement() {
  const devices = [
    { id: '1', name: '1号楼主网关', type: 'gateway', building: '1号楼', status: 'online', devices: 60 },
    { id: '2', name: '2号楼主网关', type: 'gateway', building: '2号楼', status: 'online', devices: 60 },
    { id: '3', name: '3号楼主网关', type: 'gateway', building: '3号楼', status: 'warning', devices: 80 },
    { id: '4', name: '4号楼主网关', type: 'gateway', building: '4号楼', status: 'online', devices: 80 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>设备与网关管理</h1>
        <p className="text-gray-500 mt-1">管理楼栋网关和智能设备</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总网关数</p>
              <p className="mt-1">{devices.length} 个</p>
            </div>
            <Cpu className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">在线设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'online').length} 个</p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">预警设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'warning').length} 个</p>
            </div>
            <Thermometer className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">离线设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'offline').length} 个</p>
            </div>
            <WifiOff className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {devices.map(device => (
          <Card key={device.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3>{device.name}</h3>
                  <p className="text-gray-500 text-sm">{device.building} · 连接设备 {device.devices} 个</p>
                </div>
              </div>
              <Badge variant={device.status === 'online' ? 'default' : 'warning'}>
                {device.status === 'online' ? '在线' : '预警'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
