import { HelpCircle, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function SelfCheck() {
  const checks = [
    { id: '1', item: '网关连接状态', status: 'ok', description: '所有网关运行正常' },
    { id: '2', item: '数据采集服务', status: 'ok', description: '数据采集正常，无延迟' },
    { id: '3', item: '告警服务', status: 'warning', description: '告警队列有2条待处理消息' },
    { id: '4', item: '数据库性能', status: 'ok', description: '查询响应时间正常' },
  ];

  const faq = [
    { q: '如何处理设备离线告警？', a: '首先检查设备电源和网络连接，然后重启设备' },
    { q: '为什么能耗数据异常？', a: '可能是传感器故障或数据采集异常，请联系技术支持' },
    { q: '如何创建工单？', a: '进入工单与巡检页面，点击"创建工单"按钮' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>问题自查</h1>
        <p className="text-gray-500 mt-1">系统健康检查和常见问题解答</p>
      </div>

      <div>
        <h2 className="mb-4">系统健康检查</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {checks.map(check => (
            <Card key={check.id} className="p-4">
              <div className="flex items-start gap-3">
                {getStatusIcon(check.status)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm">{check.item}</h3>
                    <Badge variant={check.status === 'ok' ? 'default' : 'warning'} className="text-xs">
                      {check.status === 'ok' ? '正常' : '注意'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-xs">{check.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4">常见问题</h2>
        <div className="space-y-3">
          {faq.map((item, i) => (
            <Card key={i} className="p-5">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="mb-2">{item.q}</h3>
                  <p className="text-gray-600 text-sm">{item.a}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
