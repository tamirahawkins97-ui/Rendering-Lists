import { useState } from 'react';
import { type Task, type TaskStatus } from './components/TaskItem';
import { type NewTaskData } from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import Dashboard from './components/TaskDashboard';

const DEFAULT_TASKS: Task[] = [
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
    status: 'in-progress',
    priority: 'medium',
    dueDate: '1/1/2027',
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);

  // Dedicated state matching TaskFilter props
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleAddTask = (newTaskData: NewTaskData) => {
    const newTask: Task = {
      ...newTaskData,
      id: Date.now().toString(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const handleDelete = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  const handleClearFilters = () => {
    setStatusFilter('all');
    setPriorityFilter('all');
    setSearchQuery('');
  };

  // Filter tasks array safely
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
      <div className="max-w-3xl mx-auto space-y-6">
        <Dashboard tasks={tasks} />
        <TaskForm onAddTask={handleAddTask} />

        <TaskFilter
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          searchQuery={searchQuery}
          onStatusFilterChange={setStatusFilter}
          onPriorityFilterChange={setPriorityFilter}
          onSearchQueryChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        <TaskList
          tasks={filteredTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}