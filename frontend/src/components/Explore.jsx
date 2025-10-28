import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();

  const planTypes = [
  { type: '2d', title: '2D Plans', description: 'Precise technical drawings with accurate measurements', image: encodeURI('/images/2D-Plans/2D plan (30_X37_)_.jpg'), route: '/plans/2d' },
  { type: '3d', title: '3D Plans', description: 'Photorealistic 3D renders and visualizations', image: '/images/3D-Plans/hotel-project.jpg', route: '/plans/3d' },
  { type: 'elevation', title: 'Elevation', description: 'Stunning facade designs and architectural elevations', image: '/images/Elevation/Hotel project.jpg', route: '/plans/elevation' },
  { type: 'structural', title: 'Structural Designs', description: 'Complete structural analysis and engineering drawings', image: '/images/structural-designs/SD-1.jpg', route: '/plans/structural' },
  { type: 'vr', title: 'VR Experiences', description: 'Immersive virtual reality architectural experiences', image: '/images/VR/vr-experience.webp', route: '/vr-experience' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Explore Our Plans
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive collection of architectural plans and designs
          </p>
        </div>

        {/* Plan Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {planTypes.map((plan) => (
            <div
              key={plan.type}
              className="group border border-gray-200 overflow-hidden hover:border-black transition-colors cursor-pointer"
              onClick={() => navigate(plan.route)}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-lg mb-1">{plan.title}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 text-sm mb-4">
                  {plan.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-black font-medium text-sm">Explore Now</span>
                  <span className="text-black text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Explore;
