const About = () => {

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] bg-gray-200">
              <img 
                src={encodeURI('/images/Placeholder/4358316.jpg')}
                alt="Our mission"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-light mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                At Architectural Drawings, we are dedicated to creating exceptional architectural designs that blend functionality with aesthetic beauty. Our mission is to transform your ideas into detailed, precise drawings and stunning visualizations that capture the essence of your vision.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that every project deserves meticulous attention to detail, innovative solutions, and professional expertise. Whether you're planning a residential home, commercial space, or large-scale development, we provide comprehensive architectural services tailored to your unique needs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

