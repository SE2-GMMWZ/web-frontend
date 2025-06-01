import React from "react";
import BookingCard from "./BookingCard.tsx";
import { BookingEnriched } from "../../../types/booking";

type BookingListProps = {
  items: BookingEnriched[];
  onView: (item: BookingEnriched) => void;
  onDelete: (item: BookingEnriched) => void;
};

export const BookingList: React.FC<BookingListProps> = ({
  items,
  onView,
  onDelete,
}) => {
  return (
     <div className="flex justify-center w-full">
      <div className="w-[600px] space-y-4">
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
