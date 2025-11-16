import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("osothestudio");
    const media = await db
      .collection("media")
      .find({})
      .sort({ uploadedAt: -1 })
      .toArray();

    return new Response(JSON.stringify(media), {
      status: 200,
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0, s-maxage=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error fetching media:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch media" }), {
      status: 500,
      headers: {
        "Cache-Control": "no-store, max-age=0, s-maxage=0",
      },
    });
  }
}
