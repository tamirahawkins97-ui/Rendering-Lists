import { useState } from 'react';
import { type Task, type TaskStatus } from './TaskItem';

// Define TaskPriority directly or import it if exported from TaskItem
export type TaskPriority = 'low' | 'medium' | 'high';

// Data shape collected by the form (id is generated in App.tsx)
export type NewTaskData = Omit<Task, 'id'>;

interface TaskFormProps {
  onAddTask: (newTask: NewTaskData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState<NewTaskData>({
    title: '',
    description: '',
    status: 'in-progress' as TaskStatus,
    priority: 'medium' as TaskPriority,
    dueDate: '',
  });

  const [errors, setErrors] = useState<{ title?: string; dueDate?: string, description?: string }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic Validation for Task Creation
    const newErrors: { title?: string; dueDate?: string, description?: string } = {};
    if (!taskData.title.trim()) {
      newErrors.title = 'Task title is required.';
    }
    if (!taskData.dueDate.trim()) {
      newErrors.dueDate = 'Due date is required.';
    }
    if (!taskData.description.trim()) {
      newErrors.description = 'Task description is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Send the task object up to App state
    onAddTask(taskData);

    // Reset task form input values
    setTaskData({
      title: '',
      description: '',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4 mb-6">
      <h2 className="text-lg font-semibold text-pink-200">Add a New Task ✨</h2>

      {/* Task Title Input */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={taskData.title}
          onChange={handleChange}
          placeholder="e.g., Complete React Homework"
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
        />
        {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
        <textarea
          name="description"
          value={taskData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Brief details about the task..."
          className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
        />
        {errors.description && <p className="text-red-400 text-xs mt-1">{errors.description}</p>}
      </div>

      {/* Priority & Due Date Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Priority</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Due Date</label>
          <input
            type="text"
            name="dueDate"
            placeholder="MM/DD/YYYY"
            value={taskData.dueDate}
            onChange={handleChange}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-pink-500"
          />
          {errors.dueDate && <p className="text-red-400 text-xs mt-1">{errors.dueDate}</p>}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-pink-600 hover:bg-pink-500 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
      >
        + Add Task to List
      </button>
    </form>
  );
};

export default TaskForm;