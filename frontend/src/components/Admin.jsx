import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [plans, setPlans] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [form, setForm] = useState({ type: '', title: '', price: '', description: '', area: '', features: '' });
  const [file, setFile] = useState(null);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [settings, setSettings] = useState({
    site_title: 'Architectural Drawings',
    contact_email: 'info@archplans.com',
    contact_phone: '+91 98765 43210'
  });

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin-login');
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [plansRes, analyticsRes, settingsRes] = await Promise.all([
        api.get('/plans'),
        api.get('/analytics'),
        api.get('/settings').catch(() => ({ data: settings }))
      ]);
      setPlans(plansRes.data.data || plansRes.data);
      setAnalytics(analyticsRes.data.by_type || analyticsRes.data);
      setSettings(settingsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('type', form.type);
    formData.append('title', form.title);
    formData.append('price', form.price);
    formData.append('description', form.description);
    formData.append('area', form.area);
    formData.append('features', form.features);
    if (file) formData.append('image', file);

    try {
      if (editing) {
        await api.put(`/plans/${editing}`, formData);
      } else {
        await api.post('/plans', formData);
      }
      await fetchData();
      resetForm();
    } catch (error) {
      console.error('Error saving plan:', error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ type: '', title: '', price: '', description: '', area: '', features: '' });
    setFile(null);
    setEditing(null);
  };

  const handleEdit = (plan) => {
    setForm({ 
      type: plan.type, 
      title: plan.title, 
      price: plan.price, 
      description: plan.description,
      area: plan.area || '',
      features: plan.features || ''
    });
    setEditing(plan.id);
    setActiveTab('plans');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      setLoading(true);
      try {
        await api.delete(`/plans/${id}`);
        await fetchData();
      } catch (error) {
        console.error('Error deleting plan:', error);
      }
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPlans.length === 0) return;
    if (window.confirm(`Are you sure you want to delete ${selectedPlans.length} plans?`)) {
      setLoading(true);
      try {
        await api.post('/plans/bulk-delete', { ids: selectedPlans });
        setSelectedPlans([]);
        await fetchData();
      } catch (error) {
        console.error('Error deleting plans:', error);
      }
      setLoading(false);
    }
  };

  const handleSelectPlan = (id) => {
    setSelectedPlans(prev => 
      prev.includes(id) 
        ? prev.filter(planId => planId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    const filteredPlans = getFilteredPlans();
    setSelectedPlans(
      selectedPlans.length === filteredPlans.length 
        ? [] 
        : filteredPlans.map(plan => plan.id)
    );
  };

  const getFilteredPlans = () => {
    return plans.filter(plan => {
      const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === 'all' || plan.type === filterType;
      return matchesSearch && matchesFilter;
    });
  };

  const handleSettingsUpdate = async () => {
    setLoading(true);
    try {
      await api.put('/settings', settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Error updating settings');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'plans', label: 'Plans', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const filteredPlans = getFilteredPlans();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-light text-black">Admin Dashboard</h1>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total Plans</h3>
                <p className="text-3xl font-light text-black">{plans.length}</p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">2D Plans</h3>
                <p className="text-3xl font-light text-black">{analytics['2D'] || 0}</p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">3D Plans</h3>
                <p className="text-3xl font-light text-black">{analytics['3D'] || 0}</p>
              </div>
              <div className="bg-white p-6 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-2">VR Plans</h3>
                <p className="text-3xl font-light text-black">{analytics['VR'] || 0}</p>
              </div>
            </div>

            {/* Recent Plans */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-black">Recent Plans</h2>
              </div>
              <div className="p-6">
                {plans.slice(0, 5).map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                    <div>
                      <h3 className="font-medium text-black">{plan.title}</h3>
                      <p className="text-sm text-gray-500">{plan.type} • {plan.price}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(plan)}
                        className="text-sm text-gray-500 hover:text-black transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-sm text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            {/* Add/Edit Form */}
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-black mb-6">
                {editing ? 'Edit Plan' : 'Add New Plan'}
              </h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select 
                    value={form.type} 
                    onChange={(e) => setForm({...form, type: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="2D-Plans">2D Plans</option>
                    <option value="3D-Plans">3D Plans</option>
                    <option value="Elevation">Elevation</option>
                    <option value="Structural designs">Structural Designs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input 
                    type="text" 
                    placeholder="Plan title" 
                    value={form.title} 
                    onChange={(e) => setForm({...form, title: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
                  <input 
                    type="text" 
                    placeholder="₹1,499" 
                    value={form.price} 
                    onChange={(e) => setForm({...form, price: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                  <input 
                    type="text" 
                    placeholder="2,500 sq ft" 
                    value={form.area} 
                    onChange={(e) => setForm({...form, area: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea 
                    placeholder="Plan description" 
                    value={form.description} 
                    onChange={(e) => setForm({...form, description: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                    rows="3" 
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="Detailed Layout, Accurate Measurements, Room Specifications" 
                    value={form.features} 
                    onChange={(e) => setForm({...form, features: e.target.value})} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <input 
                    type="file" 
                    onChange={(e) => setFile(e.target.files[0])} 
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                    accept="image/*"
                  />
                </div>
                <div className="md:col-span-2 flex space-x-4">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : (editing ? 'Update Plan' : 'Add Plan')}
                  </button>
                  {editing && (
                    <button 
                      type="button" 
                      onClick={resetForm}
                      className="px-6 py-3 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Plans List */}
            <div className="bg-white border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <h2 className="text-lg font-medium text-black">All Plans</h2>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <input
                      type="text"
                      placeholder="Search plans..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    />
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-3 py-2 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    >
                      <option value="all">All Types</option>
                      <option value="2D-Plans">2D Plans</option>
                      <option value="3D-Plans">3D Plans</option>
                      <option value="Elevation">Elevation</option>
                      <option value="Structural designs">Structural Designs</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {selectedPlans.length > 0 && (
                  <div className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {selectedPlans.length} plan(s) selected
                      </span>
                      <button
                        onClick={handleBulkDelete}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                      >
                        Delete Selected
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3">
                          <input
                            type="checkbox"
                            checked={selectedPlans.length === filteredPlans.length && filteredPlans.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-gray-300"
                          />
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">Image</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">Title</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">Type</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">Price</th>
                        <th className="text-left py-3 text-sm font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlans.map((plan) => (
                        <tr key={plan.id} className="border-b border-gray-100">
                          <td className="py-4">
                            <input
                              type="checkbox"
                              checked={selectedPlans.includes(plan.id)}
                              onChange={() => handleSelectPlan(plan.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="py-4">
                            {plan.image_path && (
                              <img 
                                src={plan.image_path} 
                                alt={plan.title}
                                className="w-16 h-12 object-cover border border-gray-200"
                              />
                            )}
                          </td>
                          <td className="py-4">
                            <div>
                              <h3 className="font-medium text-black">{plan.title}</h3>
                              <p className="text-sm text-gray-500">{plan.description}</p>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-gray-600">{plan.type}</td>
                          <td className="py-4 text-sm text-gray-600">{plan.price}</td>
                          <td className="py-4">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(plan)}
                                className="text-sm text-gray-500 hover:text-black transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(plan.id)}
                                className="text-sm text-red-500 hover:text-red-700 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-black mb-4">Plans by Type</h3>
                <div className="space-y-3">
                  {Object.entries(analytics).map(([type, count]) => (
                    <div key={type} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{type}</span>
                      <span className="text-lg font-medium text-black">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-black mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button 
                    onClick={fetchData}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    Refresh Data
                  </button>
                  <button 
                    onClick={() => setActiveTab('plans')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    Add New Plan
                  </button>
                  <button 
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        "Title,Type,Price,Description\n" +
                        plans.map(plan => 
                          `"${plan.title}","${plan.type}","${plan.price}","${plan.description}"`
                        ).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "plans_export.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                  >
                    Export to CSV
                  </button>
                </div>
              </div>
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-black mb-4">System Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Total Plans: <span className="font-medium text-black">{plans.length}</span></div>
                  <div>Last Updated: <span className="font-medium text-black">{new Date().toLocaleDateString()}</span></div>
                  <div>Database: <span className="font-medium text-black">SQLite</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-black mb-4">System Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                  <input 
                    type="text" 
                    value={settings.site_title}
                    onChange={(e) => setSettings({...settings, site_title: e.target.value})}
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input 
                    type="email" 
                    value={settings.contact_email}
                    onChange={(e) => setSettings({...settings, contact_email: e.target.value})}
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input 
                    type="tel" 
                    value={settings.contact_phone}
                    onChange={(e) => setSettings({...settings, contact_phone: e.target.value})}
                    className="w-full p-3 border border-gray-200 focus:border-black focus:outline-none" 
                  />
                </div>
                <button 
                  onClick={handleSettingsUpdate}
                  disabled={loading}
                  className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-black mb-4">Database Management</h3>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => {
                      if (window.confirm('This will export all plans data. Continue?')) {
                        const csvContent = "data:text/csv;charset=utf-8," + 
                          "ID,Title,Type,Price,Description,Area,Features,Created At\n" +
                          plans.map(plan => 
                            `"${plan.id}","${plan.title}","${plan.type}","${plan.price}","${plan.description}","${plan.area || ''}","${plan.features || ''}","${plan.created_at || ''}"`
                          ).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `plans_backup_${new Date().toISOString().split('T')[0]}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    Export Database
                  </button>
                  <button 
                    onClick={() => {
                      if (window.confirm('This will refresh all data from the server. Continue?')) {
                        fetchData();
                      }
                    }}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;