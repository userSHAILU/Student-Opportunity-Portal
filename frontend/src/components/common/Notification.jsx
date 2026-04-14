import React from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';

const Notification = ({ message, type = 'info', onClose }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <AlertCircle size={20} />,
    warning: <AlertTriangle size={20} />,
  };

  const styles = {
    success: 'alert--success',
    error: 'alert--error',
    warning: 'alert--warning',
  };

  return (
    <div className={`alert ${styles[type] || ''}`} style={{ marginBottom: '16px' }}>
      {icons[type]}
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginLeft: 'auto',
          padding: '0',
        }}
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;
