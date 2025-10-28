import React, { useState } from 'react';
import ImageWithLoading from './ImageWithLoading';

const ImageGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('3D-Plans');
  
  // Use the actual DRAWING PLANS images copied into public/images
  const portfolioImages = {
    '3D-Plans': [
  { src: '/images/3D-Plans/hotel-project.jpg', title: 'Luxury Hotel Project', category: '3D Visualization' },
  { src: '/images/3D-Plans/hotel-project-jpg-2.jpg', title: 'Hotel Complex View', category: '3D Visualization' },
  { src: '/images/3D-Plans/hotel-project-jpg3.jpg', title: 'Hotel Interior Design', category: '3D Visualization' },
  { src: '/images/3D-Plans/office-building.jpg', title: 'Modern Office Building', category: '3D Visualization' },
  { src: '/images/3D-Plans/office-building1.jpg', title: 'Corporate Office Complex', category: '3D Visualization' },
  { src: '/images/3D-Plans/office-building2.jpg', title: 'Business Center', category: '3D Visualization' },
  { src: '/images/3D-Plans/office-building3.jpg', title: 'Office Tower', category: '3D Visualization' },
  { src: '/images/3D-Plans/residential-building-jpg-1.jpg', title: 'Residential Complex', category: '3D Visualization' },
  { src: '/images/3D-Plans/residential-building-jpg-2.jpg', title: 'Modern Villa Design', category: '3D Visualization' },
  { src: '/images/3D-Plans/residential-building-jpg-3.jpg', title: 'Family Home Design', category: '3D Visualization' },
  { src: '/images/3D-Plans/santhosh-render-with-ganesh.jpg', title: 'Custom Villa Design', category: '3D Visualization' },
  { src: '/images/3D-Plans/santhosh-render-with-ganesh-2.jpg', title: 'Luxury Villa Exterior', category: '3D Visualization' },
  { src: '/images/3D-Plans/santhosh-render-with-ganesh-3.jpg', title: 'Premium Home Design', category: '3D Visualization' }
    ],
  'Elevation': [
      { src: encodeURI('/images/Elevation/Hotel project.jpg'), title: 'Hotel Project Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Hotel project.jpg 2.jpg'), title: 'Hotel Complex Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Hotel project.jpg3.jpg'), title: 'Hotel Building Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Office Building.jpg'), title: 'Modern Office Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Office Building1.jpg'), title: 'Office Complex Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Office Building2.jpg'), title: 'Corporate Office Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Office Building3.jpg'), title: 'Business Tower Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/RB.jpg'), title: 'Residential Building Elevation', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Residential Building jpg 1.jpg'), title: 'Residential Complex Elevation 1', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Residential Building jpg 2.jpg'), title: 'Residential Complex Elevation 2', category: 'Elevation Design' },
      { src: encodeURI('/images/Elevation/Residential Building jpg 3.jpg'), title: 'Residential Complex Elevation 3', category: 'Elevation Design' }
    ],
    'Structural designs': [
  { src: '/images/structural-designs/SD-1.jpg', title: 'Foundation Design', category: 'Structural Engineering' },
  { src: '/images/structural-designs/SD-2.jpg', title: 'Beam Layout Plan', category: 'Structural Engineering' },
  { src: '/images/structural-designs/SD-3.jpg', title: 'Column Details', category: 'Structural Engineering' },
  { src: '/images/structural-designs/SD-4.jpg', title: 'Reinforcement Plan', category: 'Structural Engineering' }
    ],
    '2D-Plans': [
      { src: encodeURI('/images/2D-Plans/2D plan (30_X37_)_.jpg'), title: '2D Floor Plan 30x37', category: '2D Floor Plans' },
      { src: encodeURI('/images/2D-Plans/2D plan (35_X29_).jpg'), title: '2D Floor Plan 35x29', category: '2D Floor Plans' },
      { src: encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230045.png'), title: '2D Architectural Plan 1', category: '2D Floor Plans' },
      { src: encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230105.png'), title: '2D Architectural Plan 2', category: '2D Floor Plans' },
      { src: encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230115.png'), title: '2D Architectural Plan 3', category: '2D Floor Plans' },
      { src: encodeURI('/images/2D-Plans/Screenshot 2025-10-27 230128.png'), title: '2D Architectural Plan 4', category: '2D Floor Plans' }
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
                <p className="text-sm text-gray-500">{image.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;