import { NextResponse } from "next/server";
import {
  getAllMedia,
  addMediaItem,
  getMediaByCategory,
  getMediaByType,
} from "@/lib/mediaStorage";

// GET - Fetch media items
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    let media;

    if (category) {
      media = getMediaByCategory(category);
    } else if (type) {
      media = getMediaByType(type);
    } else {
      media = getAllMedia();
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);
    return NextResponse.json(
      { error: "Failed to fetch media" },
      { status: 500 }
    );
  }
}

// POST - Add new media item
export async function POST(request) {
  try {
    const mediaItem = await request.json();

    // Validate required fields
    if (!mediaItem.title || !mediaItem.category || !mediaItem.type) {
      return NextResponse.json(
        { error: "Missing required fields: title, category, type" },
        { status: 400 }
      );
    }

    const newItem = addMediaItem(mediaItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Error adding media:", error);
    return NextResponse.json(
      { error: "Failed to add media item" },
      { status: 500 }
    );
  }
}
