import { type Task } from './TaskItem';

interface DashboardProps {
  tasks?: Task[];
}

export default function Dashboard({ tasks = [] }: DashboardProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

  const stats = [
    {
      label: 'Total',
      count: totalTasks,
      borderColor: 'border-pink-500/10',
      labelColor: 'text-pink-300/70',
      valueColor: 'text-pink-100',
    },
    {
      label: 'Pending',
      count: pendingTasks,
      borderColor: 'border-amber-500/10',
      labelColor: 'text-amber-300/70',
      valueColor: 'text-amber-200',
    },
    {
      label: 'In Progress',
      count: inProgressTasks,
      borderColor: 'border-blue-500/10',
      labelColor: 'text-blue-300/70',
      valueColor: 'text-blue-200',
    },
    {
      label: 'Completed',
      count: completedTasks,
      borderColor: 'border-emerald-500/10',
      labelColor: 'text-emerald-300/70',
      valueColor: 'text-emerald-200',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {stats.map(({ label, count, borderColor, labelColor, valueColor }) => (
        <div
          key={label}
          className={`bg-slate-900/60 border ${borderColor} p-3.5 rounded-2xl text-center shadow-sm`}
        >
          <p className={`text-xs font-medium uppercase tracking-wide ${labelColor}`}>
            {label}
          </p>
          <p className={`text-2xl font-bold mt-1 ${valueColor}`}>
            {count}
          </p>
        </div>
      ))}
    </div>
  );
}