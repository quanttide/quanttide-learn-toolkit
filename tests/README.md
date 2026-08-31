# 契约测试

跨语言数据模型一致性验证。**单一事实源是根 `tests/` 下的 Schema 与 Fixture**，由 [docs/specification](https://github.com/quanttide/quanttide-specification-of-learning-management) 推导；各语言包在自身目录内编写契约测试并引用本目录。

## 实体范围

学习管理领域模型分两层：

- **标准实体**（JSON 契约，已由学习云 provider 实现）：Learner × Completion
- **核心领域模型**（设计完成未落码）：Schedule + Task

| 实体 | Schema | Fixture |
|------|--------|---------|
| Learner | [schemas/learner.json](schemas/learner.json) | [fixtures/learner.json](fixtures/learner.json) |
| Completion | [schemas/completion.json](schemas/completion.json) | [fixtures/completion.json](fixtures/completion.json) |
| Schedule | [schemas/schedule.json](schemas/schedule.json) | [fixtures/schedule.json](fixtures/schedule.json) |
| Task | [schemas/task.json](schemas/task.json) | [fixtures/task.json](fixtures/task.json) |

## 设计

- **字段命名：snake_case**——与 docs/specification 的 JSON 契约示例一一对应，各语言包不做 case 转换层（Dart / JS 直接可用）。
- **实体关系**：`Learner ──1:N──▶ Completion ◀──N:1── Task（Task 属于 Schedule）`。

```
tests/
  README.md
  schemas/    # JSON Schema（draft-07）：learner / completion / schedule / task
  fixtures/   # 同源标本：learner / completion / schedule / task
packages/
  typescript/tests/contract.test.ts    # 当前唯一已落地的契约验证
```

## 测试内容

1. **必填字段存在性** — fixture 覆盖 Schema 的 `required`；
2. **Fixture 反序列化** — 共享标本能被正确解析且关键字段值符合预期（编译期类型校验）；
3. **Round-trip** — 反序列化→再序列化→反序列化，值不变。

## 运行

```bash
cd packages/typescript && npm install && npm test
```

## 工作流

1. **新增/变更字段**：先改 docs/specification 的实体定义，再同步对应 Schema + fixture，最后对齐各语言模型；
2. **新增语言包**：在 `packages/{lang}/` 编写契约测试并接入本目录。
