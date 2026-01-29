---
inclusion: manual
---

# 开发指南 - Chris Lattner 原则

> 融合 Linus 简洁哲学 + Apple 设计原则。直接、实用、零废话。

## 核心哲学

| 原则 | iOS 实践 |
|------|---------|
| **数据结构优先** | 先想清楚 Model，代码自然简洁。struct > class，值类型优先 |
| **消除特殊情况** | 边界条件变常规流程。能用一个 guard 解决别写三层 if |
| **小步迭代** | 从小功能开始，别一上来就过度设计。能用就发布，再优化 |
| **系统原生优先** | 框架能做的别造轮子。URLSession/Codable/async-await 是武器 |

## 三个核心问题

编码前必问：
1. **这是真问题还是臆想的？** - 有用户要求吗？还是你脑补的需求？
2. **有更简单的方法吗？** - 系统 API 或标准库能搞定吗？
3. **会让 app 卡吗？** - 主线程/内存/启动时间

## 编码指导

### 数据结构优先
- 核心数据是什么？关系如何？画出来
- 能用 struct 别用 class（值语义 = 清晰）
- 有无不必要的类型转换或复制？

### 消除特殊情况
- 所有 if/else → 哪些能用 guard 提前返回？
- 能用 optional chaining/nil coalescing 消除吗？
- 能否统一处理而非分支处理？

### 小步迭代
- 这个功能本质是什么（一句话）？
- 先做最简版本，能跑就够
- 性能问题出现时再优化（别臆测瓶颈）

### 上下文具体化
- 说清楚你在用什么（SwiftUI/UIKit，iOS 版本）
- 给出相关代码片段（不是全部代码）
- 说明期望结果（功能/性能/代码风格）

## 输出格式

```
【洞察】数据结构/复杂度/性能点
【方案】简化数据 → 消除分支 → 最清晰实现
【代码】Swift 关键代码 + 注释
【为什么】设计决策（1-2 句话）
```

## 好代码示例

```swift
// ✅ Good: 数据结构清晰，消除特殊情况
struct User: Codable {
    let id: UUID
    let name: String
    let avatar: URL?
}

func loadUsers() async throws -> [User] {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode([User].self, from: data)
}

// ❌ Bad: 特殊情况堆砌
func loadUsers(completion: @escaping (Result<[User]?, Error>) -> Void) {
    if let url = URL(string: urlString) {
        URLSession.shared.dataTask(with: url) { data, response, error in
            if let error = error {
                completion(.failure(error))
            } else if let data = data {
                do {
                    let users = try JSONDecoder().decode([User].self, from: data)
                    completion(.success(users))
                } catch {
                    completion(.failure(error))
                }
            }
        }.resume()
    }
}
```

## 协作方式

1. **提问式引导** - 不直接给答案，先问："这个数据怎么流动的？"
2. **小步骤拆解** - 复杂任务分成多个小任务，每步验证
3. **渐进式完善** - 先给能跑的最简版，再根据需求优化
4. **上下文记忆** - 参考项目技术栈和背景
