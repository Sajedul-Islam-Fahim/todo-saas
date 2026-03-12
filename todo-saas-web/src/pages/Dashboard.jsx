import { useState, useEffect } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { CheckSquare, Clock, AlertCircle, TrendingUp, Flag, Calendar } from 'lucide-react';

const StatCard = ({ icon, label, value, color }) => (
  <div style={{
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderLeft: `4px solid ${color}`,
  }}>
    <div style={{ color }}>{icon}</div>
    <div>
      <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.875rem' }}>{label}</p>
      <p style={{ color: 'white', margin: 0, fontSize: '1.75rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/dashboard');
        setStats(res.data);
      } catch (error) {
        toast.error('Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div style={{ color: 'white', textAlign: 'center', marginTop: '4rem' }}>
      Loading...
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      padding: '2rem',
    }}>
      <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Dashboard</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Overview of your todos</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
      }}>
        <StatCard
          icon={<TrendingUp size={28} />}
          label="Total Todos"
          value={stats?.total ?? 0}
          color="#6366f1"
        />
        <StatCard
          icon={<Clock size={28} />}
          label="Pending"
          value={stats?.pending ?? 0}
          color="#f59e0b"
        />
        <StatCard
          icon={<AlertCircle size={28} />}
          label="In Progress"
          value={stats?.in_progress ?? 0}
          color="#3b82f6"
        />
        <StatCard
          icon={<CheckSquare size={28} />}
          label="Completed"
          value={stats?.completed ?? 0}
          color="#10b981"
        />
        <StatCard
          icon={<Flag size={28} />}
          label="High Priority"
          value={stats?.high_priority ?? 0}
          color="#ef4444"
        />
        <StatCard
          icon={<Calendar size={28} />}
          label="Overdue"
          value={stats?.overdue ?? 0}
          color="#dc2626"
        />
      </div>
    </div>
  );
}
