import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useBookingDetails } from "../hooks/useBookingDetails.tsx";
import type { BookingData } from "../types/booking";

const API_URL = process.env.REACT_APP_API_URL;

const BookingDetails: React.FC = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { booking, isLoading, refetch } = useBookingDetails(bookingId as string);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<BookingData | null>(null);

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "people" ? Number(value) : value,
       [name]: name === "start_date" || name === "end_date" ? new Date(value).toISOString() : value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update booking");

      setIsEditing(false);
      await refetch();
      alert("Booking updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete booking");

      alert("Booking deleted");
      navigate("/admin/bookings");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (isLoading) return <p className="p-6">Loading booking...</p>;
  if (!formData) return <p className="p-6">Booking not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold text-center w-full">Booking Details</h1>
      </div>

      <div className="flex flex-col gap-4">
        {["booking_id", "dock_id", "user_id", "sailor_id"].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize">{field.replace("_", " ")}:</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field]}
              readOnly={!isEditing}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium">Number of People:</label>
          <input
            type="number"
            name="people"
            value={formData.people}
            readOnly={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Payment Method:</label>
          <input
            type="text"
            name="payment_method"
            value={formData.payment_method}
            readOnly={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Payment Status:</label>
          <select
            name="payment_status"
            value={formData.payment_status}
            disabled={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          >
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Start Date:</label>
          <div className="relative">
            <input
              type="date"
              name="start_date"
              value={formData.start_date.split("T")[0]}
              readOnly={!isEditing}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full pr-10"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium">End Date:</label>
          <div className="relative">
            <input
              type="date"
              name="end_date"
              value={formData.end_date.split("T")[0]}
              readOnly={!isEditing}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full pr-10"
            />
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete Booking
          </button>
          <button
            className="border px-4 py-2 rounded"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Edit" : "Edit Booking"}
          </button>
          {isEditing && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
