import React from 'react';

const PlaceholderImages = () => {
  const images = [
    '4358316.jpg',
    '4a396338-2b0e-494d-b267-599c8b0a2443.jpeg',
    'Free Photo _ View of 3d house model.jpeg',
    'WhatsApp Image 2025-10-26 at 19.56.09_d0c1f69d.jpg',
    'WhatsApp Image 2025-10-26 at 19.56.11_d4c48560.jpg',
    'WhatsApp Image 2025-10-26 at 19.56.11_f7390364.jpg',
    'WhatsApp Image 2025-10-26 at 19.56.12_e4d6002b.jpg',
    'WhatsApp Image 2025-10-26 at 19.56.12_ee95bf9c.jpg',
  ];

  return (
    <div className="placeholder-gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={`../DRAWING PLANS/Placeholder/${image}`}
          alt={`Placeholder ${index + 1}`}
          className="placeholder-image"
        />
      ))}
    </div>
  );
};

export default PlaceholderImages;