import React from "react";
import { BookingData } from "../../../types/booking";

type BookingCardProps = {
  item: BookingData;
  onView: (item: BookingData) => void;
  onDelete: (item: BookingData) => void;
};

export const BookingCard: React.FC<BookingCardProps> = ({
  item,
  onView,
  onDelete,
}) => {
  return (
    <div
      key={item.booking_id}
      className="border p-4 rounded shadow-sm flex gap-4 items-center"
    >
       {/*}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm text-gray-600">Location: {item.location}</p>
        <p className="text-sm text-gray-600">User: {item.user}</p>
        <p className="text-sm text-gray-600">
          Date: {item.dateStart} - {item.dateEnd}
        </p>
      </div>
      */}
      <div className="flex gap-2">
        <button
          onClick={() => onView(item)}
          className="bg-black text-white px-3 py-1 rounded"
        >
          View details
        </button>
        <button
          onClick={() => onDelete(item)}
          className="border px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookingCard;
