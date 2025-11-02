import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(req) {
  try {
    const data = await req.json();

    const client = await clientPromise;
    const db = client.db("osothestudio");
    const collection = db.collection("media");

    const { _id, title, category, description } = data;

    const result = await collection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          title,
          category,
          description,
          updatedAt: new Date(),
        },
      }
    );

    if (result.modifiedCount > 0) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "No document updated" }),
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
