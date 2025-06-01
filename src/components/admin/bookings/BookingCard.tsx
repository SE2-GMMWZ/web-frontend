import React from "react";
import { BookingEnriched } from "../../../types/booking";

type BookingCardProps = {
  item: BookingEnriched;
  onView: (item: BookingEnriched) => void;
  onDelete: (item: BookingEnriched) => void;
};

export const BookingCard: React.FC<BookingCardProps> = ({
  item,
  onView,
  onDelete,
}) => {

  const start = new Date(item.start_date).toLocaleDateString();
  const end = new Date(item.end_date).toLocaleDateString();
  return (
    <div
      key={item.booking_id}
      className="border p-4 rounded shadow-sm flex gap-4 items-center width-full"
    >
      <div className="flex-1">
        <div className="flex flex-row gap-2">
          <p>Dock name:</p>
          <p className="font-semibold">{item.dock_name}</p>
        </div>

        <div className="flex flex-row gap-2">
          <p>Sailor name:</p>
          <p className="font-semibold">{item.sailor_name}</p>
        </div>
        
        
        
        <p className="text-sm text-gray-600">
          Date: {start} - {end}
        </p>
      </div>
      
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
