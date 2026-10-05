// Package learn provides QuantTide learning management domain models.
//
// The JSON field names are the contract field names from the repository-level
// tests/schemas and tests/fixtures directories. Keep this package model-only:
// application behavior belongs in providers, CLIs, and frontends.
package learn

// CompletionStatus is the binary completion status enum.
type CompletionStatus string

const (
	CompletionStatusCompleted    CompletionStatus = "completed"
	CompletionStatusNotCompleted CompletionStatus = "not_completed"
)

// Learner is the learning-domain learner entity.
type Learner struct {
	ID         string `json:"id"`
	UserID     string `json:"user_id,omitempty"`
	ScheduleID string `json:"schedule_id,omitempty"`
}

// Completion records whether a learner has completed a task.
type Completion struct {
	ID        string           `json:"id"`
	LearnerID string           `json:"learner_id"`
	TaskID    string           `json:"task_id"`
	Status    CompletionStatus `json:"status"`
	CreatedAt string           `json:"created_at,omitempty"`
	UpdatedAt string           `json:"updated_at,omitempty"`
}

// Task is the smallest self-contained learning-by-doing unit.
type Task struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

// Schedule is an ordered collection of tasks.
type Schedule struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description,omitempty"`
	Tasks       []Task `json:"tasks"`
}
