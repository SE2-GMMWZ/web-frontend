import { useState, useEffect } from "react";
import type { GuideData } from "../types/guide";

const API_URL = process.env.REACT_APP_API_URL;

export function useGuidesDetails(id: string) {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchGuide = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/guides/${id}`);
      if (!res.ok) throw new Error("Failed to fetch guide");
      const data = await res.json();
      setGuide(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGuide();
  }, [id]);

  return { guide, isLoading, error, refetch: fetchGuide };
}
