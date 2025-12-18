import { useState } from 'react';
import { AlertTriangle, Zap, Thermometer, WifiOff, X, Search, Filter } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface AlertCenterProps {
  detailId?: string;
  onNavigate?: (path: string) => void;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  category: 'energy' | 'temperature' | 'device' | 'security';
  title: string;
  location: string;
  timestamp: string;
  description: string;
  resolved: boolean;
}

export function AlertCenter({ detailId, onNavigate }: AlertCenterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  const alerts: Alert[] = [
    {
      id: '1',
      type: 'critical',
      category: 'energy',
      title: '3号楼 401 室电流异常',
      location: '北区 > 3号楼 > 4层 > 401',
      timestamp: '2025-12-18 14:23',
      description: '检测到电流超过安全阈值 20A，当前读数 25.3A',
      resolved: false,
    },
    {
      id: '2',
      type: 'critical',
      category: 'device',
      title: '5号楼网关离线',
      location: '北区 > 5号楼',
      timestamp: '2025-12-18 14:15',
      description: '5号楼主网关失去连接，影响60个房间的数据采集',
      resolved: false,
    },
    {
      id: '3',
      type: 'warning',
      category: 'temperature',
      title: '2号楼 302 室温度过高',
      location: '北区 > 2号楼 > 3层 > 302',
      timestamp: '2025-12-18 14:05',
      description: '室内温度达到 32.5°C，超过舒适范围',
      resolved: false,
    },
    {
      id: '4',
      type: 'warning',
      category: 'energy',
      title: '1号楼总能耗异常',
      location: '北区 > 1号楼',
      timestamp: '2025-12-18 13:50',
      description: '今日能耗较昨日同期增加 35%',
      resolved: false,
    },
    {
      id: '5',
      type: 'critical',
      category: 'energy',
      title: '6号楼 205 室违规用电',
      location: '北区 > 6号楼 > 2层 > 205',
      timestamp: '2025-12-18 13:30',
      description: '检测到大功率电器使用，功率 2.8kW',
      resolved: false,
    },
    {
      id: '6',
      type: 'info',
      category: 'device',
      title: '4号楼智能锁电量不足',
      location: '北区 > 4号楼 > 5层 > 503',
      timestamp: '2025-12-18 13:15',
      description: '门锁电池电量低于 15%，建议更换',
      resolved: false,
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'energy':
        return <Zap className="w-4 h-4" />;
      case 'temperature':
        return <Thermometer className="w-4 h-4" />;
      case 'device':
        return <WifiOff className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy':
        return 'bg-orange-100 text-orange-700';
      case 'temperature':
        return 'bg-blue-100 text-blue-700';
      case 'device':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeVariant = (type: string): 'default' | 'destructive' | 'warning' => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const handleAlertClick = (alertId: string) => {
    if (onNavigate) {
      onNavigate(`/alerts/${alertId}`);
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || alert.type === filterType;
    return matchesSearch && matchesFilter;
  });

  // If viewing detail
  if (detailId) {
    const alert = alerts.find(a => a.id === detailId);
    if (!alert) return <div className="p-6">告警未找到</div>;

    return (
      <div className="p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => onNavigate && onNavigate('/alerts')}
          >
            ← 返回告警列表
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(alert.category)}`}>
                {getCategoryIcon(alert.category)}
              </div>
              <div>
                <h1 className="mb-2">{alert.title}</h1>
                <p className="text-gray-500">{alert.location}</p>
              </div>
            </div>
            <Badge variant={getTypeVariant(alert.type)}>
              {alert.type === 'critical' ? '严重' : alert.type === 'warning' ? '警告' : '信息'}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-500">发生时间</label>
              <p className="mt-1">{alert.timestamp}</p>
            </div>

            <div>
              <label className="text-sm text-gray-500">详细描述</label>
              <p className="mt-1">{alert.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex gap-3">
                <Button className="flex-1">标记为已解决</Button>
                <Button variant="outline" className="flex-1">分配工单</Button>
                <Button variant="outline">忽略</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // List view
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>告警中心</h1>
          <p className="text-gray-500 mt-1">实时监控系统告警信息</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="px-3 py-1">
            严重 {alerts.filter(a => a.type === 'critical').length}
          </Badge>
          <Badge variant="warning" className="px-3 py-1">
            警告 {alerts.filter(a => a.type === 'warning').length}
          </Badge>
          <Badge variant="default" className="px-3 py-1">
            信息 {alerts.filter(a => a.type === 'info').length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="搜索告警..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg bg-white"
        >
          <option value="all">全部类型</option>
          <option value="critical">严重</option>
          <option value="warning">警告</option>
          <option value="info">信息</option>
        </select>
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map((alert) => (
          <Card
            key={alert.id}
            className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleAlertClick(alert.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getCategoryColor(alert.category)}`}>
                {getCategoryIcon(alert.category)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="truncate">{alert.title}</h3>
                  <Badge variant={getTypeVariant(alert.type)} className="flex-shrink-0">
                    {alert.type === 'critical' ? '严重' : alert.type === 'warning' ? '警告' : '信息'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{alert.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{alert.location}</span>
                  <span>•</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <Card className="p-12 text-center">
          <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">没有找到符合条件的告警</p>
        </Card>
      )}
    </div>
  );
}
