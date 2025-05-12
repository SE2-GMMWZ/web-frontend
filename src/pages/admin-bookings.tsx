import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import BookingList from "../components/admin/bookings/BookingList.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import { useBookings } from "../hooks/useBookings.tsx";
import { BookingData } from "../types/booking";

const API_URL = process.env.REACT_APP_API_URL;

export const AdminBookings: React.FC = () => {
  const { bookings, isLoading, refetch } = useBookings();
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(null);
  const redirect = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const filtered = bookings.filter((booking) =>
    booking.booking_id.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!selectedBooking) return;
    try {
      await fetch(`${API_URL}/bookings/${selectedBooking.booking_id}`, {
        method: "DELETE",
      });
      setShowModal(false);
      await refetch();
    } catch (error) {
      alert("Failed to delete booking");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold">Review Bookings</p>
      <p className="text-xl mb-5">Search for a booking</p>

      <AdminSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search bookings..."
      />

      <BookingList
        items={filtered}
        onView={(booking) => redirect(`/admin/booking/${booking.booking_id}`)}
        onDelete={(booking) => {
          setSelectedBooking(booking);
          setShowModal(true);
        }}
      />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete booking "${selectedBooking?.booking_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminBookings;
