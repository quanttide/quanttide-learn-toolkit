# quanttide-learn-toolkit

量潮学习管理工具箱——语言无关的 toolkit 包集合（`packages/`），各语言包独立演进。

## 结构

- `packages/`：语言实现包
  - [`packages/typescript/`](packages/typescript/)：TypeScript SDK（Learner × Completion + Schedule + Task 领域模型）
- `tests/`：契约测试——跨语言单一事实源（JSON Schema + Fixture），由 [docs/specification](https://github.com/quanttide/quanttide-specification-of-learning-management) 推导

## 领域模型

分两层：

- **标准实体**（JSON 契约，已由学习云 provider 实现）：Learner × Completion
- **核心领域模型**（设计完成未落码）：Schedule + Task

```
Learner ──1:N──▶ Completion ◀──N:1── Task（Task 属于 Schedule）
```

## 开发

```bash
cd packages/typescript
npm install
npm test
```
