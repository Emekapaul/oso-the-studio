"use client";

import React, { useState, useContext } from "react";
import MediaContext from "@/contexts/MediaContext";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Users,
  Briefcase,
  Plane,
} from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    category: "Wedding",
    type: "photo",
    image:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    title: "Romantic Garden Wedding",
    description:
      "A beautiful outdoor ceremony surrounded by blooming flowers and natural light, capturing the intimate moments between the couple.",
    client: "Sarah & Michael",
    date: "Spring 2024",
    location: "Botanical Gardens, CA",
  },
];

const categories = [
  "All",
  "wedding",
  "portrait",
  "event",
  "drone",
  "commercial",
];
const types = ["All", "image", "video"];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [selectedItem, setSelectedItem] = useState(null);
  const { mediaItems, loading, error } = useContext(MediaContext);

  const filteredItems = mediaItems.filter((item) => {
    const categoryMatch =
      activeCategory === "All" || item.category === activeCategory;
    const typeMatch =
      activeType === "All" || item.resource_type === activeType.toLowerCase();
    return categoryMatch && typeMatch;
  });

  const openModal = (item) => {
    setSelectedItem(item);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = "unset";
  };

  const navigateItem = (direction) => {
    const currentIndex = filteredItems.findIndex(
      (item) => item._id === selectedItem._id
    );
    let newIndex;

    if (direction === "next") {
      newIndex =
        currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex =
        currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    }

    setSelectedItem(filteredItems[newIndex]);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Wedding":
        return <Heart className="h-4 w-4 mr-1" />;
      case "Portrait":
        return <Users className="h-4 w-4 mr-1" />;
      case "Event":
        return <Camera className="h-4 w-4 mr-1" />;
      case "Drone":
        return <Plane className="h-4 w-4 mr-1" />;
      case "Commercial":
        return <Briefcase className="h-4 w-4 mr-1" />;
      default:
        return <Camera className="h-4 w-4 mr-1" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "Wedding":
        return "bg-pink-600";
      case "Portrait":
        return "bg-blue-600";
      case "Event":
        return "bg-green-600";
      case "Drone":
        return "bg-purple-600";
      case "Commercial":
        return "bg-orange-600";
      default:
        return "bg-neutral-600";
    }
  };

  const renderCategoryBadge = (category) => {
    const icon = getCategoryIcon(category);
    const color = getCategoryColor(category);

    return (
      <span
        className={`${color} text-white px-3 py-1 rounded-full font-semibold flex items-center`}
      >
        {icon}
        {category}
      </span>
    );
  };

  if (loading) return <LoadingSpinner message="Loading Portfolio Page..." />;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Our <span className="text-brand-brown-400">Portfolio</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            A comprehensive collection of our photography and videography work
            across all services
          </p>
        </div>
      </section>

      {/* Portfolio Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-16">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4 p-2 bg-white rounded-full shadow-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-brand-brown-600 text-white shadow-lg"
                      : "text-neutral-600 hover:text-brand-brown-600 hover:bg-brand-brown-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <div className="flex gap-4 p-2 bg-white rounded-full shadow-lg">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeType === type
                      ? "bg-neutral-900 text-white shadow-lg"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const CategoryIcon = getCategoryIcon(item.category);
              return (
                <div
                  key={item._id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="aspect-w-4 aspect-h-3 relative">
                    <img
                      src={
                        item.resource_type === "video"
                          ? item.thumbnail
                          : item.url
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

                    {/* Type Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.resource_type === "video"
                            ? "bg-red-600 text-white"
                            : "bg-blue-600 text-white"
                        }`}
                      >
                        {item.resource_type === "video" ? (
                          <>
                            <Play className="inline-block w-3 h-3 mr-1" />
                            Video
                          </>
                        ) : (
                          <>
                            <Camera className="inline-block w-3 h-3 mr-1" />
                            Photo
                          </>
                        )}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`${getCategoryColor(
                          item.category
                        )} text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg flex items-center`}
                      >
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                        <p className="text-sm text-brand-brown-400">
                          {item.category}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results Message */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Camera className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                No items found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your filters to see more content.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-w-7xl max-h-full rounded-2xl shadow-2xl overflow-hidden"
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

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateItem("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Previous item"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => navigateItem("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all duration-200 shadow-lg"
              aria-label="Next item"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Shared Media Container */}
            <div className="flex items-center justify-center bg-black max-h-[80vh]">
              {selectedItem.type === "video" ? (
                <div>
                  {/* Video Player - Responsive aspect ratio */}
                  <div className="aspect-video w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-warm-brown">
                    <iframe
                      src={selectedItem.url}
                      title={selectedItem.title}
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
                          {selectedItem.title}
                        </h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-neutral-600 mb-4">
                          <span className="bg-brand-brown-100 text-brand-brown-800 px-2 sm:px-3 py-1 rounded-full font-semibold">
                            {selectedItem.category}
                          </span>
                          <span className="flex items-center bg-neutral-100 text-neutral-700 px-2 sm:px-3 py-1 rounded-full font-medium">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                            {selectedItem.duration}
                          </span>
                        </div>
                        <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                          {selectedItem.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center min-h-[60vh] max-h-[80vh] bg-black">
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white mb-2">
                      {selectedItem.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-300">
                      <span className="bg-brand-brown-600 text-white px-2 sm:px-3 py-1 rounded-full font-semibold">
                        {selectedItem.category}
                      </span>
                      <span className="flex items-center">
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Professional Photography
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Navigation Info */}
            <div className="p-4">
              <div className="text-right text-sm text-neutral-500 border-t pt-4">
                {filteredItems.findIndex(
                  (item) => item._id === selectedItem._id
                ) + 1}{" "}
                of {filteredItems.length} items
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Ready to Create{" "}
            <span className="text-brand-brown-600">Something Beautiful?</span>
          </h2>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Let's discuss your project and bring your vision to life with
            professional photography and videography.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-brown-600 hover:bg-brand-brown-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Start Your Project
            </button>
            <button className="border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
