import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';

export default function TodoForm({ onSuccess, editTodo = null }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: editTodo?.title || '',
    description: editTodo?.description || '',
    status: editTodo?.status || 'pending',
    priority: editTodo?.priority || 'medium',
    due_date: editTodo?.due_date || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editTodo) {
        await api.put(`/todos/${editTodo.id}`, form);
        toast.success('Todo updated successfully');
      } else {
        await api.post('/todos', form);
        toast.success('Todo created successfully');
      }
      onSuccess();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: 'white',
    boxSizing: 'border-box',
    marginBottom: '1rem',
  };

  const labelStyle = {
    color: '#94a3b8',
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={labelStyle}>Title *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Enter todo title"
          style={inputStyle}
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter description (optional)"
          rows={3}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>Status</label>
          <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange} style={inputStyle}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Due Date</label>
        <input
          type="date"
          name="due_date"
          value={form.due_date}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          width: '100%',
          padding: '0.75rem',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '1rem',
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? 'Saving...' : editTodo ? 'Update Todo' : 'Create Todo'}
      </button>
    </form>
  );
}
