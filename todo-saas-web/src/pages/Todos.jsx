import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { Plus, X } from 'lucide-react';
import TodoCard from '../components/TodoCard';
import TodoForm from '../components/TodoForm';
import Filters from '../components/Filters';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editTodo, setEditTodo] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    priority: '',
    due_date: '',
  });

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.search)   params.search   = filters.search;
      if (filters.status)   params.status   = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (filters.due_date) params.due_date = filters.due_date;

      const res = await api.get('/todos', { params });
      setTodos(res.data);
    } catch (error) {
      toast.error('Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this todo?')) return;
    try {
      await api.delete(`/todos/${id}`);
      toast.success('Todo deleted successfully');
      fetchTodos();
    } catch (error) {
      toast.error('Failed to delete todo');
    }
  };

  const handleEdit = (todo) => {
    setEditTodo(todo);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditTodo(null);
    fetchTodos();
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditTodo(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '2rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}>
        <h1 style={{ color: 'white', margin: 0 }}>My Todos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.6rem 1.2rem',
            backgroundColor: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.95rem',
          }}
        >
          {showForm ? <X size={18} /> : <Plus size={18} />}
          {showForm ? 'Close' : 'New Todo'}
        </button>
      </div>

      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
        {todos.length} todo{todos.length !== 1 ? 's' : ''} found
      </p>

      {showForm && (
        <div style={{
          backgroundColor: '#1e293b',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '2rem',
        }}>
          <h2 style={{ color: 'white', marginTop: 0, marginBottom: '1.5rem' }}>
            {editTodo ? 'Edit Todo' : 'Create New Todo'}
          </h2>
          <TodoForm onSuccess={handleFormSuccess} editTodo={editTodo} />
          {editTodo && (
            <button
              onClick={handleCloseForm}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: '#94a3b8',
                border: '1px solid #334155',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '0.75rem',
              }}
            >
              Cancel
            </button>
          )}
        </div>
      )}

      <Filters filters={filters} onChange={setFilters} />

      {loading ? (
        <p style={{ color: '#94a3b8', textAlign: 'center' }}>Loading todos...</p>
      ) : todos.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No todos found.</p>
          <p style={{ color: '#475569' }}>Create your first todo!</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {todos.map((todo) => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
