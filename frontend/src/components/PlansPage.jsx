import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import ImageWithLoading from './ImageWithLoading';

const PlansPage = () => {
  const { type } = useParams();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, [type]);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/plans?type=${type}`);
      const plansData = response.data.data || response.data;
      setPlans(plansData);
      setFilteredPlans(plansData);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setFilteredPlans(plans.filter(plan => 
      plan.title.toLowerCase().includes(search.toLowerCase()) ||
      plan.description.toLowerCase().includes(search.toLowerCase())
    ));
  }, [search, plans]);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  const getTypeDisplayName = (type) => {
    const typeMap = {
      '2d': '2D Plans',
      '3d': '3D Plans', 
      'elevation': 'Elevation',
      'structural': 'Structural Designs',
      'vr': 'VR Plans'
    };
    return typeMap[type.toLowerCase()] || type.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            {getTypeDisplayName(type)}
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore our collection of {getTypeDisplayName(type).toLowerCase()}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-200 focus:border-black focus:outline-none text-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        {/* Plans Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="group border border-gray-200 overflow-hidden hover:border-black transition-colors"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ImageWithLoading
                    src={plan.image_path || '/images/Placeholder/placeholder.svg'}
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
                  
                  <button
                    onClick={() => openModal(plan)}
                    className="w-full py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No plans found</p>
            <p className="text-sm text-gray-400">
              {search ? 'Try adjusting your search terms' : 'Check back later for new plans'}
            </p>
          </div>
        )}

        {/* Modal */}
        {modalOpen && selectedPlan && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setModalOpen(false)}
          >
            <div
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-medium text-black">{selectedPlan.title}</h2>
                  <p className="text-gray-500 text-sm">{getTypeDisplayName(type)}</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative max-h-[60vh] overflow-hidden">
                <ImageWithLoading
                  src={selectedPlan.image_path}
                  alt={selectedPlan.title}
                  className="w-full h-auto max-h-[60vh] object-contain bg-gray-50"
                />
              </div>

              <div className="p-6 bg-gray-50">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{selectedPlan.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Area: {selectedPlan.area || 'N/A'}</span>
                      <span>Price: {selectedPlan.price}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-6 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                      Download
                    </button>
                    <button className="px-6 py-2 bg-white text-black border border-black text-sm font-medium hover:bg-gray-50 transition-colors">
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlansPage;