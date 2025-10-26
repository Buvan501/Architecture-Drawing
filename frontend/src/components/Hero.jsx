import { useState, useEffect } from 'react';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const heroImages = [
    '/images/3D-Plans/Hotel project.jpg',
    '/images/3D-Plans/Office Building.jpg',
    '/images/3D-Plans/Residential Building jpg 1.jpg',
    '/images/3D-Plans/santhosh render with ganesh.jpg',
    '/images/3D-Plans/Hotel project.jpg 2.jpg',
    '/images/3D-Plans/Hotel project.jpg3.jpg',
    '/images/3D-Plans/Office Building1.jpg',
    '/images/3D-Plans/Office Building2.jpg',
    '/images/3D-Plans/Office Building3.jpg',
    '/images/3D-Plans/Residential Building jpg 2.jpg',
    '/images/3D-Plans/Residential Building jpg 3.jpg',
    '/images/3D-Plans/santhosh render with ganesh 2.jpg',
    '/images/3D-Plans/santhosh render with ganesh 3.jpg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Slideshow */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ 
            backgroundImage: `url('${image}')`,
            opacity: currentImageIndex === index ? 1 : 0
          }}
        />
      ))}
      
      {/* Minimal Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="text-center text-white max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
            Architectural Excellence
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Transform your vision into reality
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
              Explore Portfolio
            </button>
            <button className="px-8 py-3 bg-transparent text-white text-sm font-medium border border-white hover:bg-white hover:text-black transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;