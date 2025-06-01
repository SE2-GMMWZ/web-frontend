import { useEffect, useState, useCallback } from "react";
import { DockingSpotData, DockingSpotEnriched } from "../types/docking-spot";

const API_URL = process.env.REACT_APP_API_URL;

export default function useDockingSpots() {
  const [dockingSpots, setDockingSpots] = useState<DockingSpotEnriched[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDockingSpots = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/docking-spots/list?page=${page}${search !== "" ? `&owner_id=${encodeURIComponent(search)}` : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch docking spots");
      const data = await res.json();
      const rawDocks: DockingSpotData[] = data.docking_spots || [];
      setTotalPages(data.total_pages || 1);

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
        owner_name: ownerMap[dock.owner_id] || "Unknown Owner"
      }));

      setDockingSpots(enriched);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchDockingSpots();
    }, 300);
    return () => clearTimeout(timeout);
  }, [fetchDockingSpots]);

  const deleteDockingSpot = async (dockId: string) => {
    try {
      const res = await fetch(`${API_URL}/docking-spots/${dockId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete docking spot");
      await fetchDockingSpots();
    } catch {
      alert("Failed to delete docking spot");
    }
  };

  return { dockingSpots, isLoading, error, page, search, totalPages, 
    deleteDockingSpot, setSearch, setPage };
}
