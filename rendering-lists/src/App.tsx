import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { type Task, type TaskStatus } from './components/TaskItem';
import SingleStateForm, { type NewTaskData } from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Dashboard from './components/TaskDashboard';
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

  // --- EDITING STATE ---
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // --- FILTER & SEARCH STATE ---
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('taskTracker_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // --- HANDLERS ---
  const handleAddTask = (newTaskData: NewTaskData) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
    setTaskToEdit(null);
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
    if (taskToEdit?.id === taskId) {
      setTaskToEdit(null);
    }
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchQuery('');
  };


  // --- FILTER TASKS ---
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus =
      statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority =
      priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-pink-100 tracking-tight flex items-center justify-center gap-1.5">
            Task Dashboard <span className="text-pink-400/50 font-normal">#</span> ✨
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
          {/* Dashboard Summary Stats */}
          <Dashboard tasks={tasks} />

          {/* Form for Add & Edit */}
          <SingleStateForm
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            taskToEdit={taskToEdit}
            onCancelEdit={() => setTaskToEdit(null)}
          />

          {/* Filter & Search Bar */}
          <TaskFilter
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            searchQuery={searchQuery}
            onStatusFilterChange={setStatusFilter}
            onPriorityFilterChange={setPriorityFilter}
            onSearchQueryChange={setSearchQuery}
            onClearFilters={handleClearFilters}
          />

          {/* Task Item List */}
          <TaskList
            tasks={filteredTasks}
            onStatusChange={handleStatusChange}
            onDelete={handleDelete}
          />
        </main>
      </div>
    </div>
  );
}

export default App;