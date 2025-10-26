const highlights = [
  { number: '7K+', text: 'Plans Delivered' },
  { number: 'Certified Engineers & Architects', text: '' },
  { number: 'Best Price in Market', text: '' },
  { number: 'Timely Delivery', text: '' },
];

const PanIndiaPresence = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">PAN India Presence</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{highlight.number}</div>
              <p className="text-gray-700">{highlight.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PanIndiaPresence;