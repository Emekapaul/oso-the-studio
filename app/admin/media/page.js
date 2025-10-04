"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  FolderOpen,
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Eye,
  Download,
  Share2,
  MoreHorizontal,
  Image,
  Video,
  Heart,
  Camera,
  Plane,
  Briefcase,
  Calendar,
  X,
  Check,
  AlertCircle,
  Star,
  Clock,
  FileImage,
  FileVideo,
  ChevronDown,
  SortAsc,
  SortDesc,
  Plus,
  Upload,
  Loader2,
} from "lucide-react";
import { clientAuth } from "@/lib/auth";
import { set } from "date-fns";

export default function MediaManagerPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteContext, setDeleteContext] = useState(null);
  // Dummy media data
  const [mediaItems, setMediaItems] = useState([]);
  const router = useRouter();

  // Categories and types
  const categories = [
    { value: "all", label: "All Categories", icon: FolderOpen },
    { value: "wedding", label: "Wedding", icon: Heart, color: "text-pink-600" },
    {
      value: "portrait",
      label: "Portrait",
      icon: Camera,
      color: "text-blue-600",
    },
    { value: "drone", label: "Drone", icon: Plane, color: "text-purple-600" },
    {
      value: "commercial",
      label: "Commercial",
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      value: "event",
      label: "Event",
      icon: Calendar,
      color: "text-orange-600",
    },
    {
      value: "corporate",
      label: "Corporate",
      icon: Briefcase,
      color: "text-gray-600",
    },
  ];

  const mediaTypes = [
    { value: "all", label: "All Types" },
    { value: "image", label: "Photos" },
    { value: "video", label: "Videos" },
  ];

  const sortOptions = [
    { value: "date", label: "Date Added" },
    { value: "title", label: "Title" },
    { value: "category", label: "Category" },
    { value: "size", label: "File Size" },
    { value: "views", label: "Views" },
  ];

  // Check authentication
  useEffect(() => {
    if (!clientAuth.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch("/api/get-media"); // backend API to fetch from MongoDB
        if (!res.ok) throw new Error("Failed to fetch media");

        const data = await res.json();
        setMediaItems(data); // data should be an array of media records
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, []);

  // Filter and sort media items
  const filteredAndSortedItems = mediaItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesType =
        selectedType === "all" || item.resource_type === selectedType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = a.category;
          bValue = b.category;
          break;
        case "size":
          aValue = a.size || 0;
          bValue = b.size || 0;
          break;
        case "views":
          aValue = a.views || 0;
          bValue = b.views || 0;
          break;
        case "date":
        default:
          aValue = new Date(a.uploadedAt);
          bValue = new Date(b.uploadedAt);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  // Get category info
  const getCategoryInfo = (categoryValue) => {
    return categories.find((cat) => cat.value === categoryValue);
  };

  // Format file size
  const formatFileSize = (sizeStr) => {
    return sizeStr;
  };

  // Format date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle item selection
  const toggleItemSelection = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  // Handle select all
  const toggleSelectAll = () => {
    if (selectedItems.length === filteredAndSortedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredAndSortedItems.map((item) => item._id));
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    try {
      const res = await fetch("/api/update-media", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingItem), // send updated fields
      });

      const result = await res.json();

      if (result.success) {
        setMediaItems((prev) =>
          prev.map((item) =>
            item._id === editingItem._id ? { ...item, ...editingItem } : item
          )
        );
        setEditingItem(null);
      } else {
        alert("Failed to update item");
        console.error("Update error:", result.error);
      }
    } catch (err) {
      console.error("Update request error:", err);
      alert("Error saving changes");
    }
  };

  // Handle delete
  const handleDelete = (item) => {
    setDeleteContext({ type: "single", item });
    setShowDeleteModal(true);
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;

    const itemsToDelete = mediaItems.filter((item) =>
      selectedItems.includes(item._id)
    );

    setDeleteContext({ type: "bulk", items: itemsToDelete });
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    setDeleting(true);
    try {
      if (deleteContext.type === "single") {
        const item = deleteContext.item;
        const res = await fetch("/api/delete-media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: { id: item._id, public_id: item.public_id },
          }),
        });
        const result = await res.json();
        if (result[0]?.success) {
          setMediaItems((prev) => prev.filter((i) => i._id !== item._id));
        } else {
          alert("Delete failed");
          console.error("Failed to delete:", result[0]?.error);
        }
      } else if (deleteContext.type === "bulk") {
        const items = deleteContext.items.map((i) => ({
          id: i._id,
          public_id: i.public_id,
        }));
        const res = await fetch("/api/delete-media", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });
        const results = await res.json();
        const successfulIds = results.filter((r) => r.success).map((r) => r.id);
        setMediaItems((prev) =>
          prev.filter((i) => !successfulIds.includes(i._id))
        );
        setSelectedItems([]);
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Delete failed.");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
      setDeleteContext(null);
    }
  };

  // Toggle featured status
  const toggleFeatured = (itemId) => {
    setMediaItems((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, featured: !item.featured } : item
      )
    );
  };

  if (isLoading) return <LoadingSpinner message="Loading media manager..." />;

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="flex items-center space-x-2 text-neutral-600 hover:text-warm-brown transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-neutral-300"></div>
              <div className="flex items-center space-x-3">
                <FolderOpen className="h-6 w-6 text-warm-brown" />
                <div>
                  <h1 className="text-lg font-semibold text-neutral-900">
                    Media Manager
                  </h1>
                  <p className="text-sm text-neutral-600">
                    {filteredAndSortedItems.length} items
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => router.push("/admin/upload")}
                className="flex items-center space-x-2 bg-warm-brown hover:bg-warm-brown-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Media</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                />
              </div>

              {/* Quick Filters */}
              <div className="flex space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                >
                  {mediaTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() =>
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                  }
                  className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 transition-colors duration-200"
                >
                  {sortOrder === "asc" ? (
                    <SortAsc className="h-4 w-4 text-neutral-600" />
                  ) : (
                    <SortDesc className="h-4 w-4 text-neutral-600" />
                  )}
                </button>
              </div>

              {/* View Mode Toggle */}
              <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-warm-brown text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-50"
                  } transition-colors duration-200`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 ${
                    viewMode === "table"
                      ? "bg-warm-brown text-white"
                      : "bg-white text-neutral-600 hover:bg-neutral-50"
                  } transition-colors duration-200`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-600">
                  {selectedItems.length} item
                  {selectedItems.length !== 1 ? "s" : ""} selected
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedItems([])}
                    className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                  >
                    Clear Selection
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors duration-200"
                  >
                    Delete {selectedItems.length} Items
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Media Grid/Table */}
        {viewMode === "grid" ? (
          /* Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-all duration-200 group"
              >
                {/* Media Preview */}
                <div className="relative aspect-video bg-neutral-100">
                  {item.resource_type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                      <div className="text-center">
                        <FileVideo className="h-8 w-8 text-neutral-400 mx-auto mb-2" />
                        <p className="text-xs text-neutral-600">
                          {item.duration}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(item.url, "_blank")}
                        className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => toggleItemSelection(item._id)}
                      className="w-4 h-4 text-warm-brown bg-white border-neutral-300 rounded focus:ring-warm-brown focus:ring-2"
                    />
                  </div>

                  {/* Type Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        item.resource_type === "image"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {item.resource_type === "image" ? "Photo" : "Video"}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {item.featured && (
                    <div className="absolute bottom-3 left-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-neutral-900 text-sm line-clamp-2 flex-1">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => toggleFeatured(item._id)}
                      className={`ml-2 p-1 rounded ${
                        item.featured
                          ? "text-yellow-500"
                          : "text-neutral-400 hover:text-yellow-500"
                      } transition-colors duration-200`}
                    >
                      <Star
                        className={`h-4 w-4 ${
                          item.featured ? "fill-current" : ""
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    {(() => {
                      const categoryInfo = getCategoryInfo(item.category);
                      return (
                        <span
                          className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 ${
                            categoryInfo?.color || "text-neutral-600"
                          }`}
                        >
                          {categoryInfo?.icon && (
                            <categoryInfo.icon className="h-3 w-3" />
                          )}
                          <span>{categoryInfo?.label}</span>
                        </span>
                      );
                    })()}
                  </div>

                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{formatDate(item.uploadedAt)}</span>
                    <span>{item.views} views</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedItems.length ===
                            filteredAndSortedItems.length &&
                          filteredAndSortedItems.length > 0
                        }
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-warm-brown bg-white border-neutral-300 rounded focus:ring-warm-brown focus:ring-2"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Media
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {filteredAndSortedItems.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-neutral-50 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => toggleItemSelection(item._id)}
                          className="w-4 h-4 text-warm-brown bg-white border-neutral-300 rounded focus:ring-warm-brown focus:ring-2"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-neutral-100 rounded-lg overflow-hidden mr-3">
                            {item.type === "photo" ? (
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileVideo className="h-6 w-6 text-neutral-400" />
                              </div>
                            )}
                          </div>
                          {item.featured && (
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-neutral-900 max-w-xs truncate">
                          {item.title}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {item.client}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {(() => {
                          const categoryInfo = getCategoryInfo(item.category);
                          return (
                            <span
                              className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 ${
                                categoryInfo?.color || "text-neutral-600"
                              }`}
                            >
                              {categoryInfo?.icon && (
                                <categoryInfo.icon className="h-3 w-3" />
                              )}
                              <span>{categoryInfo?.label}</span>
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            item.resource_type === "image"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {item.resource_type === "image" ? "Photo" : "Video"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {item.size}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {item.views}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-900">
                        {formatDate(item.uploadedAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => window.open(item.url, "_blank")}
                            className="p-1 text-neutral-400 hover:text-warm-brown transition-colors duration-200"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-1 text-neutral-400 hover:text-warm-brown transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="p-1 text-neutral-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredAndSortedItems.length === 0 && (
          <div className="text-center py-16">
            <FolderOpen className="h-16 w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">
              No media found
            </h3>
            <p className="text-neutral-600 mb-6">
              {searchTerm ||
              selectedCategory !== "all" ||
              selectedType !== "all"
                ? "Try adjusting your search or filters"
                : "Upload your first media files to get started"}
            </p>
            <button
              onClick={() => router.push("/admin/upload")}
              className="bg-warm-brown hover:bg-warm-brown-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Upload Media
            </button>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Edit Media
                </h2>
                <button
                  onClick={() => setEditingItem(null)}
                  className="p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Preview */}
              <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden">
                {editingItem.resource_type === "image" ? (
                  <img
                    src={editingItem.url}
                    alt={editingItem.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <FileVideo className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600">
                        {editingItem.title}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingItem.title}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent resize-none"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-semibold text-neutral-900 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    value={editingItem.client}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, client: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-warm-brown focus:border-transparent"
                  />
                </div> */}
                {/* 
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingItem.featured}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        featured: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-warm-brown bg-white border-neutral-300 rounded focus:ring-warm-brown focus:ring-2"
                  />
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-neutral-900"
                  >
                    Featured Media
                  </label>
                </div> */}
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end space-x-3">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-warm-brown hover:bg-warm-brown-700 text-white rounded-lg transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deleteContext && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Delete Media
                </h2>
              </div>

              {deleteContext.type === "single" ? (
                <p className="text-neutral-600 mb-6">
                  Are you sure you want to delete "{deleteContext.item.title}"?
                  This action cannot be undone.
                </p>
              ) : (
                <p className="text-neutral-600 mb-6">
                  Are you sure you want to delete{" "}
                  <strong>{deleteContext.items.length}</strong> selected items?
                  This action cannot be undone.
                </p>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                >
                  {deleting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <span>Delete</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
