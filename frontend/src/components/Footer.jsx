import { Link } from 'react-router-dom';

const Footer = () => {
  const services = [
    { name: '2D Plans', href: '/plans/2d', icon: '📋' },
    { name: '3D Plans', href: '/plans/3d', icon: '🏗️' },
    { name: 'Elevation', href: '/plans/elevation', icon: '🏢' },
    { name: 'Structural', href: '/plans/structural', icon: '📐' },
    { name: 'VR Plans', href: '/plans/vr', icon: '🥽' }
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Explore', href: '/explore' },
    { name: 'Contact', href: '/contact' },
    { name: 'Admin', href: '/admin' }
  ];

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Facebook', href: '#', icon: '📘' }
  ];

  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">De-Zine Cube</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Design your Dream Space
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Services</h4>
            <div className="space-y-2">
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.href}
                  className="block text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-medium mb-4 uppercase tracking-wider">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>+91 70104 89833</p>
              <p>dezinecube06@gmail.com</p>
              <p>Salem, India</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 De-Zine Cube</p>
            {/* <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;