"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Upload,
  X,
  Image,
  Video,
  Camera,
  Plane,
  Heart,
  Briefcase,
  Calendar,
  Check,
  AlertCircle,
  FileImage,
  FileVideo,
  Loader2,
  ArrowLeft,
  Plus,
  Trash2,
} from "lucide-react";
import { clientAuth } from "@/lib/auth";
// import { clientMediaStorage } from '@/lib/mediaStorage';

export default function MediaUploadPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [uploadFiles, setUploadFiles] = useState([]);
  const [uploadMode, setUploadMode] = useState("file"); // 'file' or 'url'
  const [urlInput, setUrlInput] = useState("");
  const [urlType, setUrlType] = useState("photo");
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [uploadResults, setUploadResults] = useState([]);
  const fileInputRef = useRef(null);
  const router = useRouter();

  // Form state for each file
  const [fileData, setFileData] = useState({});

  // Categories and types
  const mediaTypes = [
    { value: "photo", label: "Photo", icon: Image },
    { value: "video", label: "Video", icon: Video },
  ];

  const categories = [
    { value: "wedding", label: "Wedding", icon: Heart, color: "text-pink-600" },
    { value: "drone", label: "Drone", icon: Plane, color: "text-purple-600" },
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

  // Check authentication
  useEffect(() => {
    if (!clientAuth.isAuthenticated()) {
      router.push("/admin/login");
      return;
    }
    setIsLoading(false);
  }, [router]);

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle file input change
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Process selected files
  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      return isImage || isVideo;
    });

    const newFiles = validFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : null,
      type: file.type.startsWith("image/") ? "photo" : "video",
      size: file.size,
      name: file.name,
    }));

    setUploadFiles((prev) => [...prev, ...newFiles]);

    // Initialize form data for new files
    const newFileData = {};
    newFiles.forEach((fileObj) => {
      newFileData[fileObj.id] = {
        title: fileObj.name.replace(/\.[^/.]+$/, ""), // Remove extension
        category: "",
        description: "",
        tags: [],
      };
    });
    setFileData((prev) => ({ ...prev, ...newFileData }));
  };

  // Remove file
  const removeFile = (fileId) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== fileId));
    setFileData((prev) => {
      const newData = { ...prev };
      delete newData[fileId];
      return newData;
    });
  };

  // Update file data
  const updateFileData = (fileId, field, value) => {
    setFileData((prev) => ({
      ...prev,
      [fileId]: {
        ...prev[fileId],
        [field]: value,
      },
    }));
  };

  // Add tag
  const addTag = (fileId, tag) => {
    if (tag.trim() && !fileData[fileId]?.tags.includes(tag.trim())) {
      updateFileData(fileId, "tags", [
        ...(fileData[fileId]?.tags || []),
        tag.trim(),
      ]);
    }
  };

  // Remove tag
  const removeTag = (fileId, tagIndex) => {
    const currentTags = fileData[fileId]?.tags || [];
    const newTags = currentTags.filter((_, index) => index !== tagIndex);
    updateFileData(fileId, "tags", newTags);
  };

  // Add URL as file
  const addUrlAsFile = () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(urlInput);
    } catch {
      alert("Please enter a valid URL");
      return;
    }

    const urlFileObj = {
      id: Math.random().toString(36).substr(2, 9),
      file: null,
      url: urlInput,
      preview: urlType === "photo" ? urlInput : null,
      type: urlType,
      size: 0,
      name: urlInput.split("/").pop() || "External URL",
      isUrl: true,
    };

    setUploadFiles((prev) => [...prev, urlFileObj]);

    // Initialize form data
    setFileData((prev) => ({
      ...prev,
      [urlFileObj.id]: {
        title: urlFileObj.name.replace(/\.[^/.]+$/, ""),
        category: "",
        description: "",
        tags: [],
      },
    }));

    // Clear URL input
    setUrlInput("");
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Get category info
  const getCategoryInfo = (categoryValue) => {
    return categories.find((cat) => cat.value === categoryValue);
  };

  // Validate form
  const validateForm = () => {
    for (const fileObj of uploadFiles) {
      const data = fileData[fileObj.id];
      if (!data?.title?.trim()) {
        alert(`Please enter a title for ${fileObj.name}`);
        return false;
      }
      if (!data?.category) {
        alert(`Please select a category for ${fileObj.name}`);
        return false;
      }
    }
    return true;
  };

  // Handle upload

  const handleUpload = async () => {
    if (!validateForm()) return;
    setUploading(true);
    setUploadResults([]);

    try {
      for (const fileObj of uploadFiles) {
        const data = fileData[fileObj.id];
        console.log("Data", data);

        // Step 1: get signature from backend
        const signRes = await fetch("/api/sign-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const { signature, timestamp, folder, ...meta } = await signRes.json();
        console.log("meta from sign-upload:", meta);

        // Step 2: upload file directly to Cloudinary
        const formData = new FormData();
        formData.append("file", fileObj.file);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: "POST", body: formData }
        );
        const uploaded = await cloudRes.json();

        // Step 3: save metadata + Cloudinary response in Mongo
        const mediaRecord = {
          public_id: uploaded.public_id,
          url: uploaded.secure_url,
          format: uploaded.format,
          resource_type: uploaded.resource_type,
          width: uploaded.width,
          height: uploaded.height,
          duration: uploaded.duration || null,
          size: uploaded.bytes,
          // your custom fields
          title: meta.title,
          description: meta.description,
          category: meta.category,
          tags: meta.tags,
          uploadedAt: new Date().toISOString(),
        };
        await fetch("/api/save-media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mediaRecord),
        });

        setUploadResults((prev) => [
          ...prev,
          {
            id: fileObj.id,
            name: fileObj.name,
            title: data.title,
            category: data.category,
            type: uploaded.resource_type,
            url: uploaded.secure_url,
            success: true,
            message: "Upload successful",
          },
        ]);
      }

      // Reset form
      setTimeout(() => {
        setUploadFiles([]);
        setFileData({});
        setUploadProgress({});
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) return <LoadingSpinner message="Loading upload manager..." />;

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="flex items-center space-x-2 text-neutral-600 hover:text-brand-brown transition-colors duration-200"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-neutral-300"></div>
              <div className="flex items-center space-x-3">
                <Upload className="h-6 w-6 text-brand-brown" />
                <div>
                  <h1 className="text-lg font-semibold text-neutral-900">
                    Media Upload
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Add new photos and videos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Area */}
        <div className="mb-8">
          {/* Upload Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="flex border border-neutral-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setUploadMode("file")}
                className={`px-6 py-3 font-medium transition-colors duration-200 ${
                  uploadMode === "file"
                    ? "bg-brand-brown text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Upload className="h-4 w-4 inline mr-2" />
                Upload Files
              </button>
              <button
                onClick={() => setUploadMode("url")}
                className={`px-6 py-3 font-medium transition-colors duration-200 ${
                  uploadMode === "url"
                    ? "bg-brand-brown text-white"
                    : "bg-white text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                Add URL
              </button>
            </div>
          </div>

          {uploadMode === "file" ? (
            /* File Upload Area */
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive
                  ? "border-brand-brown bg-brand-brown-50"
                  : "border-neutral-300 hover:border-brand-brown hover:bg-neutral-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="p-4 bg-brand-brown-100 rounded-full">
                    <Upload className="h-8 w-8 text-brand-brown" />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Drop files here or click to browse
                  </h3>
                  <p className="text-neutral-600 mb-4">
                    Support for images (JPG, PNG, GIF) and videos (MP4, MOV,
                    AVI)
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-brand-brown hover:bg-brand-brown-hover text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    Select Files
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* URL Input Area */
            <div className="bg-white border-2 border-neutral-300 rounded-xl p-8">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-brand-brown-100 rounded-full">
                      <Plus className="h-8 w-8 text-brand-brown" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Add Media from URL
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Enter a direct URL to an image or video file
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Media Type Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Media Type
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setUrlType("photo")}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          urlType === "photo"
                            ? "border-brand-brown bg-brand-brown-50 text-brand-brown"
                            : "border-neutral-300 hover:border-brand-brown"
                        }`}
                      >
                        <Image className="h-4 w-4" />
                        <span>Photo</span>
                      </button>
                      <button
                        onClick={() => setUrlType("video")}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                          urlType === "video"
                            ? "border-brand-brown bg-brand-brown-50 text-brand-brown"
                            : "border-neutral-300 hover:border-brand-brown"
                        }`}
                      >
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </button>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div>
                    <label className="block text-sm font-semibold text-neutral-900 mb-2">
                      Media URL
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder={
                          urlType === "photo"
                            ? "https://example.com/image.jpg"
                            : "https://example.com/video.mp4"
                        }
                        className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                      />
                      <button
                        onClick={addUrlAsFile}
                        className="bg-brand-brown hover:bg-brand-brown-hover text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                      >
                        Add URL
                      </button>
                    </div>
                  </div>

                  {/* URL Guidelines */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      URL Guidelines:
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Use direct links to image or video files</li>
                      <li>• Supported formats: JPG, PNG, GIF, MP4, MOV, AVI</li>
                      <li>• Make sure the URL is publicly accessible</li>
                      <li>
                        • YouTube/Vimeo embed URLs are supported for videos
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* File List */}
      {uploadFiles.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-neutral-900">
              Files to Upload ({uploadFiles.length})
            </h2>
            <button
              onClick={handleUpload}
              disabled={uploading || uploadFiles.length === 0}
              className="bg-brand-brown hover:bg-brand-brown-hover disabled:bg-neutral-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              {uploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload All</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {uploadFiles.map((fileObj) => {
              const data = fileData[fileObj.id] || {};
              const progress = uploadProgress[fileObj.id];
              const result = uploadResults.find((r) => r.id === fileObj.id);

              return (
                <div
                  key={fileObj.id}
                  className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
                >
                  {/* File Preview */}
                  <div className="relative h-48 bg-neutral-100">
                    {fileObj.type === "photo" ? (
                      fileObj.isUrl ? (
                        <img
                          src={fileObj.url}
                          alt={fileObj.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : (
                        <img
                          src={fileObj.preview}
                          alt={fileObj.name}
                          className="w-full h-full object-cover"
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                          <FileVideo className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                          <p className="text-sm text-neutral-600 px-2 truncate">
                            {fileObj.name}
                          </p>
                          {fileObj.isUrl && (
                            <p className="text-xs text-neutral-500 mt-1">
                              External URL
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Fallback for broken image URLs */}
                    {fileObj.isUrl && fileObj.type === "photo" && (
                      <div className="w-full h-full items-center justify-center hidden">
                        <div className="text-center">
                          <FileImage className="h-12 w-12 text-neutral-400 mx-auto mb-2" />
                          <p className="text-sm text-neutral-600 px-2">
                            Image URL
                          </p>
                          <p className="text-xs text-neutral-500 mt-1">
                            Preview unavailable
                          </p>
                        </div>
                      </div>
                    )}

                    {/* File Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          fileObj.isUrl
                            ? "bg-green-100 text-green-800"
                            : fileObj.type === "photo"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {fileObj.isUrl
                          ? "URL"
                          : fileObj.type === "photo"
                          ? "Photo"
                          : "Video"}
                      </span>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFile(fileObj.id)}
                      className="absolute top-3 right-3 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>

                    {/* Upload Progress */}
                    {progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50">
                        <div className="h-2 bg-neutral-200">
                          <div
                            className="h-full bg-brand-brown transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="p-2 text-center">
                          <span className="text-white text-sm font-medium">
                            {progress}%
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Upload Result */}
                    {result && (
                      <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                        <div className="text-center text-white">
                          {result.success ? (
                            <>
                              <Check className="h-8 w-8 text-green-400 mx-auto mb-2" />
                              <p className="font-medium">Upload Successful</p>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                              <p className="font-medium">Upload Failed</p>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* File Details Form */}
                  <div className="p-6 space-y-4">
                    {/* File Info */}
                    <div className="flex items-center justify-between text-sm text-neutral-600">
                      <span>{fileObj.name}</span>
                      <span>
                        {fileObj.isUrl
                          ? "External URL"
                          : formatFileSize(fileObj.size)}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        value={data.title || ""}
                        onChange={(e) =>
                          updateFileData(fileObj.id, "title", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                        placeholder="Enter a descriptive title"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Category *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            onClick={() =>
                              updateFileData(
                                fileObj.id,
                                "category",
                                category.value
                              )
                            }
                            className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                              data.category === category.value
                                ? "border-brand-brown bg-brand-brown-50"
                                : "border-neutral-200 hover:border-brand-brown hover:bg-neutral-50"
                            }`}
                          >
                            <category.icon
                              className={`h-4 w-4 ${category.color}`}
                            />
                            <span className="text-sm font-medium">
                              {category.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Description
                      </label>
                      <textarea
                        value={data.description || ""}
                        onChange={(e) =>
                          updateFileData(
                            fileObj.id,
                            "description",
                            e.target.value
                          )
                        }
                        rows={3}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent resize-none"
                        placeholder="Optional description or notes about this media"
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-900 mb-2">
                        Tags
                      </label>
                      <div className="space-y-2">
                        {/* Tag Input */}
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            placeholder="Add a tag and press Enter"
                            className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brand-brown focus:border-transparent"
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag(fileObj.id, e.target.value);
                                e.target.value = "";
                              }
                            }}
                          />
                          <button
                            onClick={(e) => {
                              const input = e.target.previousElementSibling;
                              addTag(fileObj.id, input.value);
                              input.value = "";
                            }}
                            className="px-4 py-2 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg transition-colors duration-200"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Tag List */}
                        {data.tags && data.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {data.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center space-x-1 bg-brand-brown-100 text-brand-brown-800 px-3 py-1 rounded-full text-sm"
                              >
                                <span>{tag}</span>
                                <button
                                  onClick={() => removeTag(fileObj.id, index)}
                                  className="hover:text-brand-brown-900"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Upload Results Summary */}
      {uploadResults.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Upload Results
          </h3>
          <div className="space-y-3">
            {uploadResults.map((result) => (
              <div
                key={result.id}
                className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  {result.success ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="font-medium text-neutral-900">
                      {result.title}
                    </p>
                    <p className="text-sm text-neutral-600">{result.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.success
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.success ? "Success" : "Failed"}
                  </span>
                  {result.success && (
                    <button className="text-brand-brown hover:text-brand-brown-700 text-sm font-medium">
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">
          Upload Guidelines
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800">
          <div>
            <h4 className="font-semibold mb-2">Supported Formats:</h4>
            <ul className="space-y-1">
              <li>• Photos: JPG, PNG, GIF, WebP</li>
              <li>• Videos: MP4, MOV, AVI, WebM</li>
              <li>• Maximum file size: 100MB</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Best Practices:</h4>
            <ul className="space-y-1">
              <li>• Use descriptive titles</li>
              <li>• Select appropriate categories</li>
              <li>• Add relevant tags for searchability</li>
              <li>• Include detailed descriptions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
