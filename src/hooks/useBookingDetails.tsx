import { useState, useEffect } from "react";
import type { BookingData } from "../types/booking";

const API_URL = process.env.REACT_APP_API_URL;

export function useBookingDetails(id: string) {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchBooking = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/bookings/${id}`);
      if (!res.ok) throw new Error("Failed to fetch booking");
      const data = await res.json();
      setBooking(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  return { booking, isLoading, error, refetch: fetchBooking };
}
