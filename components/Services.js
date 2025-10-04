import { Camera, Users, Briefcase, Gift } from 'lucide-react';

const services = [
  {
    icon: Camera,
    title: 'Wedding Photography',
    price: 'Starting at $2,500',
    description: 'Complete wedding day coverage with engagement session, ceremony, and reception photography.',
    features: ['8-10 hours coverage', 'Engagement session', '500+ edited photos', 'Online gallery', 'Print release']
  },
  {
    icon: Users,
    title: 'Portrait Sessions',
    price: 'Starting at $350',
    description: 'Professional headshots, family portraits, and personal branding photography sessions.',
    features: ['1-2 hours session', 'Multiple outfit changes', '25+ edited photos', 'Online gallery', 'Print release']
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    price: 'Starting at $800',
    description: 'Professional event coverage for conferences, meetings, and corporate celebrations.',
    features: ['4-6 hours coverage', 'Event documentation', '200+ edited photos', 'Fast turnaround', 'Commercial license']
  },
  {
    icon: Gift,
    title: 'Special Occasions',
    price: 'Starting at $500',
    description: 'Birthday parties, anniversaries, graduations, and other milestone celebrations.',
    features: ['3-4 hours coverage', 'Candid moments', '100+ edited photos', 'Online gallery', 'Print release']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-warm-brown relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            My <span className="text-warm-brown-300">Services</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed px-4">
            Professional photography services tailored to capture your most important moments with style and precision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-neutral-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-neutral-700/50"
            >
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-warm-brown-100 rounded-full mr-4">
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-warm-brown" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-base sm:text-lg font-semibold text-warm-brown-300">{service.price}</p>
                </div>
              </div>
              
              <p className="text-neutral-300 mb-6 leading-relaxed text-sm sm:text-base">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-neutral-300 text-sm sm:text-base">
                    <div className="w-2 h-2 bg-warm-brown rounded-full mr-3 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="mt-8 w-full bg-warm-brown hover:bg-warm-brown-700 text-white py-3 px-6 rounded-full font-semibold transition-colors duration-200">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}