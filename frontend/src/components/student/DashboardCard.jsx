import React from 'react';
import { TrendingUp, Award, Briefcase } from 'lucide-react';

const DashboardCard = ({ title, value, icon: Icon, color = '#667eea' }) => {
  return (
    <div
      className="card"
      style={{
        borderLeft: `4px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '12px',
          background: `${color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
        }}
      >
        <Icon size={32} />
      </div>
      <div>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '4px' }}>
          {title}
        </p>
        <h3 style={{ fontSize: '28px', fontWeight: 'bold', color: color }}>
          {value}
        </h3>
      </div>
    </div>
  );
};

export default DashboardCard;
