import React, { useState } from 'react';
import ImageWithLoading from './ImageWithLoading';

const ImageGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('3D-Plans');
  
  const portfolioImages = {
    '3D-Plans': [
      {
        src: '/images/3D-Plans/Hotel project.jpg',
        title: 'Luxury Hotel Project',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Hotel project.jpg 2.jpg',
        title: 'Hotel Complex View',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Hotel project.jpg3.jpg',
        title: 'Hotel Interior Design',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Office Building.jpg',
        title: 'Modern Office Building',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Office Building1.jpg',
        title: 'Corporate Office Complex',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Office Building2.jpg',
        title: 'Business Center',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Office Building3.jpg',
        title: 'Office Tower',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Residential Building jpg 1.jpg',
        title: 'Residential Complex',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Residential Building jpg 2.jpg',
        title: 'Modern Villa Design',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/Residential Building jpg 3.jpg',
        title: 'Family Home Design',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/santhosh render with ganesh.jpg',
        title: 'Custom Villa Design',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/santhosh render with ganesh 2.jpg',
        title: 'Luxury Villa Exterior',
        category: '3D Visualization'
      },
      {
        src: '/images/3D-Plans/santhosh render with ganesh 3.jpg',
        title: 'Premium Home Design',
        category: '3D Visualization'
      }
    ],
    'Elevation': [
      {
        src: '/images/Elevation/RB.jpg',
        title: 'Modern Building Elevation',
        category: 'Elevation Design'
      }
    ],
    'Structural designs': [
      {
        src: '/images/Structural designs/SD-1.jpg',
        title: 'Foundation Design',
        category: 'Structural Engineering'
      },
      {
        src: '/images/Structural designs/SD-2.jpg',
        title: 'Beam Layout Plan',
        category: 'Structural Engineering'
      },
      {
        src: '/images/Structural designs/SD-3.jpg',
        title: 'Column Details',
        category: 'Structural Engineering'
      },
      {
        src: '/images/Structural designs/SD-4.jpg',
        title: 'Reinforcement Plan',
        category: 'Structural Engineering'
      }
    ],
    '2D-Plans': [
      {
        src: '/images/Plans/4358316.jpg',
        title: 'Floor Plan Design',
        category: '2D Floor Plans'
      },
      {
        src: '/images/Plans/4a396338-2b0e-494d-b267-599c8b0a2443.jpeg',
        title: 'Architectural Plan',
        category: '2D Floor Plans'
      },
      {
        src: '/images/Plans/Free Photo _ View of 3d house model.jpeg',
        title: 'House Model View',
        category: '2D Floor Plans'
      }
    ]
  };

  const categories = [
    { key: '3D-Plans', label: '3D Plans' },
    { key: '2D-Plans', label: '2D Plans' },
    { key: 'Elevation', label: 'Elevation' },
    { key: 'Structural designs', label: 'Structural Designs' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Portfolio
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Explore our collection of architectural designs
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 py-2 text-sm font-normal transition-colors ${
                selectedCategory === category.key
                  ? 'text-black border-b-2 border-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioImages[selectedCategory]?.map((image, index) => (
            <div
              key={index}
              className="group border border-gray-200 overflow-hidden hover:border-black transition-colors"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <ImageWithLoading
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-black mb-2">
                  {image.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{image.category}</p>
                <button className="w-full py-2.5 px-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;