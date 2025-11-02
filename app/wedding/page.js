"use client";

import {
  Heart,
  Camera,
  Users,
  Gift,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { useState, useEffect, useContext } from "react";
import MediaContext from "@/contexts/MediaContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const weddingPackages = [
  {
    title: "Essential Package",
    price: "$2,500",
    description: "Perfect for intimate weddings and smaller celebrations.",
    features: [
      "6 hours coverage",
      "Ceremony & reception",
      "300+ edited photos",
      "Online gallery",
      "Print release",
      "USB drive included",
    ],
  },
  {
    title: "Premium Package",
    price: "$3,500",
    description: "Our most popular package with comprehensive coverage.",
    features: [
      "8 hours coverage",
      "Engagement session",
      "500+ edited photos",
      "Online gallery",
      "Print release",
      "Wedding album",
      "USB drive included",
    ],
  },
  {
    title: "Luxury Package",
    price: "$4,500",
    description: "Complete wedding documentation with premium services.",
    features: [
      "10 hours coverage",
      "Engagement session",
      "700+ edited photos",
      "Second photographer",
      "Online gallery",
      "Premium wedding album",
      "USB drive included",
      "Same-day preview",
    ],
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael",
    wedding: "Garden Wedding, Spring 2024",
    image:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "Oso captured our wedding day perfectly! Every emotion, every detail, every precious moment was beautifully documented. The photos exceeded our expectations and we couldn't be happier. Professional, creative, and so easy to work with.",
    highlight: "Exceeded our expectations",
  },
  {
    id: 2,
    name: "Emma & David",
    wedding: "Beach Wedding, Summer 2024",
    image:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "From our engagement session to the wedding day, Oso made us feel comfortable and captured our love story beautifully. The attention to detail and artistic vision is incredible. We have photos we'll treasure forever.",
    highlight: "Artistic vision is incredible",
  },
  {
    id: 3,
    name: "Jessica & Ryan",
    wedding: "Vineyard Wedding, Fall 2024",
    image:
      "https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "Choosing Oso was the best decision we made for our wedding. The photos are absolutely stunning and capture the joy and love of our special day. Professional, reliable, and incredibly talented.",
    highlight: "Best decision we made",
  },
  {
    id: 4,
    name: "Amanda & Chris",
    wedding: "Mountain Wedding, Winter 2024",
    image:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    rating: 5,
    text: "Oso has an amazing eye for capturing candid moments and emotions. Our wedding photos tell our story perfectly and we love how natural and beautiful they turned out. Highly recommend!",
    highlight: "Amazing eye for candid moments",
  },
];

const types = ["All", "image", "video"];

