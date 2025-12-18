import { Users, Shield, UserCog } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function UserPermissions() {
  const users = [
    { id: '1', name: '张管理员', role: 'admin', email: 'zhang@building.com', status: 'active', permissions: ['全部权限'] },
    { id: '2', name: '李运维', role: 'operator', email: 'li@building.com', status: 'active', permissions: ['查看', '工单管理'] },
    { id: '3', name: '王维修', role: 'technician', email: 'wang@building.com', status: 'active', permissions: ['查看', '设备管理'] },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>用户与权限管理</h1>
          <p className="text-gray-500 mt-1">管理系统用户和角色权限</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + 添加用户
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总用户数</p>
              <p className="mt-1">{users.length} 人</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">在线用户</p>
              <p className="mt-1">{users.filter(u => u.status === 'active').length} 人</p>
            </div>
            <Shield className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">角色类型</p>
              <p className="mt-1">3 种</p>
            </div>
            <UserCog className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {users.map(user => (
          <Card key={user.id} className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3>{user.name}</h3>
                    <Badge>{user.role === 'admin' ? '管理员' : user.role === 'operator' ? '运维' : '维修'}</Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{user.email}</p>
                  <p className="text-gray-500 text-xs">权限：{user.permissions.join('、')}</p>
                </div>
              </div>
              <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                编辑
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
