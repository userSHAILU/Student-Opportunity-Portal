import React from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useSkillAnalysis } from '../../hooks/useSkillAnalysis';
import DashboardCard from '../../components/student/DashboardCard';
import SkillChart from '../../components/student/SkillChart';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Award, Briefcase, TrendingUp, BookOpen } from 'lucide-react';

const Dashboard = () => {
  const { data: certificates, loading: certsLoading } = useFetch('/certificates/my');
  const { data: opportunities } = useFetch('/opportunities/approved');
  const skills = useSkillAnalysis();

  if (certsLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 style={{ marginBottom: '24px' }}>📊 Your Dashboard</h1>

      <div className="grid grid--3" style={{ marginBottom: '24px' }}>
        <DashboardCard
          title="Total Certificates"
          value={certificates?.length || 0}
          icon={Award}
          color="#10b981"
        />
        <DashboardCard
          title="Unique Skills"
          value={skills.length || 0}
          icon={TrendingUp}
          color="#f59e0b"
        />
        <DashboardCard
          title="Opportunities"
          value={opportunities?.length || 0}
          icon={Briefcase}
          color="#8b5cf6"
        />
      </div>

      <div className="grid grid--2">
        <SkillChart data={certificates?.map((c) => ({ skill: c.title, count: 1 })) || []} />

        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>⚡ Quick Actions</h3>
          <div className="flex" style={{ flexDirection: 'column', gap: '12px' }}>
            <a href="/student/certificates" className="btn btn--primary">
              <BookOpen size={18} />
              View All Certificates
            </a>
            <a href="/student/add-opportunity" className="btn btn--secondary">
              📝 Share Opportunity
            </a>
            <a href="/student/opportunities" className="btn btn--outlne">
              🔍 Browse Opportunities
            </a>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: '24px' }}>
        <h3 style={{ marginBottom: '16px' }}>💡 Smart Suggestion</h3>
        <p>
          📌 You have strong skills in {skills[0] || 'multiple areas'}. Consider applying to roles that
          require these skills!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
