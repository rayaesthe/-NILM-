import { ClipboardList, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function WorkOrders() {
  const orders = [
    { id: '1', title: '3号楼401室电流异常处理', location: '3号楼 401', status: 'pending', priority: 'high', created: '2025-12-18 14:23', sla: 'overdue' },
    { id: '2', title: '5号楼网关维修', location: '5号楼', status: 'in-progress', priority: 'critical', created: '2025-12-18 14:15', sla: 'critical' },
    { id: '3', title: '2号楼302室空调检修', location: '2号楼 302', status: 'pending', priority: 'medium', created: '2025-12-18 13:50', sla: 'warning' },
    { id: '4', title: '1号楼总配电箱巡检', location: '1号楼', status: 'completed', priority: 'low', created: '2025-12-18 10:00', sla: 'normal' },
    { id: '5', title: '6号楼205室断电排查', location: '6号楼 205', status: 'in-progress', priority: 'high', created: '2025-12-18 12:30', sla: 'normal' },
  ];

  const getSLABadge = (sla: string) => {
    switch (sla) {
      case 'overdue':
        return <Badge variant="destructive">超时</Badge>;
      case 'critical':
        return <Badge variant="destructive">紧急</Badge>;
      case 'warning':
        return <Badge variant="warning">即将超时</Badge>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <ClipboardList className="w-5 h-5 text-orange-600" />;
      default:
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'in-progress':
        return '进行中';
      case 'pending':
        return '待处理';
      default:
        return '已取消';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>工单与巡检</h1>
          <p className="text-gray-500 mt-1">管理维护工单和巡检任务</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="destructive" className="px-3 py-1">
            SLA超时 {orders.filter(o => o.sla === 'overdue' || o.sla === 'critical').length}
          </Badge>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + 创建工单
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">待处理</p>
              <p className="mt-1">{orders.filter(o => o.status === 'pending').length} 个</p>
            </div>
            <ClipboardList className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">进行中</p>
              <p className="mt-1">{orders.filter(o => o.status === 'in-progress').length} 个</p>
            </div>
            <Clock className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">已完成</p>
              <p className="mt-1">{orders.filter(o => o.status === 'completed').length} 个</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">超时工单</p>
              <p className="mt-1">{orders.filter(o => o.sla === 'overdue' || o.sla === 'critical').length} 个</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {orders.map(order => (
          <Card key={order.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center">
                  {getStatusIcon(order.status)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{order.title}</h3>
                    {getSLABadge(order.sla)}
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>位置：{order.location}</p>
                    <p>创建时间：{order.created}</p>
                    <p>状态：{getStatusText(order.status)}</p>
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                查看详情
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
