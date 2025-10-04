import { useEffect, useState } from "react";

export default function useMedia({ filter } = {}) {
  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/get-media");
        if (!res.ok) throw new Error("Failed to fetch media");
        const data = await res.json();

        const filtered = filter ? data.filter(filter) : data;
        setMediaItems(filtered);
      } catch (err) {
        console.error("Error fetching media:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [filter]);

  return { mediaItems, loading, error };
}
