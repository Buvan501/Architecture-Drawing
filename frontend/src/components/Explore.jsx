import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Explore = () => {
  const navigate = useNavigate();

  const planTypes = [
    {
      type: '2d',
      title: '2D Plans',
      description: 'Precise technical drawings with accurate measurements',
      image: '/images/Plans/4358316.jpg',
      route: '/plans/2d'
    },
    {
      type: '3d',
      title: '3D Plans',
      description: 'Photorealistic 3D renders and visualizations',
      image: '/images/3D-Plans/Hotel project.jpg',
      route: '/plans/3d'
    },
    {
      type: 'elevation',
      title: 'Elevation',
      description: 'Stunning facade designs and architectural elevations',
      image: '/images/Elevation/RB.jpg',
      route: '/plans/elevation'
    },
    {
      type: 'structural',
      title: 'Structural Designs',
      description: 'Complete structural analysis and engineering drawings',
      image: '/images/Structural designs/SD-1.jpg',
      route: '/plans/structural'
    },
    {
      type: 'vr',
      title: 'VR Experiences',
      description: 'Immersive virtual reality architectural experiences',
      image: '/images/3D-Plans/Office Building.jpg',
      route: '/vr-experience'
    }
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

        {/* Quick Stats */}
        <div className="bg-black text-white py-16 px-6 mb-16">
          <h2 className="text-3xl font-light mb-8 text-center">Why Choose Our Plans?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-light mb-2">500+</div>
              <div className="text-gray-400 text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">15+</div>
              <div className="text-gray-400 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-light mb-2">100%</div>
              <div className="text-gray-400 text-sm">Client Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-light mb-4">Need Help Choosing?</h3>
          <p className="text-base text-gray-600 mb-8 max-w-xl mx-auto">
            Our expert team can help you select the perfect plan for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Get Free Consultation
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-white text-black border border-black text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
