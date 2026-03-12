import { Trash2, Pencil, Calendar, Flag } from 'lucide-react';

const statusColors = {
  pending: '#f59e0b',
  in_progress: '#3b82f6',
  completed: '#10b981',
};

const priorityColors = {
  low: '#94a3b8',
  medium: '#f59e0b',
  high: '#ef4444',
};

export default function TodoCard({ todo, onEdit, onDelete }) {
  return (
    <div style={{
      backgroundColor: '#1e293b',
      borderRadius: '12px',
      padding: '1.25rem',
      borderLeft: `4px solid ${statusColors[todo.status]}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{
          color: 'white',
          margin: 0,
          fontSize: '1rem',
          textDecoration: todo.status === 'completed' ? 'line-through' : 'none',
          opacity: todo.status === 'completed' ? 0.6 : 1,
        }}>
          {todo.title}
        </h3>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(todo)} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6366f1',
            padding: '0.25rem',
          }}>
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(todo.id)} style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#ef4444',
            padding: '0.25rem',
          }}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {todo.description && (
        <p style={{ color: '#94a3b8', margin: '0.5rem 0 0', fontSize: '0.875rem' }}>
          {todo.description}
        </p>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <span style={{
          backgroundColor: statusColors[todo.status] + '22',
          color: statusColors[todo.status],
          padding: '0.2rem 0.6rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          textTransform: 'capitalize',
        }}>
          {todo.status.replace('_', ' ')}
        </span>

        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          color: priorityColors[todo.priority],
          fontSize: '0.75rem',
          textTransform: 'capitalize',
        }}>
          <Flag size={12} />
          {todo.priority}
        </span>

        {todo.due_date && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#94a3b8',
            fontSize: '0.75rem',
          }}>
            <Calendar size={12} />
            {new Date(todo.due_date).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
}
