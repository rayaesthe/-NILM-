import { GitBranch, ChevronRight } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function GrayRelease() {
  const releases = [
    { id: '1', name: '新告警策略v2.1', version: 'v2.1.0', status: 'active', coverage: 30, buildings: ['1号楼', '2号楼'] },
    { id: '2', name: '设备监控优化v1.5', version: 'v1.5.2', status: 'completed', coverage: 100, buildings: ['全部'] },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>灰度发布与回滚</h1>
          <p className="text-gray-500 mt-1">管理策略的灰度发布和版本回滚</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + 创建发布
        </button>
      </div>

      <div className="space-y-3">
        {releases.map(release => (
          <Card key={release.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{release.name}</h3>
                    <Badge variant={release.status === 'active' ? 'default' : 'outline'}>
                      {release.status === 'active' ? '进行中' : '已完成'}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm">版本：{release.version} · 覆盖率：{release.coverage}%</p>
                  <p className="text-gray-500 text-sm">覆盖楼栋：{release.buildings.join('、')}</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
