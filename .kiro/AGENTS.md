# AGENTS.md - Moments iOS App

## 项目概览

SwiftUI iOS 照片/记忆管理应用，Swift 6.0 + SwiftData + PhotoKit。核心功能：智能时空聚类、自适应地图可视化、记忆笔记。目标：iOS 18.0+（基础功能），iOS 26.0+（Liquid Glass 最佳体验）。

# 构建命令

**快速构建（推荐）**
```bash
xcodebuild -project Moments.xcodeproj -scheme Moments -sdk iphonesimulator build
```

**设备列表**

| 类型 | 设备 | iOS | Device ID |
|------|------|-----|-----------|
| 模拟器 ✅ | iPhone 17 Pro | 26.0 | `1C9070F7-AFB7-4CA2-B9E3-F9B31F773CF5` |
| 模拟器 | iPhone 13 Pro | 18.6 | `69281978-E713-4FED-9118-2ED63831F46F` |
| 物理 | Rn's iPhone 14 Pro | 26.1 | `00008120-001E5C811E84201E` |
| 物理 | Fangfang's iPhone | 18.6.2 | `00008101-000C2C4C3A46001E` |


## 代码规范

### 语言与本地化
- **代码**：英文（变量、函数、类型名）
- **注释**：中文（复杂逻辑说明）
- **用户可见文字**：英文（UI 标签、按钮、提示、错误信息、Alert）— 支持国际化：简体中文
- **日志**：服务层用 os Logger，View 中可用 print

### 格式化 (swift-format)
- 行长度：120 字符
- 缩进：4 空格
- 最多 1 空行
- else/catch 与右括号同列
- 泛型约束每行一个
- 配置文件：`.swift-format`

### 命名规范
- **变量/函数**：英文，camelCase
- **类型/类**：英文，PascalCase
- **SwiftUI View**：以 `View` 结尾
- **服务/管理器**：以 `Service` 或 `Manager` 结尾
- **Async 方法**：若存在同步版本需加 `Async` 后缀
- **常量**：`kCamelCase` 或 `PascalCase`

### SwiftUI Views
- `@State`：内部状态
- `@Binding`：双向绑定
- `@Environment`：环境值
- **配置参数**：用 `var` + 默认值，避免 `init()`
- 返回类型用 `some View`
- 使用 `@Observable` 宏（Swift 6）

### 并发 (Swift 6)
- Views 默认 `@MainActor`，服务显式标注
- `@Sendable` 标记并发函数
- 使用 `async/await`

### 错误处理
- 可恢复错误：`throw`/`try`
- 定义 `enum SomeError: Error`
- 方法签名用 `throws`
- 错误日志：`logger.error("description: \(error)")`
- 可选恢复：`try?` + graceful fallback
- Fatal error：仅用于编程错误 (assertionFailure)

### 导入顺序
- 平台框架：`import SwiftUI`, `import SwiftData`, `import Photos`
- 第三方库：`import OSLog`, `import Inject`
- 组内按字母排序

### 代码组织
- MARK 注释：中文（如 `// MARK: - 私有方法`）
- 顺序：imports → MARK: types → properties → init → public API → private helpers
- 单一职责，文件不超过 ~300 行

### 无障碍
- `.accessibilityLabel()`, `.accessibilityHint()`
- `@ScaledMetric` 支持 Dynamic Type

### 文件头
```swift
//
//  FileName.swift
//  Moments
//
//  Created by Author on YYYY/MM/DD.
//  Copyright © YYYY Author. All rights reserved.
//
```

### 调试代码
- `#if DEBUG` 包裹
- 启动参数：`-debugForceRunAnalysis`
- 日志前缀：`logger.info("🛠️ [DEBUG] message")`

## 架构模式

### 服务（Inject 依赖注入）
```swift
@MainActor
final class SomeService {
    static let shared = SomeService()
    private let logger = Logger(subsystem: "io.radon.Moments", category: "SomeService")
    private init() {}
}
```

### 状态管理
- `AppState`：应用级状态（单例）
- `UserDefaults`：持久设置
- `SwiftData`：数据持久化

### 异步操作
- `AsyncStream`：流式数据
- `Task`：fire-and-forget
- View 消失时取消

## 测试

- `@testable import Moments`
- `@Test` 属性（Swift Testing 框架）
- `#expect()` 断言
- Mock 依赖隔离（见 `Moments/Dev Assets/`）

## 项目结构

```
Moments/
├── App.swift                    # 应用入口，启动流程状态机
├── ContentView.swift            # 主视图容器
├── Models/                      # 数据模型层
│   ├── Entity/                  # SwiftData 实体（持久化）
│   ├── ValueType/               # 值类型（不持久化）
│   ├── Map/                     # 地图相关模型
│   ├── Routes/                  # 导航路由
│   └── MomentCluster.swift      # 时刻聚类
├── Services/                    # 业务逻辑层
│   ├── AppLifecycle/            # 应用生命周期
│   ├── Cluster/                 # 聚类服务
│   ├── Geo/                     # 地理编码服务
│   ├── Photos/                  # 照片服务
│   ├── Vision/                  # 视觉分析服务
│   ├── Map/                     # 地图服务
│   ├── Moments/                 # 时刻服务
│   ├── Note/                    # 笔记服务
│   ├── Orchestration/           # 编排服务（后台任务）
│   └── Utility/                 # 工具服务
├── Views/                       # 视图层
│   ├── Components/              # 通用组件
│   ├── Moments/                 # 时刻视图
│   ├── Map/                     # 地图视图
│   ├── Media/                   # 媒体视图
│   ├── Onboarding/              # 引导视图
│   └── Heros/                   # 英雄视图
├── Extensions/                  # Swift 扩展
├── Resources/                   # 资源文件
└── Dev Assets/                  # Mock 数据和预览容器
MomentsTests/                    # 单元测试
MomentsUITests/                  # UI 测试
Doc/                            # 设计文档（排除构建）
```

## 对话规则

- 思考用英文，回答用中文, 
- 简短回复，避免冗长代码块和解释
- 直击要点，不写大段落
- 使用全球知识，不局限于上下文
- 最少代码，只写绝对必要的
- spec 用中文, requirement用功能描述 不要user story, 说人话,不要机械的when, then
