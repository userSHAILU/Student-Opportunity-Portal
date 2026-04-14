import React, { useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { DEPARTMENTS } from '../../utils/constants';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const DepartmentInsights = () => {
  const [selectedDept, setSelectedDept] = useState('CSE');
  const { data: deptData, loading } = useFetch(
    `/analytics/departments?department=${selectedDept}`
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>🏫 Department-wise Insights</h1>

      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>Select Department</h3>
        <div className="flex" style={{ gap: '8px', flexWrap: 'wrap' }}>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              className={`btn ${selectedDept === dept ? 'btn--primary' : 'btn--outlne'}`}
              onClick={() => setSelectedDept(dept)}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid--2">
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>📊 {selectedDept} - Top Skills</h3>
          {deptData?.topSkills?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {deptData.topSkills.map((item, idx) => (
                <div key={idx} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                  <div className="flex-between">
                    <span>{item.skill}</span>
                    <span className="badge badge--success">{item.count} students</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text--muted">No data available</p>
          )}
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>⚠️ {selectedDept} - Weak Skills</h3>
          {deptData?.weakSkills?.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {deptData.weakSkills.map((item, idx) => (
                <div key={idx} style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
                  <div className="flex-between">
                    <span>{item.skill}</span>
                    <span className="badge badge--warning">{item.count} students</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text--muted">No weak skills identified</p>
          )}
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>📈 Summary for {selectedDept}</h3>
        <p>
          <strong>Total Students:</strong> {deptData?.totalStudents || 0}
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Strong Areas:</strong> {deptData?.topSkills?.slice(0, 3).map((s) => s.skill).join(', ') || 'N/A'}
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Focus Areas:</strong> {deptData?.weakSkills?.slice(0, 3).map((s) => s.skill).join(', ') || 'N/A'}
        </p>
      </div>
    </div>
  );
};

export default DepartmentInsights;
