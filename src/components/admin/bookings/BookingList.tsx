import React from "react";
import BookingCard from "./BookingCard.tsx";
import { BookingData } from "../../../types/booking";

type BookingListProps = {
  items: BookingData[];
  onView: (item: BookingData) => void;
  onDelete: (item: BookingData) => void;
};

export const BookingList: React.FC<BookingListProps> = ({
  items,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <BookingCard
            key={item.booking_id}
            item={item}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
