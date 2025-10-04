const handleUpload = async () => {
  if (!validateForm()) return;

  setUploading(true);
  setUploadResults([]);

  try {
    for (const fileObj of uploadFiles) {
      const data = fileData[fileObj.id];
      const formData = new FormData();
      formData.append("file", fileObj.file);
      formData.append("title", data.title);
      formData.append("categories", JSON.stringify(data.category));
      formData.append("tags", JSON.stringify(data.tags));
      formData.append("description", data.description);

      // Call backend API to handle Cloudinary upload
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const uploaded = await res.json();
      console.log("Show uploaded");
      console.log(uploaded);

      setUploadResults((prev) => [
        ...prev,
        {
          id: fileObj.id,
          name: fileObj.name,
          title: data.title,
          category: data.category,
          type: uploaded.resource_type, // "image" or "video"
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
    alert("Upload failed. Please try again.");
  } finally {
    setUploading(false);
  }
};

import cloudinary from "@/lib/cloudinary";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // Custom metadata
    const title = formData.get("title");
    const description = formData.get("description");
    const categories = JSON.parse(formData.get("categories") || "[]");
    const tags = JSON.parse(formData.get("tags") || "[]");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file provided" }), {
        status: 400,
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `osothestudio/${categories[0] || "uncategorized"}`,
            resource_type: "auto",
            tags: categories.concat(tags), // flatten both categories & tags
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    });

    // Combine Cloudinary response with your metadata
    const mediaRecord = {
      public_id: result.public_id,
      url: result.secure_url,
      format: result.format,
      resource_type: result.resource_type,
      width: result.width,
      height: result.height,
      duration: result.duration || null,
      size: result.bytes,
      // your fields
      title,
      description,
      categories,
      tags,
      uploadedAt: new Date().toISOString(),
    };

    // TODO: Save mediaRecord into your database (Mongo, Postgres, JSON, etc.)
    // Save into MongoDB
    const client = await clientPromise;
    const db = client.db("osothestudio"); // choose db name
    const collection = db.collection("media");

    await collection.insertOne(mediaRecord);

    return new Response(JSON.stringify(mediaRecord), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// Combine Cloudinary response with your metadata
const mediaRecord = {
  public_id: result.public_id,
  url: result.secure_url,
  format: result.format,
  resource_type: result.resource_type,
  width: result.width,
  height: result.height,
  duration: result.duration || null,
  size: result.bytes,
  // your fields
  title,
  description,
  categories,
  tags,
  uploadedAt: new Date().toISOString(),
};

// Handle delete
const handleDelete = (item) => {
  setItemToDelete(item);
  setShowDeleteModal(true);
};

// Confirm delete
const confirmDelete = async () => {
  setDeleting(true);
  try {
    const res = await fetch("/api/delete-media", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: { id: itemToDelete._id, public_id: itemToDelete.public_id },
      }),
    });

    const result = await res.json();
    if (result[0]?.success) {
      setMediaItems((prev) =>
        prev.filter((item) => item._id !== itemToDelete._id)
      );
    } else {
      alert("Delete failed");
      console.error("Failed to delete:", result[0]?.error);
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Delete failed");
  } finally {
    setShowDeleteModal(false);
    setDeleting(false);
    setItemToDelete(null);
  }
};

// Handle bulk delete
const handleBulkDelete = async () => {
  if (selectedItems.length === 0) return;

  if (confirm(`Delete ${selectedItems.length} selected items?`)) {
    try {
      // prepare items with both id and public_id
      const itemsToDelete = mediaItems
        .filter((item) => selectedItems.includes(item._id)) // Mongo IDs
        .map((item) => ({ id: item._id, public_id: item.public_id }));

      const res = await fetch("/api/delete-media", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsToDelete }),
      });

      const results = await res.json();

      // filter out deleted items
      const successfulIds = results.filter((r) => r.success).map((r) => r.id);

      setMediaItems((prev) =>
        prev.filter((item) => !successfulIds.includes(item._id))
      );

      setSelectedItems([]);
    } catch (err) {
      console.error("Bulk delete error:", err);
      alert("Bulk delete failed.");
    }
  }
};
// Handle edit
const handleEdit = (item) => {
  setEditingItem({ ...item });
};

// Handle save edit
const handleSaveEdit = () => {
  setMediaItems((prev) =>
    prev.map((item) => (item.id === editingItem.id ? editingItem : item))
  );
  setEditingItem(null);
};
// Dummy media data
const [mediaItems, setMediaItems] = useState([
  {
    id: 1,
    title: "Romantic Garden Wedding Ceremony",
    type: "photo",
    category: "wedding",
    url: "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    thumbnail:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description:
      "Beautiful outdoor ceremony surrounded by blooming flowers and natural light",
    tags: ["wedding", "outdoor", "ceremony", "flowers", "romantic"],
    size: "2.4 MB",
    dimensions: "1920x1080",
    uploadDate: "2024-01-15",
    views: 245,
    rating: 5,
    client: "Sarah & Michael",
    featured: true,
  },
  {
    id: 2,
    title: "Corporate Team Building Event",
    type: "video",
    category: "corporate",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail:
      "https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description:
      "Professional coverage of annual team building activities and presentations",
    tags: ["corporate", "team building", "professional", "event"],
    size: "45.2 MB",
    duration: "3:45",
    uploadDate: "2024-01-12",
    views: 89,
    rating: 4,
    client: "Tech Corp Inc",
    featured: false,
  },
  {
    id: 3,
    title: "Professional Executive Portrait",
    type: "photo",
    category: "portrait",
    url: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    thumbnail:
      "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    description:
      "Corporate headshot with natural lighting and professional styling",
    tags: ["portrait", "professional", "headshot", "corporate", "executive"],
    size: "1.8 MB",
    dimensions: "1600x1200",
    uploadDate: "2024-01-10",
    views: 156,
    rating: 5,
    client: "Executive Team",
    featured: false,
  },
]);
