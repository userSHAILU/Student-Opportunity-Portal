import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Menu, LogOut, Home, Award, Briefcase, BarChart3, MessageSquare, GraduationCap } from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems = {
    student: [
      { path: '/student/dashboard', label: 'Dashboard', icon: Home },
      { path: '/student/certificates', label: 'My Certificates', icon: Award },
      { path: '/student/opportunities', label: 'Opportunities', icon: Briefcase },
      { path: '/student/add-opportunity', label: 'Share Opportunity', icon: Briefcase },
      { path: '/student/comments', label: 'Messages', icon: MessageSquare },
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
      { path: '/admin/moderate', label: 'Moderate Content', icon: BarChart3 },
    ],
    tp: [
      { path: '/tp/dashboard', label: 'Dashboard', icon: Home },
      { path: '/tp/analytics', label: 'Analytics', icon: BarChart3 },
      { path: '/tp/gaps', label: 'Skill Gaps', icon: GraduationCap },
      { path: '/tp/trainings', label: 'Trainings', icon: Award },
      { path: '/tp/comments', label: 'Student Messages', icon: MessageSquare },
    ],
  };

  const items = menuItems[user?.role] || [];

  return (
    <div className="layout__sidebar">
      <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>Campus Hub</h2>
        <p style={{ fontSize: '12px', opacity: 0.8 }}>{user?.name}</p>
      </div>

      <nav className="menu">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`menu__item ${isActive ? 'menu__item--active' : ''}`}
              onClick={onClose}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => {
          logout();
          window.location.href = '/login';
        }}
        style={{
          marginTop: '24px',
          width: '100%',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.1)',
          border: 'none',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
