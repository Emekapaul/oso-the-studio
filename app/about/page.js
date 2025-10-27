import { Camera, Award, Users, Heart, MapPin, Mail, Phone } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { icon: Camera, number: "500+", label: "Projects Completed" },
    { icon: Award, number: "8+", label: "Years Experience" },
    { icon: Users, number: "300+", label: "Happy Clients" },
    { icon: Heart, number: "1000+", label: "Memories Captured" },
  ];

  const timeline = [
    {
      year: "2016",
      title: "The Beginning",
      description:
        "Started photography as a passion project while studying visual arts in college.",
    },
    {
      year: "2018",
      title: "First Wedding",
      description:
        "Photographed my first wedding for a close friend, discovering my love for capturing love stories.",
    },
    {
      year: "2020",
      title: "Going Professional",
      description:
        "Launched OsoTheStudio and began offering professional photography services full-time.",
    },
    {
      year: "2022",
      title: "Expanding Services",
      description:
        "Added videography and drone services to provide comprehensive visual storytelling.",
    },
    {
      year: "2024",
      title: "Today",
      description:
        "Continuing to capture beautiful moments while constantly evolving and improving my craft.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            About
            <br />
            <span className="text-brand-brown-400">Oso</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            Passionate photographer dedicated to capturing life's most precious
            moments with artistic vision and heart
          </p>
        </div>
      </section>

      {/* Main About Section */}
      <section className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  My <span className="text-brand-brown">Story</span>
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  Photography has been my passion for over 8 years, and it all
                  started with a simple desire to capture the beauty I saw in
                  everyday moments. What began as a hobby quickly evolved into a
                  calling when I realized the power of preserving memories that
                  families would treasure for generations.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                  I specialize in wedding photography, but my love for
                  storytelling extends to portraits, events, and commercial
                  work. Every project is an opportunity to connect with amazing
                  people and create something beautiful together.
                </p>
                <p className="text-lg text-neutral-600 leading-relaxed">
                  When I'm not behind the camera, you can find me exploring new
                  locations, experimenting with different techniques, or
                  spending time with my family. I believe that life's most
                  precious moments deserve to be captured with care, creativity,
                  and genuine emotion.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                      <stat.icon className="h-8 w-8 text-brand-brown" />
                    </div>
                    <div className="text-3xl font-bold text-neutral-900 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-w-4 aspect-h-5">
                <img
                  src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Photographer at work"
                  className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs border border-neutral-200">
                <p className="text-sm text-neutral-600 italic mb-2">
                  "Photography is the art of capturing light, emotion, and time
                  in a single frame."
                </p>
                <p className="text-sm font-semibold text-neutral-900">
                  - Oso, Photographer
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              My <span className="text-brand-brown">Journey</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From passionate beginner to professional photographer - here's how
              my story unfolded
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-brown-200"></div>

            {timeline.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-brown-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                {/* Content */}
                <div
                  className={`w-5/12 ${
                    index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                  }`}
                >
                  <div className="bg-neutral-50 p-6 rounded-2xl shadow-lg border border-neutral-200">
                    <div className="text-2xl font-bold text-brand-brown mb-2">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section with elegant gradient */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Camera equipment and workspace"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                My <span className="text-brand-brown-300">Philosophy</span>
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Authentic Moments
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    I believe the most beautiful photographs happen when people
                    are being themselves. My approach focuses on capturing
                    genuine emotions and natural interactions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Artistic Vision
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    Every image should tell a story. I combine technical
                    expertise with creative vision to create photographs that
                    are both beautiful and meaningful.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Personal Connection
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    Building relationships with my clients is essential. When
                    you feel comfortable and trust me, it shows in the
                    photographs we create together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-warm-brown">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let's <span className="text-brand-brown-300">Connect</span>
          </h2>
          <p className="text-xl text-brand-brown-100 mb-12 leading-relaxed">
            I'd love to hear about your project and discuss how we can create
            something beautiful together
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Mail className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-brand-brown-100">hello@osothestudio.com</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Phone className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-brand-brown-100">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <MapPin className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Location
              </h3>
              <p className="text-brand-brown-100">Los Angeles, CA</p>
            </div>
          </div>

          <button className="bg-white hover:bg-neutral-100 text-brand-brown px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get In Touch
          </button>
        </div>
      </section>
    </div>
  );
}
