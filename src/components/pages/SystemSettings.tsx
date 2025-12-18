import { Settings, Database, Bell, Mail, Lock } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';

export function SystemSettings() {
  const settings = [
    { id: '1', name: '邮件通知', description: '重要告警时发送邮件通知', icon: Mail, enabled: true },
    { id: '2', name: '短信通知', description: '严重告警时发送短信通知', icon: Bell, enabled: false },
    { id: '3', name: '自动备份', description: '每日自动备份系统数据', icon: Database, enabled: true },
    { id: '4', name: '双因素认证', description: '登录时需要双因素认证', icon: Lock, enabled: false },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>系统设置</h1>
        <p className="text-gray-500 mt-1">配置系统参数和功能选项</p>
      </div>

      <Card className="divide-y divide-gray-100">
        {settings.map(setting => {
          const Icon = setting.icon;
          return (
            <div key={setting.id} className="p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3>{setting.name}</h3>
                  <p className="text-gray-500 text-sm">{setting.description}</p>
                </div>
              </div>
              <Switch checked={setting.enabled} />
            </div>
          );
        })}
      </Card>

      <Card className="p-5">
        <h3 className="mb-4">数据库配置</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">数据库大小</span>
            <span>2.3 GB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">最后备份</span>
            <span>2025-12-18 02:00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">数据保留期</span>
            <span>90 天</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
