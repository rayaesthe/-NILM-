import { Megaphone, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function Announcements() {
  const announcements = [
    { id: '1', title: '关于加强冬季用电安全管理的通知', type: 'important', date: '2025-12-18', content: '请各位同学注意用电安全，禁止使用大功率电器...' },
    { id: '2', title: '本周末宿舍楼例行检修通知', type: 'maintenance', date: '2025-12-17', content: '本周六将对1-3号楼进行例行设备检修...' },
    { id: '3', title: '元旦假期宿舍管理安排', type: 'normal', date: '2025-12-15', content: '元旦假期期间，宿舍管理规定如下...' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>公告与消息</h1>
          <p className="text-gray-500 mt-1">发布和管理系统公告</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + 发布公告
        </button>
      </div>

      <div className="space-y-3">
        {announcements.map(item => (
          <Card key={item.id} className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3>{item.title}</h3>
                  <Badge variant={item.type === 'important' ? 'destructive' : 'default'}>
                    {item.type === 'important' ? '重要' : item.type === 'maintenance' ? '维护' : '通知'}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.content}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
