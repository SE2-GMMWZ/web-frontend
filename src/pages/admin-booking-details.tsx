import { useParams, useNavigate } from "react-router-dom";
import useBookingDetails from "../hooks/useBookingDetails.tsx";
import { BookingData } from "../types/booking.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function BookingDetails() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { isLoading, formData, isEditing, showModal, 
  setShowModal, setIsEditing, handleChange, handleSave, handleDelete,
  } = useBookingDetails(bookingId!);

  if (isLoading) return <p className="p-6">Loading booking...</p>;
  if (!formData) return <p className="p-6">Booking not found</p>;

  return (
    <DetailsLayout title="Booking Details" onBack={() => navigate("/admin/bookings")}>
      <InputFields<BookingData>
        fields={["user_id", "dock_id", "start_date", "end_date", "payment_status"]}
        formData={formData}
        isEditing={isEditing}
        onChange={handleChange}
      />

      <EditActions
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onDelete={() => setShowModal(true)}
        onSave={handleSave}
      />

      <DeleteModal
        isOpen={showModal}
        title="Are you sure you want to delete this booking?"
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </DetailsLayout>
  );
}
