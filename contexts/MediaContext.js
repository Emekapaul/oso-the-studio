"use client";
import { createContext, useContext, useEffect, useState } from "react";

const MediaContext = createContext();

export function MediaProvider({ children }) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/get-media", {
        cache: "no-store",
        next: { revalidate: 0 },
      });
      if (!res.ok) throw new Error("Failed to fetch media");
      const data = await res.json();

      setMediaItems(data);
    } catch (err) {
      console.error("Error fetching media:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  return (
    <MediaContext.Provider
      value={{ mediaItems, loading, error, setMediaItems, fetchMedia }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export default MediaContext;
