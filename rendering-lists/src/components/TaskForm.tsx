import { useState, useEffect } from 'react';
import { type Task, type TaskStatus } from './TaskItem';

export interface NewTaskData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface SingleStateFormProps {
  onAddTask: (taskData: NewTaskData) => void;
  onUpdateTask?: (updatedTask: Task) => void;
  taskToEdit?: Task | null;
  onCancelEdit?: () => void;
}

const SingleStateForm: React.FC<SingleStateFormProps> = ({
  onAddTask,
  onUpdateTask,
  taskToEdit,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState<NewTaskData>({
    title: '',
    description: '',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '',
  });

  const [errors, setErrors] = useState<{ title?: string }>({});

  // Populate form if editing an existing task
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'in-progress',
        priority: 'medium',
        dueDate: '',
      });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'title' && value.trim()) {
      setErrors((prev) => ({ ...prev, title: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setErrors({ title: 'Task title is required.' });
      return;
    }

    if (taskToEdit && onUpdateTask) {
      // Handle Edit
      onUpdateTask({ ...taskToEdit, ...formData });
    } else {
      // Handle Add
      onAddTask(formData);
    }

    // Reset Form
    setFormData({
      title: '',
      description: '',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/60 p-5 rounded-2xl border border-pink-500/10 shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-pink-100">
          {taskToEdit ? '✏️ Edit Task' : '➕ Add New Task'}
        </h2>
        {taskToEdit && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-xs text-slate-400 hover:text-pink-300 underline"
          >
            Cancel Edit
          </button>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-pink-300/70 tracking-wide uppercase mb-1">
          Title <span className="text-pink-400">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title..."
          className="w-full p-2.5 bg-slate-900 text-pink-100 border border-pink-500/20 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-all"
        />
        {errors.title && <p className="text-xs text-red-400 mt-1">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-xs font-medium text-pink-300/70 tracking-wide uppercase mb-1">
          Description
        </label>
        <textarea
          name="description"
          rows={3}
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task details..."
          className="w-full p-2.5 bg-slate-900 text-pink-100 border border-pink-500/20 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-all"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-pink-300/70 tracking-wide uppercase mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 text-pink-100 border border-pink-500/20 rounded-xl text-sm focus:outline-none focus:border-pink-400 cursor-pointer"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-pink-300/70 tracking-wide uppercase mb-1">
            Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 text-pink-100 border border-pink-500/20 rounded-xl text-sm focus:outline-none focus:border-pink-400 cursor-pointer"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-pink-300/70 tracking-wide uppercase mb-1">
            Due Date
          </label>
          <input
            type="text"
            name="dueDate"
            placeholder="e.g. 12/31/2026"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 bg-slate-900 text-pink-100 border border-pink-500/20 rounded-xl text-sm focus:outline-none focus:border-pink-400"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-xl shadow-md hover:shadow-pink-500/20 transition-all text-sm"
      >
        {taskToEdit ? 'Save Changes' : 'Add Task'}
      </button>
    </form>
  );
};

export default SingleStateForm;