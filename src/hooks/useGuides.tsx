import { useEffect, useState, useCallback } from "react";
import { GuideData } from '../types/guide'

const API_URL = process.env.REACT_APP_API_URL;

export function useGuides() {
  const [guides, setGuides] = useState<GuideData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGuides = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/guides/list`);
      if (!res.ok) throw new Error("Failed to fetch guides");
      const data = await res.json();
      setGuides(data); 
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  return { guides, isLoading, error, refetch: fetchGuides };
}
