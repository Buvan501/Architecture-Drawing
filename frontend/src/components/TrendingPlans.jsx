import { useState } from 'react';
import Modal from './Modal';
import ImageWithLoading from './ImageWithLoading';

const tabs = [
  { key: 'Structural designs', label: 'Structural Designs' },
  { key: 'Elevation', label: 'Elevation' },
  { key: '3D-Plans', label: '3D Plans' },
  { key: '2D-Plans', label: '2D Plans' }
];

// Use actual drawing plan images copied into public/images
const planData = {
  'Structural designs': [
    { image: '/images/structural-designs/SD-1.jpg', title: 'Foundation Design', type: 'Structural', area: '2,500 sq ft', price: '₹1,200' },
    { image: '/images/structural-designs/SD-2.jpg', title: 'Beam Layout', type: 'Structural', area: '3,200 sq ft', price: '₹1,500' },
    { image: '/images/structural-designs/SD-3.jpg', title: 'Column Details', type: 'Structural', area: '1,800 sq ft', price: '₹1,000' },
    { image: '/images/structural-designs/SD-4.jpg', title: 'Reinforcement Plan', type: 'Structural', area: '4,100 sq ft', price: '₹1,800' }
  ],
  'Elevation': [ { image: '/images/Elevation/RB.jpg', title: 'Modern Facade', type: 'Elevation', area: '2,800 sq ft', price: '₹2,200' } ],
  '3D-Plans': [
    { image: '/images/3D-Plans/hotel-project.jpg', title: 'Luxury Hotel', type: '3D Design', area: '15,000 sq ft', price: '₹8,500' },
    { image: '/images/3D-Plans/hotel-project-jpg-2.jpg', title: 'Hotel Complex', type: '3D Design', area: '18,000 sq ft', price: '₹9,200' },
    { image: '/images/3D-Plans/hotel-project-jpg3.jpg', title: 'Hotel Interior', type: '3D Design', area: '12,000 sq ft', price: '₹7,800' },
    { image: '/images/3D-Plans/office-building.jpg', title: 'Corporate Office', type: '3D Design', area: '8,500 sq ft', price: '₹5,200' },
    { image: '/images/3D-Plans/office-building1.jpg', title: 'Office Complex', type: '3D Design', area: '10,200 sq ft', price: '₹6,100' },
    { image: '/images/3D-Plans/office-building2.jpg', title: 'Business Center', type: '3D Design', area: '9,800 sq ft', price: '₹5,900' },
    { image: '/images/3D-Plans/office-building3.jpg', title: 'Office Tower', type: '3D Design', area: '11,500 sq ft', price: '₹6,800' },
    { image: '/images/3D-Plans/residential-building-jpg-1.jpg', title: 'Apartment Complex', type: '3D Design', area: '12,300 sq ft', price: '₹7,200' },
    { image: '/images/3D-Plans/residential-building-jpg-2.jpg', title: 'Modern Villa', type: '3D Design', area: '3,500 sq ft', price: '₹2,800' },
    { image: '/images/3D-Plans/residential-building-jpg-3.jpg', title: 'Family Home', type: '3D Design', area: '2,800 sq ft', price: '₹2,200' },
    { image: '/images/3D-Plans/santhosh-render-with-ganesh.jpg', title: 'Custom Villa', type: '3D Design', area: '4,200 sq ft', price: '₹3,200' },
    { image: '/images/3D-Plans/santhosh-render-with-ganesh-2.jpg', title: 'Luxury Villa', type: '3D Design', area: '5,100 sq ft', price: '₹3,800' },
    { image: '/images/3D-Plans/santhosh-render-with-ganesh-3.jpg', title: 'Premium Home', type: '3D Design', area: '4,800 sq ft', price: '₹3,600' }
  ],
  '2D-Plans': [
    { image: '/images/Plans/4358316.jpg', title: 'Floor Plan Design', type: '2D Plans', area: '2,500 sq ft', price: '₹1,499' },
    { image: '/images/Plans/4a396338-2b0e-494d-b267-599c8b0a2443.jpeg', title: 'Architectural Plan', type: '2D Plans', area: '3,200 sq ft', price: '₹1,799' },
    { image: '/images/Plans/free-photo-view-of-3d-house-model.jpeg', title: 'House Model View', type: '2D Plans', area: '2,800 sq ft', price: '₹1,599' }
  ]
};

const TrendingPlans = () => {
  const [activeTab, setActiveTab] = useState('Structural designs');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const openModal = (plan) => {
    setSelectedPlan(plan);
    setModalOpen(true);
  };

  return (
    <section className="py-20 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Featured Projects
          </h2>
          <p className="text-base text-gray-400 max-w-2xl mx-auto">
            Discover our most popular architectural solutions
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-normal transition-colors ${
                activeTab === tab.key
                  ? 'text-white border-b-2 border-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planData[activeTab]?.map((plan, index) => (
            <div
              key={index}
              className="group bg-white text-black overflow-hidden hover:bg-gray-50 transition-colors"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <ImageWithLoading
                  src={plan.image}
                  alt={plan.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-black mb-2">
                  {plan.title}
                </h3>
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>{plan.area}</span>
                  <span className="font-medium">{plan.price}</span>
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

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
            Explore Full Portfolio
          </button>
        </div>
      </div>
      
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        image={selectedPlan?.image}
        title={selectedPlan?.title}
        type={selectedPlan?.type}
        area={selectedPlan?.area}
      />
    </section>
  );
};

export default TrendingPlans;