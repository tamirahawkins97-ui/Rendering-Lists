import { type Task } from './TaskItem';

interface DashboardProps {
  tasks: Task[];
}

export function Dashboard({ tasks }: DashboardProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress').length;
 const pendingTasks = tasks.filter((t) => t.status === 'pending').length;

return (
   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
     <div className="bg-slate-900/60 border border-pink-500/10 p-3.5 rounded-2xl text-center">
        <p className="text-xs font-medium text-pink-300/70 uppercase tracking-wide">Total</p>
        <p className="text-2xl font-bold text-pink-100 mt-1">{totalTasks}</p>
     </div>

    <div className="bg-slate-900/60 border border-amber-500/10 p-3.5 rounded-2xl text-center">
        <p className="text-xs font-medium text-amber-300/70 uppercase tracking-wide">Pending</p>
        <p className="text-2xl font-bold text-amber-200 mt-1">{pendingTasks}</p>
    </div>

    <div className="bg-slate-900/60 border border-blue-500/10 p-3.5 rounded-2xl text-center">
        <p className="text-xs font-medium text-blue-300/70 uppercase tracking-wide">In Progress</p>
        <p className="text-2xl font-bold text-blue-200 mt-1">{inProgressTasks}</p>
    </div>

    <div className="bg-slate-900/60 border border-emerald-500/10 p-3.5 rounded-2xl text-center">
        <p className="text-xs font-medium text-emerald-300/70 uppercase tracking-wide">Completed</p>
        <p className="text-2xl font-bold text-emerald-200 mt-1">{completedTasks}</p>
    </div>
   </div>
  );
}

export default Dashboard;