// app/api/save-media/route.js
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const mediaRecord = await req.json();
    const client = await clientPromise;
    const db = client.db("osothestudio");
    const collection = db.collection("media");

    await collection.insertOne(mediaRecord);

    return new Response(JSON.stringify(mediaRecord), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
