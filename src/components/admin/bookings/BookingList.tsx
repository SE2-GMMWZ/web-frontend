import React from "react";
import BookingCard from "./BookingCard.tsx";
import { BookingListData } from "../../../types/booking";

type BookingListProps = {
  items: BookingListData[];
  onView: (item: BookingListData) => void;
  onDelete: (item: BookingListData) => void;
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
