import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { type Task, type TaskStatus } from './components/TaskItem';
import SingleStateForm, { type NewTaskData } from './components/TaskForm';
import './App.css';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

const defaultTasks: Task[] = [
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
];

function App() {
  const [userData] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem('taskTracker_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('taskTracker_tasks');
    return savedTasks ? JSON.parse(savedTasks) : defaultTasks;
  });

  useEffect(() => {
    localStorage.setItem('taskTracker_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (newTaskData: NewTaskData) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

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
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-pink-100 tracking-tight flex items-center justify-center gap-1.5">
            Task Tracker <span className="text-pink-400/50 font-normal">#</span> ✨
          </h1>
          <p className="text-xs text-pink-300/50 mt-1">
            Keep track of your goals in style 🌸
          </p>
          {userData && (
            <p className="text-sm text-pink-300 font-medium mt-2">
              Welcome back, {userData.firstName}! 👋
            </p>
          )}
        </header>

        <main className="space-y-6">
          <SingleStateForm onAddTask={handleAddTask} />
          
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