export default function WeddingPage() {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeType, setActiveType] = useState("All");
  const { mediaItems, loading, error } = useContext(MediaContext);

  const weddingGallery = mediaItems.filter(
    (item) => item.category === "wedding"
  );

  const curatedGallery =
    activeType === "All"
      ? weddingGallery
      : weddingGallery.filter((item) => item.resource_type === activeType);

  const openModal = (media) => {
    setSelectedMedia(media);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMedia(null);
    document.body.style.overflow = "unset";
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  if (loading) return <LoadingSpinner message="Loading Wedding Page..." />;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Wedding
            <br />
            <span className="text-brand-brown-400">Photography</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Capturing the love, joy, and precious moments of your special day
            with artistic elegance
          </p>
        </div>
      </section>

      {/* Curated Photo & Video Gallery */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Wedding <span className="text-[#47240E]">Gallery</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              A curated collection of our finest wedding photography and
              videography showcasing love stories
            </p>
          </div>

          {/* Type Filter */}
          <div className="flex justify-center mb-16">
            <div className="flex gap-4 p-2 bg-white rounded-full shadow-lg">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeType === type
                      ? "bg-[#47240E] text-white shadow-lg"
                      : "text-neutral-600 hover:text-[#47240E] hover:bg-brand-brown-50"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {curatedGallery.map((item) => (
              <div
                key={item._id}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white"
                onClick={() => openModal(item)}
              >
                <div className="aspect-w-4 aspect-h-3 relative">
                  <img
                    src={
                      item.resource_type === "video" ? item.thumbnail : item.url
                    }
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Video Play Button */}
                  {item.resource_type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-4 group-hover:bg-black/70 transition-colors duration-300">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Duration Badge for Videos */}
                  {item.resource_type === "video" && (
                    <div className="absolute bottom-3 right-3 bg-black/90 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-lg">
                      {item.duration}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg ${
                        item.resource_type === "video"
                          ? "bg-red-600 text-white"
                          : "bg-[#47240E] text-white"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-amber-400">{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* No Results - Responsive text */}
          {curatedGallery.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-[#47240E] mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                No media found in this category.
              </h3>
              <p className="text-neutral-600">
                Try selecting a different category to see more content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Media Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {selectedMedia.resource_type === "video" ? (
              <>
                {/* Video Player */}
                <div className="aspect-video w-full bg-black">
                  <iframe
                    src={selectedMedia.videoUrl}
                    title={selectedMedia.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Video Info */}
                <div className="p-6 bg-white">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    {selectedMedia.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-semibold">
                      {selectedMedia.category}
                    </span>
                    <span className="bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      {selectedMedia.duration}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedMedia.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* Photo Display */}
                <div className="flex items-center justify-center min-h-[60vh] max-h-[80vh] bg-black">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    className="max-w-full max-h-[80vh] object-contain"
                  />
                </div>
                {/* Photo Info */}
                <div className="p-6 bg-white">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    {selectedMedia.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full font-semibold">
                      {selectedMedia.category}
                    </span>
                    <span className="flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      <Camera className="h-4 w-4 mr-2" />
                      Wedding Photography
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedMedia.description}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Wedding Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Our Wedding <span className="text-[#47240E]">Process</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              From initial consultation to final delivery, we ensure a seamless
              and stress-free experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <Users className="h-8 w-8 text-[#47240E]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                1. Consultation
              </h3>
              <p className="text-neutral-600">
                We meet to discuss your vision, timeline, and preferences for
                your special day.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <Heart className="h-8 w-8 text-[#47240E]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                2. Engagement Session
              </h3>
              <p className="text-neutral-600">
                A fun pre-wedding shoot to get comfortable with each other and
                capture your love story.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <Camera className="h-8 w-8 text-[#47240E]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                3. Wedding Day
              </h3>
              <p className="text-neutral-600">
                Professional coverage of your ceremony and reception with
                attention to every detail.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
                <Gift className="h-8 w-8 text-[#47240E]" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">
                4. Delivery
              </h3>
              <p className="text-neutral-600">
                Beautifully edited photos delivered within 4-6 weeks via online
                gallery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Happy <span className="text-[#47240E]">Couples</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              What our couples say about their wedding photography experience
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Slider */}
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentTestimonial * 100}%)`,
                }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial._id}
                    className="w-full flex-shrink-0 p-12"
                  >
                    <div className="text-center">
                      {/* Stars */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-6 w-6 text-brand-brown-500 fill-current"
                          />
                        ))}
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xl md:text-2xl text-neutral-700 italic leading-relaxed mb-8">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Highlight */}
                      <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-8 inline-block">
                        {testimonial.highlight}
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center justify-center">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div className="text-left">
                          <h4 className="text-lg font-bold text-neutral-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-neutral-600">
                            {testimonial.wedding}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-neutral-50 text-neutral-700 p-3 rounded-full shadow-lg transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-neutral-50 text-neutral-700 p-3 rounded-full shadow-lg transition-all duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index
                      ? "bg-[#47240E] scale-125"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Packages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Wedding <span className="text-[#47240E]">Packages</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Thoughtfully designed packages to capture every moment of your
              wedding day
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {weddingPackages.map((pkg, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  index === 1
                    ? "bg-amber-50 border-2 border-amber-200 scale-105"
                    : "bg-neutral-50"
                }`}
              >
                {index === 1 && (
                  <div className="text-center mb-4">
                    <span className="bg-[#47240E] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <Heart className="h-12 w-12 text-[#47240E] mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {pkg.title}
                  </h3>
                  <p className="text-3xl font-bold text-[#47240E] mb-4">
                    {pkg.price}
                  </p>
                  <p className="text-neutral-600">{pkg.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-neutral-700"
                    >
                      <div className="w-2 h-2 bg-[#47240E] rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-[#47240E] hover:bg-brand-brown-hover text-white py-3 px-6 rounded-full font-semibold transition-colors duration-200">
                  Choose Package
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
