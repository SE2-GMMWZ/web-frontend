import React from 'react';

type Item = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
};

type CardListProps = {
  items: Item[];
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
  onAddNew: () => void;
};

export const CardList: React.FC<CardListProps> = ({ items, onView, onDelete, onAddNew }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-sm flex gap-4 items-center">
            <img
            src={item.imageUrl}
            alt={item.title}
            className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onView(item)} className="bg-black text-white px-3 py-1 rounded">
                View details
              </button>
              <button onClick={() => onDelete(item)} className="border px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={onAddNew} className="h-fit border px-4 py-2 rounded">
        Add new
      </button>
    </div>
  );
};
