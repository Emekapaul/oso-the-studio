import { Camera, Award, Users, Heart } from "lucide-react";

export default function About() {
  const stats = [
    { icon: Camera, number: "500+", label: "Projects Completed" },
    { icon: Award, number: "8+", label: "Years Experience" },
    { icon: Users, number: "300+", label: "Happy Clients" },
    { icon: Heart, number: "1000+", label: "Memories Captured" },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                About <span className="text-brand-brown">Oso</span>
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                With over 8 years of experience in professional photography, I
                specialize in capturing the authentic emotions and precious
                moments that make your story unique. My approach combines
                artistic vision with technical expertise to create timeless
                images that you'll treasure forever.
              </p>
              <p className="text-lg text-neutral-600 leading-relaxed">
                From intimate weddings to corporate events, I believe every
                moment deserves to be preserved with care, creativity, and
                passion. Let's work together to create something beautiful.
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
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
              <p className="text-sm text-neutral-600 italic mb-2">
                "Photography is the art of capturing light, emotion, and time in
                a single frame."
              </p>
              <p className="text-sm font-semibold text-neutral-900">
                - Oso, Photographer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
