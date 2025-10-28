import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AdminLogin = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try admin login first
      try {
        const response = await api.post('/admin/login', {
          username: form.username,
          password: form.password
        });
        
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Navigate based on role
        if (response.data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/user-dashboard');
        }
      } catch (adminErr) {
        // If admin login fails, try user login
        const response = await api.post('/user/login', {
          username: form.username,
          password: form.password
        });
        
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2">Login</h1>
          <p className="text-sm text-gray-600">
            Sign in to access your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                placeholder="Enter admin username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                placeholder="Enter admin password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center bg-red-50 p-3 border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 text-sm font-medium transition-colors ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Link to register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/user-login')}
                className="text-black font-medium hover:underline"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;