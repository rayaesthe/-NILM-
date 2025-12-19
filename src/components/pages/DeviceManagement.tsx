import { Cpu, WifiOff, Zap, Thermometer, Settings, Wifi, HardDrive, RefreshCw } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useState } from 'react';

export function DeviceManagement() {
  const [selectedGateway, setSelectedGateway] = useState<any>(null);
  
  const devices = [
    { id: '1', name: '1号楼-1F-网关A', type: 'gateway', building: '1号楼', floor: '1F', status: 'online', rooms: 12, ip: '192.168.1.101', firmware: 'v2.3.1', samplingRate: 1000 },
    { id: '2', name: '1号楼-1F-网关B', type: 'gateway', building: '1号楼', floor: '1F', status: 'online', rooms: 15, ip: '192.168.1.102', firmware: 'v2.3.1', samplingRate: 1000 },
    { id: '3', name: '1号楼-2F-网关A', type: 'gateway', building: '1号楼', floor: '2F', status: 'online', rooms: 14, ip: '192.168.1.201', firmware: 'v2.3.1', samplingRate: 1000 },
    { id: '4', name: '2号楼-1F-网关A', type: 'gateway', building: '2号楼', floor: '1F', status: 'warning', rooms: 18, ip: '192.168.2.101', firmware: 'v2.2.5', samplingRate: 1000 },
    { id: '5', name: '2号楼-2F-网关A', type: 'gateway', building: '2号楼', floor: '2F', status: 'online', rooms: 10, ip: '192.168.2.201', firmware: 'v2.3.1', samplingRate: 1000 },
    { id: '6', name: '2号楼-2F-网关B', type: 'gateway', building: '2号楼', floor: '2F', status: 'online', rooms: 16, ip: '192.168.2.202', firmware: 'v2.3.1', samplingRate: 1000 },
    { id: '7', name: '3号楼-1F-网关A', type: 'gateway', building: '3号楼', floor: '1F', status: 'online', rooms: 20, ip: '192.168.3.101', firmware: 'v2.3.1', samplingRate: 2000 },
    { id: '8', name: '3号楼-3F-网关A', type: 'gateway', building: '3号楼', floor: '3F', status: 'offline', rooms: 11, ip: '192.168.3.301', firmware: 'v2.1.8', samplingRate: 1000 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1>设备与网关管理</h1>
        <p className="text-gray-500 mt-1">管理楼层网关和智能设备配置</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">总网关数</p>
              <p className="mt-1">{devices.length} 个</p>
            </div>
            <Cpu className="w-8 h-8 text-blue-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">在线设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'online').length} 个</p>
            </div>
            <Zap className="w-8 h-8 text-green-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">预警设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'warning').length} 个</p>
            </div>
            <Thermometer className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">离线设备</p>
              <p className="mt-1">{devices.filter(d => d.status === 'offline').length} 个</p>
            </div>
            <WifiOff className="w-8 h-8 text-red-600" />
          </div>
        </Card>
      </div>

      <div className="space-y-3">
        {devices.map(device => (
          <Card key={device.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3>{device.name}</h3>
                  <div className="flex items-center gap-4 text-gray-500 text-sm mt-1">
                    <span>{device.building} · {device.floor}</span>
                    <span>连接房间 {device.rooms} 个</span>
                    <span>IP: {device.ip}</span>
                    <span>固件: {device.firmware}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={device.status === 'online' ? 'default' : device.status === 'warning' ? 'warning' : 'destructive'}>
                  {device.status === 'online' ? '在线' : device.status === 'warning' ? '预警' : '离线'}
                </Badge>
                <Dialog>
                  <DialogTrigger asChild>
                    <button 
                      onClick={() => setSelectedGateway(device)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>网关配置 - {device.name}</DialogTitle>
                    </DialogHeader>
                    
                    <Tabs defaultValue="basic" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="basic">基本信息</TabsTrigger>
                        <TabsTrigger value="rooms">房间绑定</TabsTrigger>
                        <TabsTrigger value="sampling">采样配置</TabsTrigger>
                        <TabsTrigger value="network">网络通信</TabsTrigger>
                        <TabsTrigger value="firmware">固件管理</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="basic" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>网关名称</Label>
                            <Input defaultValue={device.name} />
                          </div>
                          <div className="space-y-2">
                            <Label>网关编号</Label>
                            <Input defaultValue={device.id} disabled />
                          </div>
                          <div className="space-y-2">
                            <Label>所属楼栋</Label>
                            <Select defaultValue={device.building}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1号楼">1号楼</SelectItem>
                                <SelectItem value="2号楼">2号楼</SelectItem>
                                <SelectItem value="3号楼">3号楼</SelectItem>
                                <SelectItem value="4号楼">4号楼</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>所属楼层</Label>
                            <Select defaultValue={device.floor}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1F">1F</SelectItem>
                                <SelectItem value="2F">2F</SelectItem>
                                <SelectItem value="3F">3F</SelectItem>
                                <SelectItem value="4F">4F</SelectItem>
                                <SelectItem value="5F">5F</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>设备状态</Label>
                            <div className="flex items-center gap-2 pt-2">
                              <Badge variant={device.status === 'online' ? 'default' : 'destructive'}>
                                {device.status === 'online' ? '在线' : '离线'}
                              </Badge>
                              <span className="text-sm text-gray-500">上次在线: 2分钟前</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>连接房间数</Label>
                            <Input value={`${device.rooms} 个房间`} disabled />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Switch defaultChecked />
                            <Label>启用自动重启</Label>
                          </div>
                          <span className="text-sm text-gray-500">每日凌晨3点自动重启</span>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="rooms" className="space-y-4 mt-4">
                        <div className="grid grid-cols-4 gap-3">
                          {Array.from({ length: device.rooms }, (_, i) => (
                            <div key={i} className="p-3 border rounded-lg hover:border-blue-500 cursor-pointer transition-colors">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">{device.floor}-{String(i + 1).padStart(2, '0')}</span>
                                <Badge variant="outline" className="text-xs">已绑定</Badge>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">电表ID: {1000 + parseInt(device.id) * 100 + i}</p>
                            </div>
                          ))}
                          {device.rooms < 20 && (
                            <button className="p-3 border-2 border-dashed rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                              <p className="text-sm text-gray-500">+ 添加房间</p>
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">* 单个网关最多支持20个房间连接</p>
                      </TabsContent>
                      
                      <TabsContent value="sampling" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>采样频率</Label>
                            <Select defaultValue={device.samplingRate.toString()}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="500">500 Hz (低频)</SelectItem>
                                <SelectItem value="1000">1000 Hz (标准)</SelectItem>
                                <SelectItem value="2000">2000 Hz (高频)</SelectItem>
                                <SelectItem value="4000">4000 Hz (超高频)</SelectItem>
                              </SelectContent>
                            </Select>
                            <p className="text-xs text-gray-500">* 高采样频率可提高负荷识别精度，但会增加数据量</p>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>数据上传周期</Label>
                            <Select defaultValue="5">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">每1秒</SelectItem>
                                <SelectItem value="5">每5秒</SelectItem>
                                <SelectItem value="10">每10秒</SelectItem>
                                <SelectItem value="30">每30秒</SelectItem>
                                <SelectItem value="60">每1分钟</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-3">
                            <Label>采集物理量</Label>
                            <div className="grid grid-cols-2 gap-3">
                              {[
                                { label: '电压 (V)', checked: true },
                                { label: '电流 (A)', checked: true },
                                { label: '有功功率 (W)', checked: true },
                                { label: '无功功率 (Var)', checked: true },
                                { label: '谐波分析', checked: false },
                                { label: '功率因数', checked: true },
                                { label: '频率', checked: false },
                                { label: '温度', checked: true },
                              ].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 border rounded">
                                  <span className="text-sm">{item.label}</span>
                                  <Switch defaultChecked={item.checked} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="network" className="space-y-4 mt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>IP地址</Label>
                            <Input defaultValue={device.ip} />
                          </div>
                          <div className="space-y-2">
                            <Label>子网掩码</Label>
                            <Input defaultValue="255.255.255.0" />
                          </div>
                          <div className="space-y-2">
                            <Label>网关地址</Label>
                            <Input defaultValue="192.168.1.1" />
                          </div>
                          <div className="space-y-2">
                            <Label>DNS服务器</Label>
                            <Input defaultValue="8.8.8.8" />
                          </div>
                          <div className="space-y-2">
                            <Label>通信协议</Label>
                            <Select defaultValue="modbus">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="modbus">Modbus TCP</SelectItem>
                                <SelectItem value="mqtt">MQTT</SelectItem>
                                <SelectItem value="http">HTTP/REST</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>通信端口</Label>
                            <Input defaultValue="502" />
                          </div>
                        </div>
                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">网络连接状态</span>
                            <Badge variant="default">正常</Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">延迟</p>
                              <p className="mt-1">12 ms</p>
                            </div>
                            <div>
                              <p className="text-gray-500">丢包率</p>
                              <p className="mt-1">0.2%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">带宽占用</p>
                              <p className="mt-1">2.3 Mbps</p>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="firmware" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <div className="flex items-start gap-3">
                              <HardDrive className="w-5 h-5 text-blue-600 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm">当前版本</h4>
                                  <Badge>{device.firmware}</Badge>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">发布日期: 2024-11-15</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="p-4 border rounded-lg">
                            <div className="flex items-start gap-3">
                              <RefreshCw className="w-5 h-5 text-green-600 mt-0.5" />
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="text-sm">可用更新</h4>
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">v2.3.2</Badge>
                                </div>
                                <p className="text-xs text-gray-600 mt-1">发布日期: 2024-12-10</p>
                                <ul className="text-xs text-gray-600 mt-2 space-y-1 list-disc list-inside">
                                  <li>优化NILM算法精度</li>
                                  <li>修复网络断连重连问题</li>
                                  <li>增强数据压缩效率</li>
                                </ul>
                                <button className="mt-3 px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                  立即升级
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>自动更新策略</Label>
                            <Select defaultValue="manual">
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="auto">自动更新（推荐）</SelectItem>
                                <SelectItem value="notify">通知后手动更新</SelectItem>
                                <SelectItem value="manual">完全手动更新</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                    
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                        取消
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        保存配置
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}