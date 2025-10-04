import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(req) {
  try {
    let { items } = await req.json();

    // Normalize: if a single object was sent, wrap it in an array
    if (!Array.isArray(items)) {
      items = [items];
    }

    const client = await clientPromise;
    const db = client.db("osothestudio");
    const collection = db.collection("media");

    let results = [];

    for (const item of items) {
      try {
        // 1. Delete from Cloudinary
        await cloudinary.uploader.destroy(item.public_id);

        // 2. Delete from MongoDB
        const result = await collection.deleteOne({
          _id: new ObjectId(item.id),
        });

        results.push({
          id: item.id,
          success: result.deletedCount > 0,
        });
      } catch (err) {
        results.push({
          id: item.id,
          success: false,
          error: err.message,
        });
      }
    }

    return new Response(JSON.stringify(results), { status: 200 });
  } catch (err) {
    console.error("Delete error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
