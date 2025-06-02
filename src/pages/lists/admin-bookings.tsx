import { useBookings } from "../../hooks/useBookings.tsx";
import AdminEntityListPage from "../../components/admin/EntityListPage.tsx";
import { BookingEnriched } from "../../types/booking.tsx";
import BookingCard from "../../components/admin/cards/BookingCard.tsx";

export default function AdminBookings() {
  const { bookings, isLoading, error, page, search, totalPages,
     deleteBooking, setSearch, setPage } = useBookings();

  return (
    <AdminEntityListPage<BookingEnriched>
      title="Bookings"
      searchPlaceholder="Search bookings (by sailor id) ..."
      items={bookings}
      page={page}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      setSearch={setSearch}
      searchValue={search}
      setPage={setPage}
      deleteItem={deleteBooking}
      getId={(booking) => booking.booking_id}
      getViewPath={(booking) => `/admin/booking/${booking.booking_id}`}
      CardComponent={BookingCard}
    />
  );
}
