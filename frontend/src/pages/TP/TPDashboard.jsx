import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { DEPARTMENTS } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const TPDashboard = () => {
  const { data: skillData, loading } = useFetch('/analytics/skills');
  const [selectedDept, setSelectedDept] = React.useState('CSE');

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>📊 T&P Dashboard</h1>

      <div className="grid grid--3" style={{ marginBottom: '24px' }}>
        <div className="card" style={{ borderLeft: '4px solid #667eea' }}>
          <p className="text--muted" style={{ marginBottom: '8px' }}>Total Students</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>150+</h3>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <p className="text--muted" style={{ marginBottom: '8px' }}>Skills Tracked</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#10b981' }}>25+</h3>
        </div>
        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
          <p className="text--muted" style={{ marginBottom: '8px' }}>Trainings Offered</p>
          <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b' }}>12</h3>
        </div>
      </div>

      <div className="grid grid--2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>📈 Top Skills Overall</h3>
          {skillData?.skillDistribution?.slice(0, 5).map((item, idx) => (
            <div key={idx} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
              <div className="flex-between">
                <span>{item.skill}</span>
                <span style={{ fontWeight: 'bold', color: '#667eea' }}>{item.count}</span>
              </div>
              <div style={{
                height: '4px',
                background: 'var(--border)',
                borderRadius: '2px',
                marginTop: '6px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea, #764ba2)',
                  width: `${(item.count / (skillData?.skillDistribution[0]?.count || 1)) * 100}%`,
                }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>🎯 Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/tp/analytics" className="btn btn--primary">
              View Department Analytics
            </a>
            <a href="/tp/gaps" className="btn btn--secondary">
              Skill Gap Analysis
            </a>
            <a href="/tp/trainings" className="btn btn--outlne">
              Manage Trainings
            </a>
            <a href="/tp/comments" className="btn btn--outlne">
              Student Messages
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TPDashboard;
