import { FileSearch, User, Settings } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function AuditLogs() {
  const logs = [
    { id: '1', user: '张管理员', action: '修改告警阈值', module: '策略配置', time: '2025-12-18 14:30', ip: '192.168.1.100' },
    { id: '2', user: '李运维', action: '创建工单', module: '工单管理', time: '2025-12-18 14:15', ip: '192.168.1.102' },
    { id: '3', user: '王维修', action: '查看设备详情', module: '设备管理', time: '2025-12-18 13:50', ip: '192.168.1.105' },
    { id: '4', user: '张管理员', action: '添加用户', module: '用户管理', time: '2025-12-18 11:20', ip: '192.168.1.100' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>审计与日志</h1>
        <p className="text-gray-500 mt-1">系统操作记录和审计追踪</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">今日操作</p>
              <p className="mt-1">{logs.length} 次</p>
            </div>
            <FileSearch className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">活跃用户</p>
              <p className="mt-1">3 人</p>
            </div>
            <User className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">配置变更</p>
              <p className="mt-1">2 次</p>
            </div>
            <Settings className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="mb-4">操作日志</h2>
        <div className="space-y-3">
          {logs.map(log => (
            <div key={log.id} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-sm">{log.user}</p>
                  <Badge variant="outline" className="text-xs">{log.module}</Badge>
                </div>
                <p className="text-gray-600 text-sm">{log.action}</p>
                <p className="text-gray-500 text-xs mt-1">IP: {log.ip}</p>
              </div>
              <span className="text-gray-500 text-xs">{log.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
