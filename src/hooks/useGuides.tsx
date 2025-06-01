import { useEffect, useState, useCallback } from "react";
import { GuideData } from '../types/guide'

const API_URL = process.env.REACT_APP_API_URL;

export function useGuides() {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [onlyUnapproved, setOnlyUnapproved] = useState(false);

  const fetchGuides = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/guides/list?offset=${page * 10}&sailor_id=${search}${onlyUnapproved ? "&is_approved=false" : ""}`);
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data); 
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page, search, onlyUnapproved]);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  return { guides, isLoading, page, search, error, onlyUnapproved, setOnlyUnapproved, setPage, setSearch, refetch: fetchGuides };
}
