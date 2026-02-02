# Moments+

**Your life, organized by place and time.**

## ⚠️ Private Project  
This code is **not open source** and is **not authorized for official or external use**.

---

## 【本质】

Moments 将照片库转化为时空记忆。不是相册，是生活轨迹。

## 【核心理念】

**Inevitable Grouping**  
系统自动识别你的生活模式：
- 本地生活 → 按地点（Home, Office, Park）
- 城市探索 → 按城市（Tokyo, Paris）
- 跨国旅行 → 按国家（Japan, France）

无需手动整理，算法理解你的移动半径。

**Material Honesty**  
- 照片是材料，时间和空间是结构
- 地图不是装饰，是导航工具
- 笔记不是附加功能，是情感载体

**Restraint**  
- 没有滤镜、贴纸、分享按钮
- 只有照片、地点、时间、笔记
- 每个元素都不可或缺

---

## 【技术】

| 技术 | 用途 |
|------|------|
| **SwiftUI** | 纯声明式 UI |
| **SwiftData** | 本地持久化 |
| **PhotoKit** | 照片库访问 |
| **MapKit** | 地图聚类 |
| **Vision** | 人脸识别（Phase 2）|
| **Liquid Glass** | iOS 26 渐进增强 |

**最低支持**: iOS 18.0  
**最佳体验**: iOS 26.0+

---

## 【架构】

```
Moments/
├── Models/          # 数据模型（Moment, Place, MediaAsset）
├── Services/        # 业务逻辑（聚类、地理编码、照片加载）
├── Views/           # SwiftUI 视图
│   ├── Moments/     # 时刻列表与详情
│   ├── Map/         # 自适应地图聚类
│   └── Note/        # 笔记编辑器
└── Extensions/      # Swift 扩展
```

**数据流**: 单向，值类型优先  
**异步**: async/await  
**性能**: LazyVStack + Task

---

## 【用户路径】

1. **授权照片库** → 系统自动聚类
2. **浏览时刻** → 按时间/地点/人物
3. **查看详情** → 照片 + 地图 + 笔记
4. **添加笔记** → 记录当时的感受

3 步内完成任何操作。

---

## 【情感】

- **平静**: 浏览时刻时的流畅感
- **惊喜**: 发现被遗忘的记忆
- **温暖**: 重温过往的情感
- **力量**: 用文字定格瞬间

---

## 【细节】

**自适应聚类**  
- 地图缩放时，聚类粒度自动调整
- 密集区域显示热力，稀疏区域显示单点
- 无需手动切换视图

**Liquid Glass**  
- 卡片、按钮、工具栏使用玻璃材质（iOS 26+）
- iOS 18 优雅降级为标准样式
- 零破坏性体验

**手势交互**  
- 下拉关闭详情页
- 双指缩放地图
- 长按预览照片

---

## 【开发规范】

**代码**  
- 注释：中文
- UI 文字：英文（后期国际化）
- 变量/函数：英文驼峰

**SwiftUI**  
- 配置参数用 `var` + 默认值
- 避免 `init`
- 小视图，单一职责

**性能**  
- 长列表必用 LazyVStack
- 异步加载图片
- 玻璃效果 < 10 个元素

---

## 【参考文档】

- `Doc/LIQUID_GLASS_GUIDE.md` - Liquid Glass 使用指南
- `.amazonq/rules/DesignContext.md` - Jony Ive 设计哲学
- `.kiro/steering/project-context.md` - 技术上下文

---

**Remember**: Great design is not seen, it's felt.
