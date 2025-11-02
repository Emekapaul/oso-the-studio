"use client";

import { useState, useContext } from "react";
import { Play, Camera, Award, Clock, X } from "lucide-react";
import Image from "next/image";
import MediaContext from "@/contexts/MediaContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const categories = ["All", "corporate", "event", "commercial"];

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { mediaItems, loading, error } = useContext(MediaContext);

  const videoItems = mediaItems.filter(
    (item) => item.resource_type === "video"
  );

  const filteredVideos =
    activeCategory === "All"
      ? videoItems
      : videoItems.filter((video) => video.category === activeCategory);

  const openModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  if (loading) return <LoadingSpinner message="Loading Video Page..." />;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Mobile optimized */}
      <section className="relative h-64 sm:h-80 lg:h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            Video <span className="text-brand-brown-300">Portfolio</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Cinematic storytelling through professional video production and
            creative visual narratives
          </p>
        </div>
      </section>

      {/* Video Gallery - Mobile first responsive design */}
      <section className="py-12 sm:py-16 lg:py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Video <span className="text-[#47240E]">Gallery</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
              A curated collection of our finest video production work
              showcasing cinematic storytelling across different styles and
              occasions
            </p>
          </div>

          {/* Category Filter - Mobile optimized scrollable */}
          <div className="flex justify-center mb-8 sm:mb-12">
            <div className="w-full max-w-4xl overflow-x-auto">
              <div className="flex justify-center gap-2 sm:gap-4 p-2 bg-white rounded-full shadow-lg min-w-max mx-auto">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category
                        ? "bg-[#47240E] text-white shadow-lg"
                        : "text-neutral-600 hover:text-[#47240E] hover:bg-brand-brown-50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Video Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video._id}
                className="group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-neutral-200"
                onClick={() => openModal(video)}
              >
                {/* Thumbnail - Responsive aspect ratio */}
                <div className="relative aspect-video overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                  <Image
                    src={video.url}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
                  />

                  {/* Play Button Overlay - Responsive sizing */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-[#47240E] rounded-full p-3 sm:p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration Badge - Responsive positioning */}
                  <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/90 text-white px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-semibold shadow-lg">
                    {video.duration}
                  </div>

                  {/* Category Badge - Responsive sizing */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                    <span className="bg-[#47240E] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                      {video.category}
                    </span>
                  </div>
                </div>

                {/* Content - Responsive padding and text */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 group-hover:text-[#47240E] transition-colors duration-200 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* No Results - Responsive text */}
          {filteredVideos.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
                No videos found
              </h3>
              <p className="text-neutral-600">
                Try selecting a different category to see more content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal - Mobile optimized */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-brand-brown/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-6xl bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button - Responsive positioning */}
            <button
              onClick={closeModal}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 bg-black/70 hover:bg-black/90 text-white p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Close video"
            >
              <X className="h-4 w-4 sm:h-6 sm:w-6" />
            </button>

            {/* Video Player - Responsive aspect ratio */}
            <div className="aspect-video w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-brand-brown">
              <iframe
                src={selectedVideo.videoUrl}
                title={selectedVideo.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Video Info - Responsive padding and text */}
            <div className="p-4 sm:p-6 bg-white">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1 pr-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">
                    {selectedVideo.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-neutral-600 mb-4">
                    <span className="bg-amber-100 text-amber-800 px-2 sm:px-3 py-1 rounded-full font-semibold">
                      {selectedVideo.category}
                    </span>
                    <span className="flex items-center bg-neutral-100 text-neutral-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                      {selectedVideo.duration}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                    {selectedVideo.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Services Section - Mobile optimized with elegant gradient */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-neutral-900 via-neutral-800 to-brand-brown relative">
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
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              Video <span className="text-brand-brown-300">Services</span>
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed px-4">
              Professional video production services tailored to capture and
              tell your unique story
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-6 sm:p-8 bg-neutral-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-neutral-700/50">
              <Award className="h-10 w-10 sm:h-12 sm:w-12 text-brand-brown-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Wedding Films
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base">
                Cinematic wedding videography that captures every emotion and
                detail of your special day.
              </p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-neutral-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-neutral-700/50">
              <Camera className="h-10 w-10 sm:h-12 sm:w-12 text-brand-brown-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Corporate Videos
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base">
                Professional corporate video production for marketing, training,
                and promotional content.
              </p>
            </div>
            <div className="text-center p-6 sm:p-8 bg-neutral-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl hover:shadow-lg transition-shadow duration-300 border border-neutral-700/50 sm:col-span-2 lg:col-span-1">
              <Play className="h-10 w-10 sm:h-12 sm:w-12 text-brand-brown-300 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                Event Coverage
              </h3>
              <p className="text-neutral-300 text-sm sm:text-base">
                Complete event documentation with multiple camera angles and
                professional editing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
