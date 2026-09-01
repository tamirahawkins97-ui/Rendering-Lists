import TaskItem, { type Task, type TaskStatus } from './TaskItem';

export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  return (
    <div className="task-list-container">
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;