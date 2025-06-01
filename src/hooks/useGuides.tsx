import { useEffect, useState } from "react";
import { GuideData } from "../types/guide";

const API_URL = process.env.REACT_APP_API_URL;

export function useGuides() {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [onlyUnapproved, setOnlyUnapproved] = useState(false);

  const fetchGuides = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}/guides/list?page=${page}` +
        (search !== "" ? `&author_id=${encodeURIComponent(search)}` : "") +
        (onlyUnapproved ? `&is_approved=false` : "")
      );
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data.guides || []);
      setTotalPages(data.total_pages || 1);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchGuides();
    }, 300);
    return () => clearTimeout(timeout);
  }, [page, search, onlyUnapproved]);

  const deleteGuide = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/guides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete guide");
      await fetchGuides();
    } catch (err) {
      alert("Failed to delete guide");
    }
  };

  return {
    guides, isLoading, error, page, search, totalPages,
    deleteGuide, setSearch, setPage, onlyUnapproved, setOnlyUnapproved
  };
}
