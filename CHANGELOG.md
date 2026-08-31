# Changelog

## [0.1.0] - 2026-08-31

### Added

- 初始化 `packages/typescript`：TypeScript SDK，实现 Learner × Completion（标准实体）与 Schedule + Task（核心领域模型）
- 建立根 `tests/` 契约测试体系（JSON Schema + Fixture，引用 docs/specification）
- GitHub Actions 流水线：`ci-typescript.yml`（push/PR 校验）+ `publish-typescript.yml`（Release 触发，tag 前缀 `typescript/`，发布到 npm）
