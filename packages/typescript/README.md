# quanttide-learn

量潮学习管理 TypeScript SDK。

领域模型（Learner × Completion + Schedule + Task）实现自 [docs/specification](https://github.com/quanttide/quanttide-specification-of-learning-management)，字段与 JSON 契约一一对应（snake_case，无 case 转换层）。

## 安装

```bash
npm install quanttide-learn
```

## 使用

```ts
import type { Learner, Completion, Schedule, Task } from "quanttide-learn";

const schedule: Schedule = {
  id: "schedule-agent-engineer",
  title: "智能体工程师训练营",
  tasks: [
    {
      id: "task-data-second-brain",
      title: "熟悉数据工程第二大脑",
      description: "达成：至少一条建议经 Issue 讨论达成共识后进入 PR。",
    },
  ],
};
```

## 开发

```bash
npm install
npm test        # 契约测试（引用根 tests/ 的 Schema + Fixture）
npm run build   # 构建 dist/（tsc）
npm run typecheck
```
