import { useParams } from "react-router-dom";
import AdminEntityDetailsPage from "../../components/admin/EntityDetailsPage.tsx";
import { BookingEnriched } from "../../types/booking.tsx";
import useBookingDetails from "../../hooks/useBookingDetails.tsx";

export default function BookingDetails() {
  const { bookingId } = useParams();
  return (
    <AdminEntityDetailsPage<BookingEnriched>
      title="Booking Details"
      backPath="/admin/bookings"
      idParam={bookingId!}
      useDetailsHook={useBookingDetails}
      fields={[
        { name: "booking_id", readOnly: true, leftAlign: false, },
        { name: "sailor_id", readOnly: true, leftAlign: false },
        { name: "sailor_name", readOnly: true, leftAlign: false },
        { name: "dock_id", readOnly: true, leftAlign: false },
        { name: "dock_name", readOnly: true, leftAlign: false },
        { name: "people", readOnly: false, leftAlign: true },
        { name: "start_date", readOnly: false, leftAlign: true },
        { name: "end_date", readOnly: false, leftAlign: true },
        { name: "payment_method", readOnly: false, leftAlign: true },
        { name: "payment_status", readOnly: false, leftAlign: true },
      ]}
    />
  );
}
