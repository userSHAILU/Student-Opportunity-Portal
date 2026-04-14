import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../../utils/api';
import { validateEmail, validatePassword } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import { DEPARTMENTS } from '../../utils/constants';
import Notification from '../../components/common/Notification';
import { User, Mail, Lock, Briefcase } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: 'CSE',
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setNotification({ type: 'error', message: 'Name is required' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setNotification({ type: 'error', message: 'Invalid email' });
      return;
    }

    if (!validatePassword(formData.password)) {
      setNotification({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setLoading(true);
      const response = await registerAPI(
        formData.name,
        formData.email,
        formData.password,
        formData.role,
        formData.role === 'student' ? formData.department : undefined
      );

      login(response.data.user, response.data.token);

      // Redirect based on role
      if (response.data.user.role === 'student') navigate('/student/dashboard');
      else if (response.data.user.role === 'admin') navigate('/admin/dashboard');
      else if (response.data.user.role === 'tp') navigate('/tp/dashboard');
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Registration failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>📚 Campus Hub</h1>
          <p className="text--muted">Create your account</p>
        </div>

        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-group__label">👤 Full Name</label>
            <input
              type="text"
              name="name"
              className="form-group__input"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label">📧 Email Address</label>
            <input
              type="email"
              name="email"
              className="form-group__input"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label">🔐 Password</label>
            <input
              type="password"
              name="password"
              className="form-group__input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label">👨‍💼 Role</label>
            <select
              name="role"
              className="form-group__select"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="tp">TP Officer</option>
            </select>
          </div>

          {formData.role === 'student' && (
            <div className="form-group">
              <label className="form-group__label">🎓 Department</label>
              <select
                name="department"
                className="form-group__select"
                value={formData.department}
                onChange={handleChange}
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            style={{ width: '100%', marginTop: '16px' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#6b7280' }}>
          Already have an account?{' '}
          <a href="/login" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
