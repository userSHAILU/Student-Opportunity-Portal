import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAPI } from '../../utils/api';
import { validateEmail } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';
import Notification from '../../components/common/Notification';
import { Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setNotification({ type: 'error', message: 'Invalid email' });
      return;
    }

    if (password.length < 6) {
      setNotification({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    try {
      setLoading(true);
      const response = await loginAPI(email, password);
      login(response.data.user, response.data.token);
      

      // Redirect based on role
      if (response.data.user.role === 'student') navigate('/student/dashboard');
      else if (response.data.user.role === 'admin') navigate('/admin/dashboard');
      else if (response.data.user.role === 'tp') navigate('/tp/dashboard');
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.response?.data?.message || 'Login failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>📚 Campus Hub</h1>
          <p className="text--muted">Sign in to your account</p>
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
            <label className="form-group__label">📧 Email Address</label>
            <div className="flex-center" style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: 'var(--primary)',
                }}
              />
              <input
                type="email"
                className="form-group__input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-group__label">🔐 Password</label>
            <div className="flex-center" style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  color: 'var(--primary)',
                }}
              />
              <input
                type="password"
                className="form-group__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '40px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn--primary btn--lg"
            style={{ width: '100%', marginTop: '16px' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '16px', textAlign: 'center', color: '#6b7280' }}>
          Don't have an account?{' '}
          <a href="/register" style={{ color: 'var(--primary)', fontWeight: '600' }}>
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
