import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use updated placeholder images for hero slideshow
  const heroImages = [
    encodeURI('/images/Placeholder/4358316.jpg'),
    encodeURI('/images/Placeholder/4a396338-2b0e-494d-b267-599c8b0a2443.jpeg'),
    encodeURI('/images/Placeholder/Free Photo _ View of 3d house model.jpeg'),
    encodeURI('/images/Placeholder/WhatsApp Image 2025-10-26 at 19.56.09_d0c1f69d.jpg'),
    encodeURI('/images/Placeholder/WhatsApp Image 2025-10-26 at 19.56.11_d4c48560.jpg'),
    encodeURI('/images/Placeholder/WhatsApp Image 2025-10-26 at 19.56.11_f7390364.jpg')
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
            De-Zine Cube
          </h1>
          
          <p className="text-lg md:text-xl mb-12 text-gray-300">
            Design your Dream Space
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={() => navigate('/explore')} className="px-8 py-3 bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors">
              Explore
            </button>
          </div>
        </div>
      </div>
      
      {/* Dot Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentImageIndex === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;