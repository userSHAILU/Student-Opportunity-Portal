import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SkillChart = ({ data = [] }) => {
  // Transform skills data for chart
  const chartData = data.slice(0, 5).map((item) => ({
    name: item.skill?.substring(0, 10),
    count: item.count,
  }));

  if (chartData.length === 0) {
    return (
      <div className="card">
        <h3>Skill Distribution</h3>
        <p className="text--muted" style={{ marginTop: '16px', textAlign: 'center' }}>
          Upload certificates to see your skill distribution
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 style={{ marginBottom: '16px' }}>Top Skills</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#667eea" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillChart;
