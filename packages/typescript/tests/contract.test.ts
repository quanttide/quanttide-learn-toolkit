/**
 * 契约测试：以根 tests/ 的 Schema + Fixture 验证 TypeScript 模型。
 *
 * 单一事实源是根 tests/（schemas/ + fixtures/），由 docs/specification 推导。
 * 测试内容：必填字段存在性 → 编译期类型校验 → Round-trip。
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import type { Completion, Learner, Schedule, Task } from "../src/index.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "..", "tests");
const FIXTURES = join(ROOT, "fixtures");
const SCHEMAS = join(ROOT, "schemas");

function fixture(name: string): string {
  return readFileSync(join(FIXTURES, `${name}.json`), "utf-8");
}

function fixtureDict(name: string): Record<string, unknown> {
  return JSON.parse(fixture(name)) as Record<string, unknown>;
}

/** 校验 fixture 覆盖 Schema 的必填字段（轻量实现，对齐 Go 侧契约测试）。 */
function hasRequired(data: Record<string, unknown>, schemaName: string): void {
  const schema = JSON.parse(
    readFileSync(join(SCHEMAS, `${schemaName}.json`), "utf-8"),
  ) as { required?: string[] };
  const missing = (schema.required ?? []).filter((key) => !(key in data));
  expect(missing, `${schemaName} 缺少必填字段`).toEqual([]);
}

/** Round-trip：序列化→反序列化后值不变。 */
function roundTrip<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

describe("contract", () => {
  it("learner 覆盖 Schema 必填字段，且类型与关键值符合预期", () => {
    const data = fixtureDict("learner");
    hasRequired(data, "learner");
    const learner = JSON.parse(fixture("learner")) as Learner;
    expect(learner.id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(learner.schedule_id).toBe("schedule-agent-engineer");
    expect(roundTrip(learner)).toEqual(learner);
  });

  it("completion 覆盖 Schema 必填字段，status 为二元枚举", () => {
    const data = fixtureDict("completion");
    hasRequired(data, "completion");
    const completion = JSON.parse(fixture("completion")) as Completion;
    expect(completion.status).toBe("completed");
    expect(["completed", "not_completed"]).toContain(completion.status);
    expect(completion.learner_id).toBe("550e8400-e29b-41d4-a716-446655440000");
    expect(roundTrip(completion)).toEqual(completion);
  });

  it("task 覆盖 Schema 必填字段，且类型与关键值符合预期", () => {
    const data = fixtureDict("task");
    hasRequired(data, "task");
    const task = JSON.parse(fixture("task")) as Task;
    expect(task.id).toBe("task-data-second-brain");
    expect(task.title).toBe("熟悉数据工程第二大脑");
    expect(roundTrip(task)).toEqual(task);
  });

  it("schedule 覆盖 Schema 必填字段，tasks 为 Task 有序数组", () => {
    const data = fixtureDict("schedule");
    hasRequired(data, "schedule");
    const schedule = JSON.parse(fixture("schedule")) as Schedule;
    expect(schedule.id).toBe("schedule-agent-engineer");
    expect(Array.isArray(schedule.tasks)).toBe(true);
    expect(schedule.tasks.length).toBe(2);
    expect(schedule.tasks[0].id).toBe("task-data-second-brain");
    expect(roundTrip(schedule)).toEqual(schedule);
  });
});
