"use client";

import {
  Camera,
  Aperture,
  Image as ImageIcon,
  Users,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useContext } from "react";
import Image from "next/image";
import MediaContext from "@/contexts/MediaContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const photoServices = [
  {
    title: "Portrait Photography",
    price: "Starting at $350",
    description:
      "Professional headshots, family portraits, and personal branding sessions.",
    features: [
      "1-2 hour session",
      "Multiple outfit changes",
      "25+ edited photos",
      "Online gallery",
      "Print release",
    ],
  },
  {
    title: "Commercial Photography",
    price: "Starting at $800",
    description:
      "Product photography, corporate headshots, and business marketing materials.",
    features: [
      "Studio or on-location",
      "Professional lighting setup",
      "High-resolution images",
      "Commercial usage rights",
      "Fast turnaround",
    ],
  },
  {
    title: "Lifestyle Photography",
    price: "Starting at $500",
    description:
      "Authentic lifestyle sessions capturing real moments and genuine emotions.",
    features: [
      "Natural lighting preferred",
      "Candid and posed shots",
      "50+ edited photos",
      "Online gallery",
      "Social media ready",
    ],
  },
];

const categories = ["All", "corporate", "event", "commercial"];

export default function PhotoPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { mediaItems, loading, error } = useContext(MediaContext);

  const portfolioPhotos = mediaItems.filter(
    (item) => item.resource_type === "image"
  );

  const filteredPhotos =
    activeCategory === "All"
      ? portfolioPhotos
      : portfolioPhotos.filter((photo) => photo.category === activeCategory);

  const openLightbox = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "unset";
  };

  const navigatePhoto = (direction) => {
    const currentIndex = filteredPhotos.findIndex(
      (photo) => photo._id === selectedPhoto._id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === filteredPhotos.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    }

    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  if (loading) return <LoadingSpinner message="Loading Photo Page..." />;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section - Mobile optimized */}
      <section className="relative h-64 sm:h-80 lg:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Professional
            <br />
            <span className="text-brand-brown-400">Photography</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Capturing authentic moments and creating stunning portraits that
            tell your unique story
          </p>
        </div>
      </section>

      {/* Photo Gallery - Mobile first masonry grid */}
      <section id="gallery" className="py-12 sm:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Photo <span className="text-brand-brown-600">Gallery</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              A curated collection of our finest photography work across
              different styles and occasions
            </p>
          </div>

          {/* Category Filter - Mobile optimized */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="w-full max-w-4xl overflow-x-auto">
              <div className="flex justify-center gap-2 sm:gap-4 p-2 bg-white rounded-full shadow-lg min-w-max mx-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-brand-brown-600 text-white shadow-lg"
                        : "text-neutral-600 hover:text-brand-brown-600 hover:bg-brand-brown-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Masonry Grid - Responsive columns */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo._id}
                className="break-inside-avoid group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white"
                onClick={() => openLightbox(photo)}
              >
                <div className={`relative ${photo.height}`}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Category Badge - Responsive sizing */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="bg-brand-brown-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                      {photo.category}
                    </span>
                  </div>

                  {/* Hover Overlay - Responsive text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                      <h3 className="text-base sm:text-lg font-bold mb-1">
                        {photo.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-brown-400">
                        {photo.category}
                      </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 sm:p-4">
                        <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results - Responsive text */}
          {filteredPhotos.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                No photos found
              </h3>
              <p className="text-neutral-600">
                Try selecting a different category to see more content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal - Mobile optimized */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-6xl max-h-[90vh] bg-black rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Responsive positioning */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            {/* Navigation Buttons - Hidden on mobile, responsive on larger screens */}
            <button
              onClick={() => navigatePhoto("prev")}
              className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => navigatePhoto("next")}
              className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            {/* Photo - Responsive sizing */}
            <div className="relative w-full h-[75vh] flex items-center justify-center">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Photo Info - Responsive padding and text */}
            <div className="p-4 sm:p-6 bg-black text-white z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                    {selectedPhoto.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-300">
                    <span className="bg-brand-brown-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold">
                      {selectedPhoto.category}
                    </span>
                    <span className="flex items-center">
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      Professional Photography
                    </span>
                  </div>
                </div>
                <div className="text-right text-xs sm:text-sm text-neutral-400">
                  {filteredPhotos.findIndex(
                    (photo) => photo._id === selectedPhoto._id
                  ) + 1}{" "}
                  of {filteredPhotos.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment & Approach Section - Mobile optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 w-full h-64 sm:h-80 lg:h-[600px]">
              <Image
                src="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Professional camera equipment"
                fill
                className="object-cover rounded-xl sm:rounded-2xl shadow-2xl"
                sizes="(max-width: 640px) 100vw,
           (max-width: 1024px) 100vw,
           100vw"
                priority
              />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
                Our <span className="text-brand-brown">Approach</span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-brand-brown mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                      Artistic Vision
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Every shot is carefully composed with attention to
                      lighting, composition, and emotional impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-brand-brown mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                      Personal Connection
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      We take time to understand your vision and create a
                      comfortable environment for authentic moments.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Camera className="h-6 w-6 sm:h-8 sm:w-8 text-brand-brown mr-3 sm:mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                      Technical Excellence
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base">
                      Professional-grade equipment and post-processing
                      techniques ensure the highest quality results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Mobile optimized */}
      <section className="py-12 sm:py-16 lg:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Photography <span className="text-brand-brown">Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive photography services designed to capture your most
              important moments
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {photoServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <Aperture className="h-10 w-10 sm:h-12 sm:w-12 text-brand-brown mx-auto mb-4" />
                  <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-lg font-semibold text-brand-brown">
                    {service.price}
                  </p>
                </div>

                <p className="text-neutral-600 mb-6 leading-relaxed text-center text-sm sm:text-base">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-neutral-700 text-sm sm:text-base"
                    >
                      <div className="w-2 h-2 bg-brand-brown rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-brand-brown hover:bg-brand-brown-hover text-white py-3 px-6 rounded-full font-semibold transition-colors duration-200">
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
