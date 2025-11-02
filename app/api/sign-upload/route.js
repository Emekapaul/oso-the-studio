// app/api/sign-upload/route.js
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { title, description, category, tags } = await req.json();

    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder: `osothestudio/${category || "uncategorized"}`,
        tags: tags || [],
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return new Response(
      JSON.stringify({
        signature,
        timestamp,
        folder: `osothestudio/${category || "uncategorized"}`,
        title,
        description,
        category,
        tags,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
