import { useEffect, useState, useCallback } from "react";
import { GuideData } from "../types/guide";

const API_URL = process.env.REACT_APP_API_URL;

export default function useEditorGuides(editorId: string) {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);

  const fetchGuides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/guides/list?author_id=${editorId}&page=${page}${search ? `&search=${encodeURIComponent(search)}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data.guides || []);
      setTotalPages(data.total_pages || 1);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page, search, editorId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchGuides();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchGuides]);

  const deleteGuide = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/guides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete guide");
      await fetchGuides();
    } catch (err) {
      alert("Failed to delete guide");
    }
  };

  const updateGuide = async (updated: GuideData) => {
    try {
      const res = await fetch(`${API_URL}/guides/${updated.guide_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      if (!res.ok) throw new Error("Failed to update guide");
      await fetchGuides();
    } catch (err) {
      alert("Failed to update guide");
    }
  };

  const getGuideById = useCallback(async (id: string): Promise<GuideData | null> => {
    try {
      const res = await fetch(`${API_URL}/guides/${id}`);
      if (!res.ok) throw new Error("Failed to fetch guide");
      const guide = await res.json();
      setSelectedGuide(guide);
      return guide;
    } catch (err) {
      alert("Failed to fetch guide");
      return null;
    }
  }, []);

  return {
    guides,
    isLoading,
    error,
    page,
    search,
    totalPages,
    deleteGuide,
    updateGuide,
    getGuideById,
    selectedGuide,
    setSearch,
    setPage,
    refetch: fetchGuides,
  };
}

