export interface TaskFilterProps {
  statusFilter: string;
  priorityFilter: string;
  searchQuery?: string;
  onStatusFilterChange: (status: string) => void;
  onPriorityFilterChange: (priority: string) => void;
  onSearchQueryChange?: (query: string) => void;
  onClearFilters?: () => void;
}

function TaskFilter({
  statusFilter = 'all',
  priorityFilter = 'all',
  searchQuery = '',
  onStatusFilterChange,
  onPriorityFilterChange,
  onSearchQueryChange,
  onClearFilters,
}: TaskFilterProps) {
  const hasActiveFilters =
    statusFilter !== 'all' ||
    priorityFilter !== 'all' ||
    (searchQuery && searchQuery.trim() !== '');

  return (
    <div className="space-y-4 mb-6 bg-slate-900/40 p-4 rounded-2xl border border-pink-500/10">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search Input */}
        {onSearchQueryChange && (
          <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
            <label className="text-xs font-medium text-pink-300/70 tracking-wide uppercase">
              Search Tasks
            </label>
            <input
              type="text"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              className="bg-slate-900/80 text-pink-100 border border-pink-500/20 rounded-xl px-3.5 py-1.5 text-sm font-medium focus:outline-none focus:border-pink-400 shadow-sm transition-all placeholder:text-slate-500"
            />
          </div>
        )}

        {/* Status Filter */}
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

        {/* Priority Filter */}
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

      {/* Active Filter Indicators & Reset Button */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 pt-2 border-t border-pink-500/10 text-xs">
          <span className="text-slate-400">Active Filters:</span>
          {statusFilter !== 'all' && (
            <span className="bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-500/30">
              Status: {statusFilter}
            </span>
          )}
          {priorityFilter !== 'all' && (
            <span className="bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-500/30">
              Priority: {priorityFilter}
            </span>
          )}
          {searchQuery.trim() !== '' && (
            <span className="bg-pink-500/20 text-pink-300 px-2.5 py-0.5 rounded-full border border-pink-500/30">
              Search: "{searchQuery}"
            </span>
          )}
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="ml-auto text-pink-400 hover:text-pink-300 underline font-medium transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskFilter;