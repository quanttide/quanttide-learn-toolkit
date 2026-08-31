# AGENTS.md

## 领域模型

- **单一事实源**：`docs/specification`（[quanttide-specification-of-learning-management](https://github.com/quanttide/quanttide-specification-of-learning-management)）；根 `tests/` 的 Schema + Fixture 由它推导，是跨语言契约的客观依据。
- 本包模型（`src/models.ts`）必须与 JSON 契约**一一对应**（snake_case），不做 case 转换层。
- **契约先行**：新增/变更字段时，先改 docs/specification → 再改根 `tests/`（Schema + Fixture）→ 最后对齐本包模型。

## 测试

- 契约测试在 `tests/contract.test.ts`，引用根 `tests/` 的共享标本；变更契约后 `npm test` 必须全绿。

## 发布（npm）

- **触发**：GitHub Release 发布时由 `.github/workflows/publish-typescript.yml` 自动发布到 npm（tag 前缀 `typescript/`）；tag 版本必须与 package.json 版本一致（workflow 会校验，不一致则失败）。
- **流程**：bump package.json 版本 + 本包 CHANGELOG 新版本段 → 提交推送 → `git tag typescript/vX.Y.Z` → `gh release create typescript/vX.Y.Z` → workflow 跑测试、构建后 `npm publish`。

## 提交规范

遵循 Conventional Commits（`feat:` / `fix:` / `docs:` / `chore:` 等）；破坏性变更标 `!` 并在 body 说明迁移方式。

## 子模块协作

本仓库作为子模块挂载于 quanttide-learn 的 `packages/quanttide-learn-toolkit`：

1. 在本仓库完成修改并提交推送；
2. 回父仓库 `git add packages/quanttide-learn-toolkit && git commit` 更新引用指针并推送。
