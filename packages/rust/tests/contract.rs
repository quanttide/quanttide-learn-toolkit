use std::fs;
use std::path::PathBuf;

use quanttide_learn::{Completion, CompletionStatus, Learner, Schedule, Task};
use serde::de::DeserializeOwned;
use serde::Serialize;
use serde_json::Value;

fn fixture_path(name: &str) -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .join("../../tests/fixtures")
        .join(format!("{name}.json"))
}

fn fixture(name: &str) -> String {
    fs::read_to_string(fixture_path(name)).expect("fixture should be readable")
}

fn has_fields(name: &str, required: &[&str]) -> Value {
    let value: Value = serde_json::from_str(&fixture(name)).expect("fixture should parse");
    for key in required {
        assert!(
            value.get(key).is_some(),
            "{name} missing required field {key}"
        );
    }
    value
}

fn round_trip<T>(value: &T) -> T
where
    T: Serialize + DeserializeOwned,
{
    serde_json::from_value(serde_json::to_value(value).expect("serialize")).expect("deserialize")
}

#[test]
fn learner_contract() {
    has_fields("learner", &["id"]);
    let learner: Learner = serde_json::from_str(&fixture("learner")).expect("learner");
    assert_eq!(learner.id, "550e8400-e29b-41d4-a716-446655440000");
    assert_eq!(
        learner.schedule_id.as_deref(),
        Some("schedule-agent-engineer")
    );
    assert_eq!(round_trip(&learner), learner);
}

#[test]
fn completion_contract() {
    has_fields("completion", &["id", "learner_id", "task_id", "status"]);
    let completion: Completion = serde_json::from_str(&fixture("completion")).expect("completion");
    assert_eq!(completion.status, CompletionStatus::Completed);
    assert_eq!(
        completion.learner_id,
        "550e8400-e29b-41d4-a716-446655440000"
    );
    assert_eq!(round_trip(&completion), completion);
}

#[test]
fn task_contract() {
    has_fields("task", &["id", "title", "description"]);
    let task: Task = serde_json::from_str(&fixture("task")).expect("task");
    assert_eq!(task.id, "task-data-second-brain");
    assert_eq!(task.title, "熟悉数据工程第二大脑");
    assert_eq!(round_trip(&task), task);
}

#[test]
fn schedule_contract() {
    has_fields("schedule", &["id", "title", "tasks"]);
    let schedule: Schedule = serde_json::from_str(&fixture("schedule")).expect("schedule");
    assert_eq!(schedule.id, "schedule-agent-engineer");
    assert_eq!(schedule.tasks.len(), 2);
    assert_eq!(schedule.tasks[0].id, "task-data-second-brain");
    assert_eq!(round_trip(&schedule), schedule);
}
