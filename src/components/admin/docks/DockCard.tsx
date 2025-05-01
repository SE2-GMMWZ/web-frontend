import React from "react";

type Item = {
  id: string;
  title: string;
  owner: string;
  location: string;
  imageUrl: string;
};

type DockCardProps = {
  item: Item;
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const DockCard: React.FC<DockCardProps> = ({
  item,
  onView,
  onDelete,
}) => {
  return (
    <div
      key={item.id}
      className="border p-4 rounded shadow-sm flex gap-4 items-center"
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-16 h-16 object-cover rounded"
      />
      <div className="flex-1">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm text-gray-600">Location: {item.location}</p>
        <p className="text-sm text-gray-600">Owner: {item.owner}</p>
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

export default DockCard;
