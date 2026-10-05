package learn_test

import (
	"encoding/json"
	"os"
	"reflect"
	"testing"

	learn "github.com/quanttide/quanttide-learn-toolkit/packages/go/pkg"
)

func fixture(t *testing.T, name string) []byte {
	t.Helper()
	data, err := os.ReadFile("../../../tests/fixtures/" + name + ".json")
	if err != nil {
		t.Fatalf("read fixture %s: %v", name, err)
	}
	return data
}

func hasFields(t *testing.T, data []byte, required ...string) map[string]any {
	t.Helper()
	var m map[string]any
	if err := json.Unmarshal(data, &m); err != nil {
		t.Fatalf("unmarshal fixture: %v", err)
	}
	for _, key := range required {
		if _, ok := m[key]; !ok {
			t.Fatalf("fixture missing required field %q", key)
		}
	}
	return m
}

func roundTrip[T any](t *testing.T, value T) T {
	t.Helper()
	out, err := json.Marshal(value)
	if err != nil {
		t.Fatalf("marshal: %v", err)
	}
	var back T
	if err := json.Unmarshal(out, &back); err != nil {
		t.Fatalf("unmarshal round-trip: %v", err)
	}
	return back
}

func TestContractLearner(t *testing.T) {
	data := fixture(t, "learner")
	hasFields(t, data, "id")
	var learner learn.Learner
	if err := json.Unmarshal(data, &learner); err != nil {
		t.Fatal(err)
	}
	if learner.ID != "550e8400-e29b-41d4-a716-446655440000" || learner.ScheduleID != "schedule-agent-engineer" {
		t.Fatalf("learner = %+v", learner)
	}
	if !reflect.DeepEqual(roundTrip(t, learner), learner) {
		t.Fatalf("learner round-trip mismatch")
	}
}

func TestContractCompletion(t *testing.T) {
	data := fixture(t, "completion")
	hasFields(t, data, "id", "learner_id", "task_id", "status")
	var completion learn.Completion
	if err := json.Unmarshal(data, &completion); err != nil {
		t.Fatal(err)
	}
	if completion.Status != learn.CompletionStatusCompleted || completion.LearnerID != "550e8400-e29b-41d4-a716-446655440000" {
		t.Fatalf("completion = %+v", completion)
	}
	if !reflect.DeepEqual(roundTrip(t, completion), completion) {
		t.Fatalf("completion round-trip mismatch")
	}
}

func TestContractTask(t *testing.T) {
	data := fixture(t, "task")
	hasFields(t, data, "id", "title", "description")
	var task learn.Task
	if err := json.Unmarshal(data, &task); err != nil {
		t.Fatal(err)
	}
	if task.ID != "task-data-second-brain" || task.Title != "熟悉数据工程第二大脑" {
		t.Fatalf("task = %+v", task)
	}
	if !reflect.DeepEqual(roundTrip(t, task), task) {
		t.Fatalf("task round-trip mismatch")
	}
}

func TestContractSchedule(t *testing.T) {
	data := fixture(t, "schedule")
	hasFields(t, data, "id", "title", "tasks")
	var schedule learn.Schedule
	if err := json.Unmarshal(data, &schedule); err != nil {
		t.Fatal(err)
	}
	if schedule.ID != "schedule-agent-engineer" || len(schedule.Tasks) != 2 || schedule.Tasks[0].ID != "task-data-second-brain" {
		t.Fatalf("schedule = %+v", schedule)
	}
	if !reflect.DeepEqual(roundTrip(t, schedule), schedule) {
		t.Fatalf("schedule round-trip mismatch")
	}
}
