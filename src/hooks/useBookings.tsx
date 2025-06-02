import { useEffect, useState, useCallback } from "react";
import { BookingEnriched, BookingData } from '../types/booking'

const API_URL = process.env.REACT_APP_API_URL;

export function useBookings() {
  const [bookings, setBookings] = useState<BookingEnriched[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/bookings/list?page=${page}${search !== "" ? `&sailor_id=${encodeURIComponent(search)}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      const rawBookings: BookingData[] = data.bookings || [];
      setTotalPages(data.total_pages || 1);

      const uniqueSailorIds = [...new Set(rawBookings.map(b => b.sailor_id))];
      const uniqueDockIds = [...new Set(rawBookings.map(b => b.dock_id))];

      const sailorMap: Record<string, string> = {};
      await Promise.all(
        uniqueSailorIds.map(async id => {
          const res = await fetch(`${API_URL}/users/${id}`);
          if (res.ok) {
            const data = await res.json();     
            sailorMap[id] = data.user.name +  " " + data.user.surname;
          }
        })
      );

      const dockMap: Record<string, string> = {};
      await Promise.all(
        uniqueDockIds.map(async id => {
          const res = await fetch(`${API_URL}/docking-spots/${id}`);
          if (res.ok) {
            const data = await res.json();
            dockMap[id] = data.name;
          }
        })
      );

      const enrichedBookings: BookingEnriched[] = rawBookings.map(b => ({
        ...b,
        dock_name: dockMap[b.dock_id] || "Unknown Dock",
        sailor_name: sailorMap[b.sailor_id] || "Unknown Sailor",
      }));

      setBookings(enrichedBookings);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page, search]);


  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const deleteBooking = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete guide");
      await fetchBookings();
    } catch (err) {
      alert("Failed to delete guide");
    }
  };

  return { bookings, isLoading, error, page, search, totalPages,
     deleteBooking, setSearch, fetchBookings, setPage};
}
