
  # Smart Building Management App (Community)

  This is a code bundle for Smart Building Management App (Community). The original project is available at https://www.figma.com/design/2UI9pEt6S8aJbn4wcA3UvW/Smart-Building-Management-App--Community-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.


# 项目结构

## 1. 项目概述

这是一个基于React和TypeScript构建的**智能建筑管理应用（Smart Building Management App）**，主要用于实时监控和管理建筑的各种系统（能源、温度、设备、安全等）。

## 2. 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式系统**: Tailwind CSS v4.1.3
- **UI组件库**: Radix UI
- **图标库**: Lucide React
- **状态管理**: React Hooks (useState, useEffect等)
- **图表库**: Recharts

## 3. 目录结构

```
- .github/            # GitHub相关配置（CI/CD等）
  - workflows/
    - deploy.yml
- .vscode/            # VS Code配置
  - settings.json
- src/                # 主源代码目录
  - assets/           # 静态资源文件
  - components/       # 组件目录
    - figma/          # Figma相关组件
    - pages/          # 页面级组件
    - ui/             # 基础UI组件
  - guidelines/       # 设计指南文档
  - styles/           # 全局样式
  - App.tsx           # 应用主组件
  - Attributions.md   # 致谢文档
  - index.css         # 全局CSS
  - main.tsx          # 应用入口
- README.md           # 项目说明文档
- index.html          # HTML模板
- package.json        # 项目依赖配置
- vite.config.ts      # Vite配置文件
```

## 4. 核心组件结构

### 4.1 应用主架构

- **App.tsx**: 应用的主组件，包含路由逻辑和页面切换控制
- **Sidebar.tsx**: 侧边栏导航组件，提供主要功能模块的访问入口
- **TopBar.tsx**: 顶部导航栏，显示面包屑导航和用户信息

### 4.2 页面组件

位于 `src/components/pages/` 目录下，包含17个主要功能页面：

- **DashboardOverview**: 仪表盘总览
- **SpaceOverview**: 宿舍空间总览
- **AlertCenter**: 告警中心
- **ViolationMonitoring**: 违规设备监测
- **RoomManagement**: 住户与房间管理
- **DeviceManagement**: 设备与网关管理
- **WorkOrders**: 工单与巡检
- **Announcements**: 公告与消息
- **PolicyManagement**: 策略与阈值管理
- **GrayRelease**: 灰度发布与回滚
- **EnergyReports**: 能耗分析与报表
- **LoadAnalytics**: 负荷分析
- **ClassificationTuning**: 设备识别校正台
- **UserPermissions**: 用户与权限管理
- **Finance**: 财务与结算
- **AuditLogs**: 审计与日志
- **SystemSettings**: 系统设置
- **SelfCheck**: 问题自查

### 4.3 UI组件

位于 `src/components/ui/` 目录下，基于Radix UI实现的基础组件库，包含40多个可复用组件：

- accordion, alert-dialog, alert
- aspect-ratio, avatar, badge
- breadcrumb, button, calendar
- card, carousel, chart
- checkbox, collapsible, command
- context-menu, dialog, drawer
- dropdown-menu, form, hover-card
- input-otp, input, label
- menubar, navigation-menu, pagination
- popover, progress, radio-group
- resizable, scroll-area, select
- separator, sheet, sidebar
- skeleton, slider, sonner
- switch, table, tabs
- textarea, toggle-group, toggle
- tooltip

## 5. 关键功能模块

### 5.1 侧边栏导航

侧边栏组织了应用的主要功能模块，分为7个类别：
- 仪表盘
- 监控
- 运维
- 策略
- 分析
- 系统管理
- 帮助

每个菜单项都有对应的图标和状态指示，部分项目还包含通知徽章。

### 5.2 仪表盘功能

仪表盘页面 (`Dashboard.tsx`) 包含：
- 关键指标卡片（能耗、温度、占用率、系统状态）
- 能耗趋势图表
- 告警列表
- 楼层占用情况

### 5.3 路由系统

应用使用简单的客户端路由实现，通过 `useState` 和 `useEffect` 管理当前路径和浏览器历史记录。

## 6. 样式系统

项目使用Tailwind CSS v4.1.3作为主要样式系统，具有以下特点：

- 完整的颜色系统（红色、橙色、黄色、绿色、蓝色等）
- 响应式设计支持
- 自定义工具类
- 主题变量支持

## 7. 构建与开发

- **安装依赖**: `npm i`
- **开发模式**: `npm run dev`
- **构建生产版本**: `npm run build`

## 8. 项目特点

1. **组件化设计**: 高度模块化的组件结构，便于维护和扩展
2. **响应式布局**: 支持不同屏幕尺寸的显示
3. **实时数据展示**: 模拟实时数据更新，适合监控类应用
4. **完整的UI组件库**: 基于Radix UI构建的丰富组件集
5. **现代化技术栈**: 使用最新的React和TypeScript特性

## 9. 总结

这是一个结构清晰、功能完善的智能建筑管理应用前端项目，采用了现代化的技术栈和组件化设计理念。项目具有良好的可维护性和扩展性，适合作为建筑管理系统的前端界面使用。