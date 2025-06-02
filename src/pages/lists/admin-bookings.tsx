import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../../components/admin/AdminSearchBar.tsx";
import DeleteModal from "../../components/admin/DeleteModal.tsx";
import { useBookings } from "../../hooks/useBookings.tsx";
import { BookingEnriched } from "../../types/booking.tsx";
import BookingCard from "../../components/admin/cards/BookingCard.tsx";
import AdminCardList from "../../components/admin/AdminCardList.tsx";
import Pagination from "../../components/Pagination.tsx";
import PageSelector from "../../components/PageSelector.tsx";

export default function AdminBookings(){
  const { bookings, isLoading, error, page, search, totalPages, 
    deleteGuide, setSearch, setPage} = useBookings();
  const [selectedBooking, setSelectedBooking] = useState<BookingEnriched | null>(null);
  const redirect = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    if (!selectedBooking) return;
    deleteGuide(selectedBooking.booking_id);
    setShowModal(false);
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
      
      <AdminCardList 
        items={bookings}
        onView={(booking) => redirect(`/admin/booking/${booking.booking_id}`)} 
        onDelete={(booking) => {
          setSelectedBooking(booking);
          setShowModal(true);
        }}
        CardComponent={BookingCard} layout="centered" />
      
      {!isLoading && !error && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      )}

      <PageSelector currentPage={page} totalPages={totalPages} setPage={setPage} />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete booking "${selectedBooking?.booking_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};