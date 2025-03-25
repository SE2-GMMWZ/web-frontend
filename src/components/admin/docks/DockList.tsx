import React from 'react';
import DockCard from './DockCard.tsx';

type Item = {
    id: string;
    title: string;
    owner: string;
    location: string;
    imageUrl: string;
};

type DockListProps = {
  items: Item[];
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
  onAddNew: () => void;
};

export const DockList: React.FC<DockListProps> = ({ items, onView, onDelete, onAddNew }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <DockCard key={item.id} item={item} onView={onView} onDelete={onDelete} />
        ))}
      </div>

      { onAddNew!==null ?<button onClick={onAddNew} className="h-fit border px-4 py-2 rounded">
        Add new
      </button>
      : null}
    </div>
  );
};

export default DockList;