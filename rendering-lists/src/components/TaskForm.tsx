import { useState } from 'react';
import { type TaskStatus } from './TaskItem';

export interface NewTaskData {
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

interface SingleStateFormProps {
  onAddTask: (taskData: NewTaskData) => void;
}

const SingleStateForm: React.FC<SingleStateFormProps> = ({ onAddTask }) => {
  const [formData, setFormData] = useState<NewTaskData>({
    title: '',
    description: '',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onAddTask(formData);
    
    setFormData({
      title: '',
      description: '',
      status: 'in-progress',
      priority: 'medium',
      dueDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-2 bg-slate-800 rounded text-slate-100 border border-slate-700"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 bg-slate-800 rounded text-slate-100 border border-slate-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 bg-slate-800 rounded text-slate-100 border border-slate-700"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="text"
            name="dueDate"
            placeholder="e.g. 12/31/2026"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full p-2 bg-slate-800 rounded text-slate-100 border border-slate-700"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-pink-500 hover:bg-pink-600 font-semibold rounded text-white transition-colors"
      >
        Add Task
      </button>
    </form>
  );
};

export default SingleStateForm;