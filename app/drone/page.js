"use client";

import { useState, useContext } from "react";
import MediaContext from "@/contexts/MediaContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Plane,
  Mountain,
  Building,
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "lucide-react";

const droneServices = [
  {
    title: "Real Estate Aerial",
    price: "Starting at $400",
    description:
      "Stunning aerial photography and videography for real estate marketing and property showcases.",
    features: [
      "High-resolution aerial photos",
      "4K video footage",
      "Property overview shots",
      "Neighborhood context",
      "Fast turnaround",
    ],
  },
  {
    title: "Event Coverage",
    price: "Starting at $600",
    description:
      "Unique aerial perspectives for weddings, festivals, and special events.",
    features: [
      "Ceremony aerial shots",
      "Venue overview footage",
      "Guest arrival coverage",
      "Sunset/sunrise shots",
      "Live streaming capable",
    ],
  },
  {
    title: "Commercial Projects",
    price: "Starting at $800",
    description:
      "Professional aerial content for marketing, construction, and business documentation.",
    features: [
      "Construction progress",
      "Marketing materials",
      "Site surveys",
      "Infrastructure inspection",
      "Custom flight plans",
    ],
  },
];

const categories = [
  "All",
  "Wedding",
  "Corporate",
  "Drone",
  "Event",
  "Commercial",
];

export default function DronePage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { mediaItems, loading, error } = useContext(MediaContext);

  const droneGallery = mediaItems.filter(
    (item) => item.category === "drone" && item.resource_type === "image"
  );

  const droneVideos = mediaItems.filter(
    (item) => item.category === "drone" && item.resource_type === "video"
  );

  const filteredGallery =
    activeCategory === "All"
      ? droneGallery
      : droneGallery.filter((item) => item.category === activeCategory);

  const filteredVideos =
    activeCategory === "All"
      ? droneVideos
      : droneVideos.filter((video) => video.category === activeCategory);

  const openPhotoLightbox = (photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = "hidden";
  };

  const closePhotoLightbox = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = "unset";
  };

  const navigatePhoto = (direction) => {
    const currentIndex = filteredGallery.findIndex(
      (photo) => photo._id === selectedPhoto._id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === filteredGallery.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredGallery.length - 1 : currentIndex - 1;
    }

    setSelectedPhoto(filteredGallery[newIndex]);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Aerial <span className="text-brand-brown-400">Photography</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Capturing breathtaking perspectives from above with professional
            drone photography and videography
          </p>
        </div>
      </section>

      {/* Drone Gallery Section */}
      <section id="gallery" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Aerial <span className="text-[#47240E]">Gallery</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Stunning aerial perspectives showcasing our drone photography
              expertise across different categories
            </p>
          </div>

          {/* Category Filter */}
          {/* <div className="flex justify-center mb-12">
            <div className="flex flex-wrap gap-4 p-2 bg-white rounded-full shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-[#47240E] text-white shadow-lg"
                      : "text-neutral-600 hover:text-[#47240E] hover:bg-brand-brown-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div> */}

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredGallery.map((photo) => (
              <div
                key={photo._id}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer bg-white"
                onClick={() => openPhotoLightbox(photo)}
              >
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#47240E] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                      {photo.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-bold mb-1">{photo.title}</h3>
                      <p className="text-sm text-brand-brown-400">
                        {photo.category}
                      </p>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drone Videos Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Aerial <span className="text-[#47240E]">Videos</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Cinematic drone videography showcasing dynamic aerial perspectives
              and storytelling
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden"
                onClick={() => openVideoModal(video)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={video.url}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#47240E] rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/90 text-white px-3 py-1 rounded-md text-sm font-semibold shadow-lg">
                    {video.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#47240E] text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#47240E] transition-colors duration-200">
                    {video.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={closePhotoLightbox}
        >
          <div
            className="relative max-w-7xl max-h-full bg-black rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePhotoLightbox}
              className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigatePhoto("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigatePhoto("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Photo */}
            <div className="flex items-center justify-center min-h-[60vh] max-h-[80vh]">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Photo Info */}
            <div className="p-6 bg-black text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedPhoto.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-neutral-300">
                    <span className="bg-[#47240E] text-white px-3 py-1 rounded-full font-semibold">
                      {selectedPhoto.category}
                    </span>
                    <span className="flex items-center">
                      <Plane className="h-4 w-4 mr-2" />
                      Drone Photography
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-neutral-400">
                  {filteredGallery.findIndex(
                    (photo) => photo._id === selectedPhoto._id
                  ) + 1}{" "}
                  of {filteredGallery.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeVideoModal}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Close video"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Video Player */}
            <div className="aspect-video w-full bg-black">
              <iframe
                src={selectedVideo.url}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info */}
            <div className="p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-neutral-900 mb-3">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-4">
                    <span className="bg-brand-brown-100 text-brand-brown-800 px-3 py-1 rounded-full font-semibold">
                      {selectedVideo.category}
                    </span>
                    <span className="flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full font-medium">
                      <Clock className="h-4 w-4 mr-2" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Equipment & Safety Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                Professional <span className="text-brand-brown">Equipment</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Camera className="h-8 w-8 text-brand-brown mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      4K Camera Systems
                    </h3>
                    <p className="text-neutral-600">
                      Professional-grade drones equipped with high-resolution
                      cameras and gimbal stabilization.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mountain className="h-8 w-8 text-brand-brown mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      All-Weather Capability
                    </h3>
                    <p className="text-neutral-600">
                      Advanced drones capable of flying in various weather
                      conditions with safety as our priority.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building className="h-8 w-8 text-brand-brown mr-4 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                      Licensed & Insured
                    </h3>
                    <p className="text-neutral-600">
                      FAA Part 107 certified pilot with full commercial
                      insurance coverage for all operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/442587/pexels-photo-442587.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Professional drone equipment"
                className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Regulations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Safety & <span className="text-brand-brown">Compliance</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              We prioritize safety and follow all FAA regulations to ensure
              professional and responsible drone operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Building className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                FAA Certified
              </h3>
              <p className="text-neutral-600">
                Part 107 licensed commercial drone pilot
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Mountain className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Fully Insured
              </h3>
              <p className="text-neutral-600">
                Comprehensive liability and equipment coverage
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Camera className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Pre-Flight Planning
              </h3>
              <p className="text-neutral-600">
                Thorough site assessment and flight planning
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-brown-100 rounded-full mb-4">
                <Plane className="h-8 w-8 text-brand-brown" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-2">
                Safety First
              </h3>
              <p className="text-neutral-600">
                Strict adherence to all safety protocols
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Drone <span className="text-brand-brown">Services</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
              Professional aerial photography and videography services for
              various industries and occasions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {droneServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="text-center mb-6">
                  <Plane className="h-12 w-12 text-brand-brown mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-lg font-semibold text-brand-brown">
                    {service.price}
                  </p>
                </div>

                <p className="text-neutral-600 mb-6 leading-relaxed text-center">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-neutral-700"
                    >
                      <div className="w-2 h-2 bg-brand-brown rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="w-full bg-brand-brown hover:bg-brand-brown-hover text-white py-3 px-6 rounded-full font-semibold transition-colors duration-200">
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
