export interface TaskFilterProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusFilterChange: (status: string) => void;
  onPriorityFilterChange: (priority: string) => void;
}

function TaskFilter({
  statusFilter,
  priorityFilter,
  onStatusFilterChange,
  onPriorityFilterChange,
}: TaskFilterProps) {
  return (
    <div className="flex gap-4 mb-6">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-pink-300/70 tracking-wide uppercase">
          Status
        </label>
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="bg-slate-900/80 text-pink-100 border border-pink-500/20 rounded-xl px-3.5 py-1.5 text-sm font-medium focus:outline-none focus:border-pink-400 cursor-pointer shadow-sm transition-all"
        >
          <option value="all" className="bg-slate-900 text-pink-100">All Statuses</option>
          <option value="pending" className="bg-slate-900 text-pink-100">Pending</option>
          <option value="in-progress" className="bg-slate-900 text-pink-100">In Progress</option>
          <option value="completed" className="bg-slate-900 text-pink-100">Completed</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-pink-300/70 tracking-wide uppercase">
          Priority
        </label>
        <select
          value={priorityFilter}
          onChange={(e) => onPriorityFilterChange(e.target.value)}
          className="bg-slate-900/80 text-pink-100 border border-pink-500/20 rounded-xl px-3.5 py-1.5 text-sm font-medium focus:outline-none focus:border-pink-400 cursor-pointer shadow-sm transition-all"
        >
          <option value="all" className="bg-slate-900 text-pink-100">All Priorities</option>
          <option value="low" className="bg-slate-900 text-pink-100">Low</option>
          <option value="medium" className="bg-slate-900 text-pink-100">Medium</option>
          <option value="high" className="bg-slate-900 text-pink-100">High</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter; 