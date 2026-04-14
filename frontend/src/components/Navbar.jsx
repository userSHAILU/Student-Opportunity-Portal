import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Bell, User, Menu, X } from 'lucide-react';

const Navbar = ({ onMenuToggle }) => {
  const { user } = useAuth();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="layout__navbar">
      <div className="flex-center" style={{ gap: '16px' }}>
        <button
          onClick={() => {
            onMenuToggle?.();
            setShowMenu(!showMenu);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'none',
            fontSize: '20px',
          }}
          className="md-hide"
        >
          {showMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
          📚 Campus Opportunities
        </h1>
      </div>

      <div className="flex-center" style={{ gap: '24px' }}>
        <button
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            position: 'relative',
          }}
        >
          <Bell size={20} />
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
              color: 'white',
              borderRadius: '50%',
              width: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
            }}
          >
            3
          </span>
        </button>

        <div className="flex-center" style={{ gap: '8px' }}>
          <div style={{ background: '#667eea', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontWeight: '500' }}>{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
