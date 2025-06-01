import { useState, useEffect, useCallback } from "react";
import type { BookingData, BookingEnriched } from "../types/booking";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useBookingDetails(id: string) {
  const [booking, setBooking] = useState<BookingEnriched | null>(null);
  const [formData, setFormData] = useState<BookingEnriched | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { if (booking) setFormData(booking); }, [booking]);

  const fetchBooking = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/bookings/${id}`);
      if (!res.ok) throw new Error("Failed to fetch booking");
      const data: BookingData = await res.json();

      // fetch user
      let sailor_name = "Unknown Sailor";
      const userRes = await fetch(`${API_URL}/users/${data.sailor_id}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        sailor_name = `${userData.user.name} ${userData.user.surname}`;
      }

      // fetch dock
      let dock_name = "Unknown Dock";
      const dockRes = await fetch(`${API_URL}/docking-spots/${data.dock_id}`);
      if (dockRes.ok) {
        const dockData = await dockRes.json();
        dock_name = dockData.name;
      }

      setBooking({ ...data, sailor_name, dock_name });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchBooking(); }, [fetchBooking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  if (!formData) return;
  const { name, value } = e.target;
  const parsed =
    name === "people"
      ? Number(value)
      : name === "start_date" || name === "end_date"
      ? new Date(value).toISOString()
      : value;
  setFormData({ ...formData, [name]: parsed });
};

  const handleSave = async () => {
    if (!formData) return;
    const { sailor_name, dock_name, ...raw } = formData;
    try {
      const res = await fetch(`${API_URL}/bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw),
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
      const res = await fetch(`${API_URL}/bookings/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete booking");
      navigate("/admin/bookings");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return { isLoading, formData, isEditing, showModal, 
    setShowModal, setIsEditing, handleChange, handleSave, handleDelete };
}
