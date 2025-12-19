import { FileText, Zap, Thermometer, AlertTriangle, Cpu, LineChart, Database, Settings2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Input } from '../ui/input';

export function PolicyManagement() {
  const thresholdPolicies = [
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
          <p className="text-gray-500 mt-1">配置系统算法、告警策略和物理量参数</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          + 新增策略
        </button>
      </div>

      <Tabs defaultValue="algorithms" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="algorithms">算法配置</TabsTrigger>
          <TabsTrigger value="physical">物理量配置</TabsTrigger>
          <TabsTrigger value="thresholds">阈值策略</TabsTrigger>
          <TabsTrigger value="data">数据策略</TabsTrigger>
        </TabsList>

        <TabsContent value="algorithms" className="space-y-4 mt-6">
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3>NILM负荷分解算法</h3>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">非接触式负荷监测与识别</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>算法类型</Label>
                    <Select defaultValue="hmm">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hmm">隐马尔可夫模型 (HMM)</SelectItem>
                        <SelectItem value="cnn">卷积神经网络 (CNN)</SelectItem>
                        <SelectItem value="lstm">长短期记忆网络 (LSTM)</SelectItem>
                        <SelectItem value="knn">K近邻算法 (KNN)</SelectItem>
                        <SelectItem value="svm">支持向量机 (SVM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>识别精度</Label>
                    <Select defaultValue="high">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">标准 (85-90%)</SelectItem>
                        <SelectItem value="high">高精度 (90-95%)</SelectItem>
                        <SelectItem value="ultra">超高精度 (95%+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>特征提取窗口</Label>
                    <Select defaultValue="5">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1秒</SelectItem>
                        <SelectItem value="5">5秒</SelectItem>
                        <SelectItem value="10">10秒</SelectItem>
                        <SelectItem value="30">30秒</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>更新频率</Label>
                    <Select defaultValue="realtime">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">实时更新</SelectItem>
                        <SelectItem value="1min">每分钟</SelectItem>
                        <SelectItem value="5min">每5分钟</SelectItem>
                        <SelectItem value="15min">每15分钟</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm">启用自适应学习</span>
                  </div>
                  <span className="text-xs text-gray-500">根据历史数据持续优化识别模型</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3>负荷预测算法</h3>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">基于历史数据的用电预测</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>预测模型</Label>
                    <Select defaultValue="arima">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="arima">ARIMA时间序列</SelectItem>
                        <SelectItem value="prophet">Prophet模型</SelectItem>
                        <SelectItem value="lstm">LSTM神经网络</SelectItem>
                        <SelectItem value="xgboost">XGBoost回归</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>预测周期</Label>
                    <Select defaultValue="24h">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">未来1小时</SelectItem>
                        <SelectItem value="6h">未来6小时</SelectItem>
                        <SelectItem value="24h">未来24小时</SelectItem>
                        <SelectItem value="7d">未来7天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>训练数据量</Label>
                    <Select defaultValue="30d">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">近7天</SelectItem>
                        <SelectItem value="30d">近30天</SelectItem>
                        <SelectItem value="90d">近90天</SelectItem>
                        <SelectItem value="1y">近1年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>置信区间</Label>
                    <Select defaultValue="95">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90">90%</SelectItem>
                        <SelectItem value="95">95%</SelectItem>
                        <SelectItem value="99">99%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3>异常检测算法</h3>
                    <Badge variant="default">已启用</Badge>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">实时检测用电异常行为</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>检测算法</Label>
                    <Select defaultValue="isolation">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isolation">孤立森林 (Isolation Forest)</SelectItem>
                        <SelectItem value="lof">局部异常因子 (LOF)</SelectItem>
                        <SelectItem value="autoencoder">自编码器 (Autoencoder)</SelectItem>
                        <SelectItem value="statistical">统计阈值法</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>灵敏度</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">低 (减少误报)</SelectItem>
                        <SelectItem value="medium">中等</SelectItem>
                        <SelectItem value="high">高 (更敏感)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="physical" className="space-y-4 mt-6">
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3>电气参数配置</h3>
                  <p className="text-gray-500 text-sm mt-1">配置电压、电流、功率等物理量采集参数</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { name: '电压 (V)', unit: 'V', min: '0', max: '250', precision: '0.1', enable: true },
                    { name: '电流 (A)', unit: 'A', min: '0', max: '30', precision: '0.01', enable: true },
                    { name: '有功功率 (W)', unit: 'W', min: '0', max: '6600', precision: '1', enable: true },
                    { name: '无功功率 (Var)', unit: 'Var', min: '-3000', max: '3000', precision: '1', enable: true },
                    { name: '视在功率 (VA)', unit: 'VA', min: '0', max: '6600', precision: '1', enable: false },
                    { name: '功率因数', unit: '', min: '-1', max: '1', precision: '0.001', enable: true },
                  ].map((param, idx) => (
                    <div key={idx} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm">{param.name}</h4>
                        <Switch defaultChecked={param.enable} />
                      </div>
                      <div className="grid grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">最小值</Label>
                          <Input defaultValue={param.min} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">最大值</Label>
                          <Input defaultValue={param.max} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">精度</Label>
                          <Input defaultValue={param.precision} className="h-8 text-sm" />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">单位</Label>
                          <Input defaultValue={param.unit} disabled className="h-8 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3>谐波分析配置</h3>
                  <p className="text-gray-500 text-sm mt-1">配置电压/电流谐波分析参数</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>最大谐波次数</Label>
                    <Select defaultValue="31">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15次</SelectItem>
                        <SelectItem value="31">31次</SelectItem>
                        <SelectItem value="63">63次</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>总谐波畸变率 (THD) 阈值</Label>
                    <Input defaultValue="5%" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded col-span-2">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">启用电压谐波分析</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">启用电流谐波分析</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3>环境参数配置</h3>
                  <p className="text-gray-500 text-sm mt-1">配置温度、湿度等环境物理量</p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">温度</Label>
                      <Switch defaultChecked />
                    </div>
                    <Input defaultValue="0.1 °C" className="h-8 text-sm" placeholder="精度" />
                  </div>
                  
                  <div className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">湿度</Label>
                      <Switch defaultChecked />
                    </div>
                    <Input defaultValue="1 %" className="h-8 text-sm" placeholder="精度" />
                  </div>
                  
                  <div className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">频率</Label>
                      <Switch defaultChecked />
                    </div>
                    <Input defaultValue="0.01 Hz" className="h-8 text-sm" placeholder="精度" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-4 mt-6">
          {thresholdPolicies.map(policy => {
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
                      <p className="text-gray-500 text-sm">当前值:{policy.value}</p>
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
        </TabsContent>

        <TabsContent value="data" className="space-y-4 mt-6">
          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3>数据存储策略</h3>
                  <p className="text-gray-500 text-sm mt-1">配置数据保留和清理策略</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>原始数据保留期</Label>
                    <Select defaultValue="30d">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7天</SelectItem>
                        <SelectItem value="30d">30天</SelectItem>
                        <SelectItem value="90d">90天</SelectItem>
                        <SelectItem value="180d">180天</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>聚合数据保留期</Label>
                    <Select defaultValue="1y">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6m">6个月</SelectItem>
                        <SelectItem value="1y">1年</SelectItem>
                        <SelectItem value="2y">2年</SelectItem>
                        <SelectItem value="5y">5年</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>数据压缩策略</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">不压缩</SelectItem>
                        <SelectItem value="low">低压缩率</SelectItem>
                        <SelectItem value="medium">中压缩率</SelectItem>
                        <SelectItem value="high">高压缩率</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>备份频率</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">每小时</SelectItem>
                        <SelectItem value="daily">每天</SelectItem>
                        <SelectItem value="weekly">每周</SelectItem>
                        <SelectItem value="monthly">每月</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-2">
                    <Switch defaultChecked />
                    <span className="text-sm">启用自动归档</span>
                  </div>
                  <span className="text-xs text-gray-500">将旧数据自动归档至冷存储</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center">
                <Settings2 className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3>数据质量策略</h3>
                  <p className="text-gray-500 text-sm mt-1">配置数据校验和清洗规则</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">异常值过滤</span>
                    </div>
                    <span className="text-xs text-gray-500">自动过滤超出正常范围的数据点</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">缺失值插值</span>
                    </div>
                    <span className="text-xs text-gray-500">使用线性插值填充缺失数据</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <Switch defaultChecked />
                      <span className="text-sm">重复值去除</span>
                    </div>
                    <span className="text-xs text-gray-500">自动识别并去除重复数据</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}