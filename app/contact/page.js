"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock, Award, Users } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    budget: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! I'll get back to you within 24 hours.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      budget: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Let's <span className="text-amber-400">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Ready to capture your special moments? Let's discuss your vision and
            create something beautiful together.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  Get in <span className="text-warm-brown">Touch</span>
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  I'd love to hear about your project and discuss how we can
                  bring your vision to life. Whether it's a wedding, portrait
                  session, or commercial project, let's create something amazing
                  together.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-brown-100 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-warm-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Email</p>
                    <p className="text-neutral-600">hello@osothestudio.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-brown-100 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-warm-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Phone</p>
                    <p className="text-neutral-600">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-warm-brown-100 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-warm-brown" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Location</p>
                    <p className="text-neutral-600">Los Angeles, CA</p>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
                <h3 className="text-xl font-bold text-neutral-900 mb-6">
                  Why Choose OsoTheStudio?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Award className="h-6 w-6 text-warm-brown mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        Professional Excellence
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        8+ years of experience with professional equipment and
                        expertise
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-warm-brown mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        Quick Turnaround
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Fast editing and delivery without compromising quality
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-warm-brown mr-3 mt-1" />
                    <div>
                      <h4 className="font-semibold text-neutral-900">
                        Personal Approach
                      </h4>
                      <p className="text-neutral-600 text-sm">
                        Personalized service and attention to your unique vision
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-warm-brown-50 p-6 rounded-2xl border border-warm-brown-200">
                <div className="flex items-center mb-3">
                  <Clock className="h-6 w-6 text-warm-brown mr-3" />
                  <h3 className="text-lg font-semibold text-neutral-900">
                    Response Time
                  </h3>
                </div>
                <p className="text-neutral-700">
                  I typically respond to all inquiries within 24 hours. For
                  urgent requests, feel free to call directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-neutral-200">
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Service Type *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select a service</option>
                      <option value="wedding">Wedding Photography</option>
                      <option value="portrait">Portrait Session</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="drone">Drone Services</option>
                      <option value="video">Video Production</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold text-neutral-900 mb-2"
                    >
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1000">Under $1,000</option>
                      <option value="1000-2500">$1,000 - $2,500</option>
                      <option value="2500-5000">$2,500 - $5,000</option>
                      <option value="5000-plus">$5,000+</option>
                      <option value="discuss">Let's discuss</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-neutral-900 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent transition-colors duration-200 resize-none"
                    placeholder="Tell me about your vision, event details, or any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-warm-brown hover:bg-warm-brown-700 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section with elegant gradient */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-warm-brown relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked{" "}
              <span className="text-warm-brown-300">Questions</span>
            </h2>
            <p className="text-xl text-neutral-300 leading-relaxed">
              Quick answers to common questions about our photography services
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">
                How far in advance should I book?
              </h3>
              <p className="text-neutral-300">
                For weddings, I recommend booking 6-12 months in advance. For
                other sessions, 2-4 weeks notice is usually sufficient, though I
                can often accommodate shorter notice depending on availability.
              </p>
            </div>

            <div className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">
                What's included in your packages?
              </h3>
              <p className="text-neutral-300">
                All packages include professional editing, an online gallery for
                easy sharing, and print release. Specific inclusions vary by
                package - please see individual service pages for detailed
                information.
              </p>
            </div>

            <div className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">
                Do you travel for shoots?
              </h3>
              <p className="text-neutral-300">
                Yes! I'm based in Los Angeles but love to travel for destination
                weddings and special projects. Travel fees may apply depending
                on the location and duration.
              </p>
            </div>

            <div className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-2xl border border-neutral-700/50">
              <h3 className="text-lg font-semibold text-white mb-3">
                How long until I receive my photos?
              </h3>
              <p className="text-neutral-300">
                Turnaround time varies by service: weddings typically take 4-6
                weeks, portrait sessions 1-2 weeks, and events 2-3 weeks. Rush
                delivery is available for an additional fee.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
