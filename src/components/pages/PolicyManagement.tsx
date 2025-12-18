import { FileText, Zap, Thermometer, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';

export function PolicyManagement() {
  const policies = [
    { id: '1', name: '电流告警阈值', category: 'energy', value: '20A', icon: Zap, active: true },
    { id: '2', name: '功率限制', category: 'energy', value: '2.5kW', icon: Zap, active: true },
    { id: '3', name: '温度告警上限', category: 'temperature', value: '32°C', icon: Thermometer, active: true },
    { id: '4', name: '温度告警下限', category: 'temperature', value: '15°C', icon: Thermometer, active: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>策略与阈值配置</h1>
          <p className="text-gray-500 mt-1">配置系统告警策略和阈值参数</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + 新增策略
        </button>
      </div>

      <div className="space-y-4">
        {policies.map(policy => {
          const Icon = policy.icon;
          return (
            <Card key={policy.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3>{policy.name}</h3>
                    <p className="text-gray-500 text-sm">当前值：{policy.value}</p>
                  </div>
                </div>
                <Badge variant={policy.active ? 'default' : 'outline'}>
                  {policy.active ? '启用' : '停用'}
                </Badge>
              </div>
              <div className="space-y-2">
                <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>最小值</span>
                  <span>最大值</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
