'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! I\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      date: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
            Let's <span className="text-brand-brown">Connect</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            Ready to capture your special moments? Get in touch to discuss your photography needs and let's create something beautiful together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">Get in Touch</h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-brand-brown-100 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-brand-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm sm:text-base">Email</p>
                    <p className="text-neutral-600 text-sm sm:text-base">hello@osothestudio.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-brand-brown-100 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-brand-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm sm:text-base">Phone</p>
                    <p className="text-neutral-600 text-sm sm:text-base">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-brand-brown-100 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-brand-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 text-sm sm:text-base">Location</p>
                    <p className="text-neutral-600 text-sm sm:text-base">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-neutral-200">
              <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4">Why Choose OsoTheStudio?</h4>
              <ul className="space-y-3 text-neutral-600 text-sm sm:text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 flex-shrink-0"></div>
                  Professional equipment and expertise
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 flex-shrink-0"></div>
                  Quick turnaround and delivery
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 flex-shrink-0"></div>
                  Flexible packages and pricing
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 flex-shrink-0"></div>
                  Personalized service and attention
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-neutral-200">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Service Type *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                  >
                    <option value="">Select a service</option>
                    <option value="wedding">Wedding Photography</option>
                    <option value="portrait">Portrait Session</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="special">Special Occasion</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200 text-sm sm:text-base"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200 resize-none text-sm sm:text-base"
                  placeholder="Tell me about your vision and what you're looking for..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-brown hover:bg-brand-brown-700 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center text-sm sm:text-base"
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}