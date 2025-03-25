import React from 'react';
import GuideCard from './GuideCard.tsx';

type Item = {
    id: string;
    title: string;
    author: string;
    dock: string;
    date: string;
    imageUrl: string;
};

type GuideListProps = {
  items: Item[];
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const BookingList: React.FC<GuideListProps> = ({ items, onView, onDelete }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <GuideCard key={item.id} item={item} onView={onView} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default BookingList;
