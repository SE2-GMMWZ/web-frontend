import { useEffect, useState, useCallback } from "react";
import { BookingListData, BookingData } from '../types/booking'

const API_URL = process.env.REACT_APP_API_URL;

export function useBookings() {
  const [bookings, setBookings] = useState<BookingListData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/bookings/list?offset=${page * 10}`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const rawBookings: BookingData[] = await res.json();

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

      const enrichedBookings: BookingListData[] = rawBookings.map(b => ({
        booking_id: b.booking_id,
        dock_name: dockMap[b.dock_id] || "Unknown Dock",
        end_date: b.end_date,
        payment_method: b.payment_method,
        payment_status: b.payment_status,
        people: b.people,
        sailor_name: sailorMap[b.sailor_id] || "Unknown Sailor",
        start_date: b.start_date,
      }));

      setBookings(enrichedBookings);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  }, [page]);


  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);
  

  return { bookings, isLoading, error, page, refetch: fetchBookings, setPage};
}
