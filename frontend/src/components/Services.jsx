import { Link, useNavigate } from 'react-router-dom';

const services = [
  { name: '2D Floor Plans', price: '₹1,499', icon: '📐', route: '/plans/2d', description: 'Precise technical drawings with accurate measurements and layouts', gradient: 'from-blue-500 to-cyan-500', bgImage: encodeURI('/images/2D-Plans/2D plan (30_X37_)_.jpg') },
  { name: '3D Visualizations', price: '₹1,999', icon: '🏗️', route: '/plans/3d', description: 'Photorealistic 3D renders that bring your vision to life', gradient: 'from-purple-500 to-pink-500', bgImage: '/images/3D-Plans/hotel-project.jpg' },
  { name: 'Elevation Designs', price: '₹1,999', icon: '🏢', route: '/plans/elevation', description: 'Stunning facade designs and architectural elevations', gradient: 'from-green-500 to-teal-500', bgImage: encodeURI('/images/Elevation/Hotel project.jpg') },
  { name: 'Structural Engineering', price: '₹1.80/sqft', icon: '📐', route: '/plans/structural', description: 'Complete structural analysis and detailed engineering drawings', gradient: 'from-orange-500 to-red-500', bgImage: '/images/structural-designs/SD-1.jpg' }
];

const Services = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Explore
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            From concept to construction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group border border-gray-200 overflow-hidden hover:border-black transition-colors"
            >
              <div className="p-8">
                <h3 className="text-xl font-medium text-black">
                  {service.name}
                </h3>
              </div>
              
              {/* Service Image Box */}
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={service.bgImage} 
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <Link
                  to={service.route}
                  className="text-sm font-medium text-black hover:underline"
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-black text-white py-16 px-6">
          <h3 className="text-3xl md:text-4xl font-light mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-sm text-gray-400 mb-8 max-w-xl mx-auto">
            Our expert team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/contact')} className="px-6 py-3 bg-transparent text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;