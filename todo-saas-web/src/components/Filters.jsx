export default function Filters({ filters, onChange }) {
  const selectStyle = {
    padding: '0.5rem 0.75rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#1e293b',
    color: 'white',
    cursor: 'pointer',
    fontSize: '0.875rem',
  };

  const inputStyle = {
    ...selectStyle,
    minWidth: '200px',
  };

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: '1.5rem',
    }}>
      <input
        type="text"
        placeholder="Search todos..."
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        style={inputStyle}
      />

      <select
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
        style={selectStyle}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        style={selectStyle}
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <input
        type="date"
        value={filters.due_date}
        onChange={(e) => onChange({ ...filters, due_date: e.target.value })}
        style={selectStyle}
      />

      <button
        onClick={() => onChange({ search: '', status: '', priority: '', due_date: '' })}
        style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '8px',
          border: '1px solid #475569',
          backgroundColor: 'transparent',
          color: '#94a3b8',
          cursor: 'pointer',
          fontSize: '0.875rem',
        }}
      >
        Clear Filters
      </button>
    </div>
  );
}
