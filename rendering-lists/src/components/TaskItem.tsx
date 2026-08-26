export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  const priorityColorMap = {
    low: 'text-emerald-400',
    medium: 'text-amber-400',
    high: 'text-rose-400',
  };

  return (
    <div className="bg-slate-950/70 border border-pink-500/15 rounded-2xl p-5 mb-4 flex justify-between items-center shadow-lg shadow-pink-950/10 backdrop-blur-sm hover:border-pink-500/30 transition-all">
      <div>
        <h3 className="text-pink-50 font-semibold text-lg mb-1">{task.title}</h3>
        <p className="text-slate-400 text-sm mb-3.5 font-light">{task.description}</p>
        <div className="flex gap-4 text-xs font-medium">
          <span className={priorityColorMap[task.priority]}>
            Priority: {task.priority}
          </span>
          <span className="text-slate-500">Due: {task.dueDate}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="bg-pink-50/95 text-slate-900 border border-pink-200/50 rounded-xl px-3.5 py-1.5 text-sm font-semibold focus:outline-none cursor-pointer shadow-sm hover:bg-white transition-all"
        >
          <option value="pending" className="text-slate-900 font-medium">Pending</option>
          <option value="in-progress" className="text-indigo-600 font-medium">In Progress</option>
          <option value="completed" className="text-emerald-600 font-medium">Completed</option>
        </select>
        <button
          onClick={() => onDelete(task.id)}
          className="text-rose-400 hover:text-rose-300 text-sm font-semibold px-2 py-1 rounded-lg hover:bg-rose-500/10 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;