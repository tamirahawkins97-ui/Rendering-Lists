import { useState } from 'react';
import TaskList from './components/TaskList';
import { type Task, type TaskStatus } from './components/TaskItem';
import './App.css'; // Make sure your Tailwind/CSS imports are linked here or in main.tsx

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Task 1',
      description: 'Description 1',
      status: 'completed',
      priority: 'low',
      dueDate: '12/31/2026',
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Description 2',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '1/1/2027',
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Description 3',
      status: 'completed',
      priority: 'high',
      dueDate: '1/2/2027',
    },
  ]);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-pink-100 tracking-tight flex items-center gap-1.5">
            Completed Example <span className="text-pink-400/50 font-normal">#</span> ✨
          </h1>
          <p className="text-xs text-pink-300/50 mt-1">
            Keep track of your goals in style 🌸
          </p>
        </header>

        <main>
          <TaskList
            tasks={tasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;