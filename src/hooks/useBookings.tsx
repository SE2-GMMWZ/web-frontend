import { useEffect, useState } from "react";
import { BookingData } from '../types/booking'

const API_URL = process.env.REACT_APP_API_URL;

export function useBookings() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/list`);
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      console.log(data);
      setBookings(data); 
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, isLoading, error, refetch: fetchBookings };
}
