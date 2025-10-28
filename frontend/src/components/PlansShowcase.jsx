import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageWithLoading from './ImageWithLoading';

const PlansShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('2D-Plans');

  // Use the actual drawing-plan images copied into public/images
  const planCategories = {
  '2D-Plans': {
      title: '2D Plans',
      description: 'Precise technical drawings with accurate measurements and layouts',
      icon: '📋',
      plans: [
  { image: '/images/Plans/4358316.jpg', title: 'Modern Floor Plan', area: '2,500 sq ft', price: '₹1,499', features: ['Detailed Layout', 'Accurate Measurements', 'Room Specifications'] },
  { image: '/images/Plans/4a396338-2b0e-494d-b267-599c8b0a2443.jpeg', title: 'Architectural Blueprint', area: '3,200 sq ft', price: '₹1,799', features: ['Structural Details', 'Electrical Layout', 'Plumbing Plan'] },
  { image: '/images/Plans/free-photo-view-of-3d-house-model.jpeg', title: 'House Model Design', area: '2,800 sq ft', price: '₹1,599', features: ['3D Perspective', 'Material Specifications', 'Color Scheme'] }
      ]
    },
    '3D-Plans': {
      title: '3D Plans',
      description: 'Photorealistic 3D renders that bring your vision to life',
      icon: '🏗️',
      plans: [
  { image: '/images/3D-Plans/hotel-project.jpg', title: 'Luxury Hotel Design', area: '15,000 sq ft', price: '₹8,500', features: ['Exterior Rendering', 'Interior Design', 'Landscape Planning'] },
  { image: '/images/3D-Plans/office-building.jpg', title: 'Corporate Office', area: '8,500 sq ft', price: '₹5,200', features: ['Modern Architecture', 'Glass Facade', 'Sustainable Design'] },
  { image: '/images/3D-Plans/residential-building-jpg-1.jpg', title: 'Residential Complex', area: '12,300 sq ft', price: '₹7,200', features: ['Multi-Unit Design', 'Common Areas', 'Parking Solutions'] }
      ]
    },
    'Elevation': {
      title: 'Front Elevation',
      description: 'Stunning facade designs and architectural elevations',
      icon: '🏢',
  plans: [ { image: '/images/Elevation/RB.jpg', title: 'Modern Building Elevation', area: '2,800 sq ft', price: '₹2,200', features: ['Facade Design', 'Material Selection', 'Color Coordination'] } ]
    },
    'Structural designs': {
      title: 'Structural Designs',
      description: 'Complete structural analysis and detailed engineering drawings',
      icon: '📐',
      plans: [
  { image: '/images/structural-designs/SD-1.jpg', title: 'Foundation Design', area: '2,500 sq ft', price: '₹1,200', features: ['Load Calculations', 'Foundation Plan', 'Soil Analysis'] },
  { image: '/images/structural-designs/SD-2.jpg', title: 'Beam Layout', area: '3,200 sq ft', price: '₹1,500', features: ['Structural Framework', 'Load Distribution', 'Safety Standards'] },
  { image: '/images/structural-designs/SD-3.jpg', title: 'Column Details', area: '1,800 sq ft', price: '₹1,000', features: ['Column Design', 'Reinforcement Details', 'Connection Plans'] },
  { image: '/images/structural-designs/SD-4.jpg', title: 'Reinforcement Plan', area: '4,100 sq ft', price: '₹1,800', features: ['Steel Specifications', 'Reinforcement Layout', 'Construction Details'] }
      ]
    }
  };

  const categories = [
    { key: '2D-Plans', label: '2D Plans', icon: '📋' },
    { key: '3D-Plans', label: '3D Plans', icon: '🏗️' },
    { key: 'Elevation', label: 'Elevation', icon: '🏢' },
    { key: 'Structural designs', label: 'Structural Designs', icon: '📐' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Plans
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore our collection of architectural designs
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`px-4 py-2 text-sm font-normal transition-colors ${
                activeCategory === category.key
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>



        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-black text-white py-12 px-6">
            <h3 className="text-2xl md:text-3xl font-light mb-4">Need a Custom Design?</h3>
            <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto">
              Our expert architects can create custom plans tailored to your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
                Start Custom Project
              </button>
              <Link to="/contact">
                <button className="px-6 py-3 bg-transparent text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors">
                  Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansShowcase;
