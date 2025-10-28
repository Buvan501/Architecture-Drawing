const About = () => {

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Company Intro */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-light mb-3">De-Zine Cube</h1>
            <p className="text-base text-gray-600">Design your Dream Space</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gray-200">
              <img 
                src={encodeURI('/images/Placeholder/4358316.jpg')}
                alt="De-Zine Cube"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6">About</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
               We are one of the emerging floor plan design portals in India, dedicated to bringing innovation and reliability to every project we handle. As a young and dynamic company, we believe that every home begins with a thoughtful plan and a clear vision. Our core priorities are customer satisfaction, trust, and quality service.
              </p>
              <p className="text-gray-600 leading-relaxed">
                The joy of owning your dream home is what inspires us every day. We take time to understand your unique requirements and strive to make your experience smooth, joyful, and truly personalized.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                Our team consists of passionate and qualified civil engineers who combine creativity with technical expertise to deliver the best designs at affordable prices. Though we are a fresher company, our enthusiasm, modern approach, and dedication to excellence set us apart. We aim to grow with our clients and build lasting relationships based on trust, transparency, and customer happiness.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

