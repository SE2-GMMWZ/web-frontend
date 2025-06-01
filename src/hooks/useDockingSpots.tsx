import { useEffect, useState, useCallback } from "react";
import { DockingSpotData, DockingSpotEnriched } from '../types/docking-spot';

const API_URL = process.env.REACT_APP_API_URL;

export default function useDockingSpots() {
  const [dockingSpots, setDockingSpots] = useState<DockingSpotEnriched[]>([]);
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
      const rawDocks: DockingSpotData[] = await res.json();

      const uniqueOwnerIds = [...new Set(rawDocks.map((d) => d.owner_id))];

      const ownerMap: Record<string, string> = {};
      await Promise.all(
        uniqueOwnerIds.map(async (id) => {
          const res = await fetch(`${API_URL}/users/${id}`);
          if (res.ok) {
            const data = await res.json();
            ownerMap[id] = `${data.user.name} ${data.user.surname}`;
          }
        })
      );

      const enriched: DockingSpotEnriched[] = rawDocks.map((dock) => ({
        ...dock,
        owner_name: ownerMap[dock.owner_id] || "Unknown Owner",
      }));

      setDockingSpots(enriched);
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
