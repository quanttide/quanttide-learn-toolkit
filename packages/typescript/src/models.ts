/**
 * 量潮学习管理领域模型。
 *
 * 单一事实源：docs/specification（quanttide-specification-of-learning-management），
 * 字段与 JSON 契约一一对应（snake_case），不做 case 转换层。
 *
 * 分两层：
 * - 标准实体：Learner × Completion（JSON 契约，已由学习云 provider 实现）
 * - 核心领域模型：Schedule + Task（设计完成未落码）
 */

/** 完成状态二元枚举。 */
export type CompletionStatus = "completed" | "not_completed";

/** Learner（学习者）：本领域的学习者主体。 */
export interface Learner {
  /** 本领域学习者 ID（uuid） */
  id: string;
  /** 可选，预留，关联 auth 领域用户 ID（uuid） */
  user_id?: string;
  /** 可选，→ Schedule.id，跟随的学习路径（自助学习者无 Schedule，不填） */
  schedule_id?: string;
}

/** Completion（完成记录）：Learner 沿 Schedule 完成 Task 的通过记录。 */
export interface Completion {
  /** 主键（uuid） */
  id: string;
  /** → Learner.id */
  learner_id: string;
  /** → Task.id */
  task_id: string;
  /** 二元枚举：completed | not_completed */
  status: CompletionStatus;
  /** 创建时间（ISO 8601） */
  created_at?: string;
  /** 更新时间（ISO 8601） */
  updated_at?: string;
}

/** Task（任务）：路径上的一个节点——「学什么、做什么、做到什么程度算过」的最小单位，自足、自描述。 */
export interface Task {
  /** 唯一标识 */
  id: string;
  /** 标题 */
  title: string;
  /** 验收判定写进描述（做到什么程度算过），不引用外部概念 */
  description: string;
}

/** Schedule（学习路径）：Task 的有序集合，探路者—跟随者结构的枢纽。 */
export interface Schedule {
  /** 唯一标识 */
  id: string;
  /** 名称 */
  title: string;
  /** 可选，描述 */
  description?: string;
  /** Task 有序数组，不引入额外层级实体 */
  tasks: Task[];
}
