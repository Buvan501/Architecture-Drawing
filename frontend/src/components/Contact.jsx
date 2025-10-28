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

        <div className="max-w-4xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white border border-gray-200 p-8 mb-20">
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

          {/* Team Members Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light mb-4">Our Team</h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                Meet the experts who will bring your vision to life
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { name: 'Rajesh Kumar', role: 'Lead Architect', email: 'rajesh@archplans.com', phone: '+91 98765 43210' },
                { name: 'Priya Sharma', role: 'Senior Designer', email: 'priya@archplans.com', phone: '+91 98765 43211' },
                { name: 'Amit Patel', role: 'Structural Engineer', email: 'amit@archplans.com', phone: '+91 98765 43212' },
                { name: 'Sneha Reddy', role: '3D Specialist', email: 'sneha@archplans.com', phone: '+91 98765 43213' },
                { name: 'Vikram Singh', role: 'Project Manager', email: 'vikram@archplans.com', phone: '+91 98765 43214' },
                { name: 'Kavya Menon', role: 'Design Consultant', email: 'kavya@archplans.com', phone: '+91 98765 43215' }
              ].map((person, index) => (
                <div
                  key={index}
                  className="border border-gray-200 p-6 hover:border-black transition-colors"
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-2xl font-medium text-gray-600 mb-4">
                      {person.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-medium text-black mb-1">{person.name}</h3>
                    <p className="text-sm text-gray-500">{person.role}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Email:</span> {person.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span> {person.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;