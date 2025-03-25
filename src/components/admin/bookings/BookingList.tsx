import React from 'react';
import BookingCard from './BookingCard.tsx';

type Item = {
    id: string;
    title: string;
    user: string;
    dateStart: string;
    dateEnd: string;
    location: string;
    imageUrl: string;
};

type BookingListProps = {
  items: Item[];
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const BookingList: React.FC<BookingListProps> = ({ items, onView, onDelete }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <BookingCard key={item.id} item={item} onView={onView} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
