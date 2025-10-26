import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/user-login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'user') {
      navigate('/admin-login');
      return;
    }

    setUser(parsedUser);
    fetchUserProfile();
    fetchPlans();
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchPlans = async () => {
    try {
      const response = await api.get('/plans');
      setPlans(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/user-login');
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await api.put('/user/profile', user);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    }
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-4">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-light">User Dashboard</h1>
            <p className="text-sm text-gray-300">Welcome back, {user.first_name}!</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-sm font-normal transition-colors ${
              activeTab === 'profile'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-4 py-2 text-sm font-normal transition-colors ${
              activeTab === 'plans'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Browse Plans
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`px-4 py-2 text-sm font-normal transition-colors ${
              activeTab === 'downloads'
                ? 'text-black border-b-2 border-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            My Downloads
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-medium mb-6">Profile Information</h2>
            
            <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={user.first_name || ''}
                  onChange={(e) => setUser({...user, first_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={user.last_name || ''}
                  onChange={(e) => setUser({...user, last_name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={user.email || ''}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={user.phone || ''}
                  onChange={(e) => setUser({...user, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  value={user.username || ''}
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-sm"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <input
                  type="text"
                  value={user.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
                  className="w-full px-3 py-2 border border-gray-200 bg-gray-50 text-sm"
                  disabled
                />
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-6 py-2 text-sm font-medium transition-colors ${
                    loading
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div>
            <h2 className="text-2xl font-medium mb-6">Available Plans</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="group border border-gray-200 overflow-hidden hover:border-black transition-colors"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img
                        src={plan.image_path || '/images/placeholder.jpg'}
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-black mb-2">
                        {plan.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                        {plan.description}
                      </p>
                      
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">{plan.area || 'N/A'}</span>
                        <span className="text-sm font-medium text-black">{plan.price}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                          Download
                        </button>
                        <button className="flex-1 py-2.5 px-4 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-colors">
                          Request Quote
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Downloads Tab */}
        {activeTab === 'downloads' && (
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-medium mb-6">My Downloads</h2>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">📁</span>
              </div>
              <h3 className="text-lg font-medium text-black mb-2">No Downloads Yet</h3>
              <p className="text-gray-500 mb-6">
                Download plans to see them here
              </p>
              <button
                onClick={() => setActiveTab('plans')}
                className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Browse Plans
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
