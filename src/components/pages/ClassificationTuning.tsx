import { Settings, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function ClassificationTuning() {
  const devices = [
    { id: '1', name: '电吹风', power: '1.8kW', confidence: 95, pattern: '间歇性高功率' },
    { id: '2', name: '电热水器', power: '2.5kW', confidence: 92, pattern: '持续高功率' },
    { id: '3', name: '台式电脑', power: '0.3kW', confidence: 88, pattern: '稳定中功率' },
    { id: '4', name: '手机充电器', power: '0.01kW', confidence: 98, pattern: '低功率充电' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>设备识别校正台</h1>
        <p className="text-gray-500 mt-1">优化和调整设备识别算法</p>
      </div>

      <div className="space-y-3">
        {devices.map(device => (
          <Card key={device.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{device.name}</h3>
                    <Badge variant={device.confidence > 90 ? 'default' : 'warning'}>
                      置信度 {device.confidence}%
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">功率：{device.power} · 特征：{device.pattern}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                校正
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
