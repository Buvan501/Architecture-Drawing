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
                We are one of the floor plan designing portal in India. Our priorities are customer satisfaction and trust. The joy of having your own home is the reason we are here at 360plot.com, we understand your requirement and want to make your search joyful and happy to help find your perfect home/ plot.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We have a team of experienced civil engineers who can design the best plan for you at the best price and service in India.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

