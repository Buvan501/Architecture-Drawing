import { useEffect, useState } from 'react';
import api from '../utils/api';
import ImageWithLoading from './ImageWithLoading';

const VRExperience = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVR = async () => {
      setLoading(true);
      try {
        const res = await api.get('/plans?type=VR');
        setPlans(res.data.data || res.data || []);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchVR();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            VR Experiences
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Immerse yourself in virtual architectural spaces
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        )}

        {/* VR Plans Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.length > 0 ? (
              plans.map((plan) => (
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
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-black text-white text-xs font-medium">
                        VR Experience
                      </span>
                    </div>
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
                        Open VR
                      </button>
                      <button className="flex-1 py-2.5 px-4 bg-gray-100 text-black text-sm font-medium hover:bg-gray-200 transition-colors">
                        Quote
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🥽</span>
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">No VR Experiences Yet</h3>
                  <p className="text-gray-500 mb-6">
                    We're working on bringing you immersive VR architectural experiences.
                  </p>
                </div>
                
                {/* Sample VR Cards for Demo */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <div className="group border border-gray-200 overflow-hidden hover:border-black transition-colors">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <span className="text-6xl text-gray-400">🏢</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-black mb-2">Modern Office VR</h3>
                      <p className="text-sm text-gray-500 mb-4">Experience office spaces in virtual reality</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group border border-gray-200 overflow-hidden hover:border-black transition-colors">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <span className="text-6xl text-gray-400">🏠</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-black mb-2">Residential VR</h3>
                      <p className="text-sm text-gray-500 mb-4">Walk through homes before they're built</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group border border-gray-200 overflow-hidden hover:border-black transition-colors">
                    <div className="aspect-[4/3] bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <span className="text-6xl text-gray-400">🏨</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-black mb-2">Hotel VR Tour</h3>
                      <p className="text-sm text-gray-500 mb-4">Explore luxury hotel designs virtually</p>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                          Coming Soon
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VRExperience;
