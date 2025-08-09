import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/#features' },
      { name: 'Pricing', href: '/pricing' },
      { name: 'API', href: '/api' },
      { name: 'Changelog', href: '/changelog' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    resources: [
      { name: 'Documentation', href: '/docs' },
      { name: 'Help Center', href: '/help' },
      { name: 'Community', href: '/community' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'GDPR', href: '/gdpr' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com/influencore', icon: Twitter },
    { name: 'GitHub', href: 'https://github.com/influencore', icon: Github },
    { name: 'Email', href: 'mailto:hello@influencore.co', icon: Mail },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 text-white hover:text-primary-300 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg p-1"
              >
                <Sparkles className="w-8 h-8" />
                <span className="text-2xl font-bold font-display">Influencore</span>
              </Link>
              
              <p className="mt-4 text-gray-400 max-w-sm leading-relaxed">
                Create viral videos and social media content with the power of AI. 
                Generate professional content in minutes, not hours.
              </p>
              
              <div className="mt-6 flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Sections */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 rounded px-1 py-0.5"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-gray-800">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Stay updated with Influencore
              </h3>
              <p className="text-gray-400 max-w-md">
                Get the latest updates on new features, AI models, and content creation tips.
              </p>
            </div>
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <form className="flex max-w-md">
                <label htmlFor="email-subscription" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-subscription"
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white font-medium rounded-r-lg hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-2 text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-800">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>© {currentYear} Influencore. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Made with</span>
              <Heart className="hidden sm:inline w-4 h-4 text-red-500" />
              <span className="hidden sm:inline">for creators</span>
            </div>
            
            <div className="mt-4 md:mt-0">
              <p className="text-sm text-gray-500">
                Powered by advanced AI technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;