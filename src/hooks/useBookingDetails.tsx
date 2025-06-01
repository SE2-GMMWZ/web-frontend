import { useState, useEffect, useCallback } from "react";
import type { BookingData } from "../types/booking";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useBookingDetails(id: string) {
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BookingData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.name === "people" ? Number(e.target.value) : e.target.value,
       [e.target.name]: e.target.name === "start_date" || 
       e.target.name === "end_date" ? new Date(e.target.value).toISOString() : e.target.value });
  };

  const fetchBooking = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/bookings/${id}`);
      if (!res.ok) throw new Error("Failed to fetch booking");
      const data = await res.json();
      setBooking(data);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update booking");
      setIsEditing(false);
      await fetchBooking();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete booking");
      navigate("/admin/bookings");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return { isLoading, formData, isEditing, showModal, setShowModal, setIsEditing, handleChange, handleSave, handleDelete };
}
