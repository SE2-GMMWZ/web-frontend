import { useEffect, useState, useCallback } from "react";
import { DockingSpotData } from '../types/docking-spot';

const API_URL = process.env.REACT_APP_API_URL;

export default function useDockingSpots() {
  const [dockingSpots, setDockingSpots] = useState<DockingSpotData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchDockingSpots = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/docking-spots/list?offset=${page * 10}&name=${search}`);
      if (!res.ok) throw new Error("Failed to fetch docking spots");
      const data: DockingSpotData[] = await res.json();
      setDockingSpots(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchDockingSpots();
  }, [fetchDockingSpots]);

  return { dockingSpots, isLoading, error, page, search, 
    setSearch, refetch: fetchDockingSpots, setPage };
}
