import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../utils/api';

const UserLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // User login
        const response = await api.post('/user/login', {
          username: form.username,
          password: form.password
        });
        
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/user-dashboard');
      } else {
        // User registration
        if (form.password !== form.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const response = await api.post('/user/register', {
          username: form.username,
          email: form.email,
          password: form.password,
          first_name: form.first_name,
          last_name: form.last_name,
          phone: form.phone
        });
        
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      first_name: '',
      last_name: '',
      phone: ''
    });
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light mb-2">
            {isLogin ? 'User Login' : 'Create Account'}
          </h1>
          <p className="text-sm text-gray-600">
            {isLogin 
              ? 'Sign in to access your account' 
              : 'Join our community of architecture enthusiasts'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={form.first_name}
                    onChange={(e) => setForm({...form, first_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={form.last_name}
                    onChange={(e) => setForm({...form, last_name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {isLogin ? 'Username or Email *' : 'Username *'}
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({...form, username: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                placeholder={isLogin ? 'Enter username or email' : 'Choose a username'}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  required={!isLogin}
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  placeholder="+91 98765 43210"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({...form, password: e.target.value})}
                className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  required={!isLogin}
                />
              </div>
            )}

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
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          {/* Toggle between login and register */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="ml-1 text-black font-medium hover:underline"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>

          {/* Admin login link */}
          <div className="mt-4 text-center">
            <Link
              to="/admin-login"
              className="text-xs text-gray-500 hover:text-black transition-colors"
            >
              Admin Login
            </Link>
          </div>
        </div>

        {/* Features for registered users */}
        {!isLogin && (
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium mb-4">What you get as a member:</h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Access to premium plans
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Download architectural drawings
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Request custom designs
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✓</span>
                Priority support
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLogin;
