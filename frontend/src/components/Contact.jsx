import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', phone: '', projectType: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Message sent successfully! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', message: '', phone: '', projectType: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      title: 'Phone',
      details: '+91 98765 43210',
      description: 'Call us for immediate assistance'
    },
    {
      title: 'Email',
      details: 'info@archplans.com',
      description: 'Send us your project details'
    },
    {
      title: 'Office',
      details: 'Mumbai, India',
      description: 'Visit our design studio'
    },
    {
      title: 'Hours',
      details: 'Mon - Fri: 9AM - 6PM',
      description: 'Weekend consultations available'
    }
  ];

  const projectTypes = [
    'Residential',
    'Commercial',
    'Industrial',
    'Hospitality',
    'Educational',
    'Healthcare',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light mb-4">
            Get In Touch
          </h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Ready to start your architectural project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-8">
            <h2 className="text-2xl font-medium mb-6 text-black">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({...form, projectType: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none text-sm"
                  >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                <textarea
                  placeholder="Tell us about your project requirements..."
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-200 focus:border-black focus:outline-none text-sm h-32 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 text-sm font-medium transition-colors ${
                  isSubmitting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-medium mb-6 text-black">Contact Information</h2>
              <p className="text-base text-gray-600 mb-8">
                We're here to help you bring your architectural vision to life.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className="flex items-start space-x-4 p-6 border border-gray-200 hover:border-black transition-colors"
                >
                  <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-sm font-medium">
                    {info.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black mb-1">{info.title}</h3>
                    <p className="text-base font-medium text-black mb-1">{info.details}</p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Response Promise */}
            <div className="bg-black text-white p-6">
              <h3 className="text-lg font-medium mb-2">Quick Response Promise</h3>
              <p className="text-sm text-gray-300">
                We guarantee a response within 24 hours. For urgent projects, 
                call us directly for immediate assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;