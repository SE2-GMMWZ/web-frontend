import React from "react";
import { DockingSpotEnriched } from "../../../types/docking-spot";

type DockCardProps = {
  item: DockingSpotEnriched;
  onView: (item: DockingSpotEnriched) => void;
  onDelete: (item: DockingSpotEnriched) => void;
};

const DockCard: React.FC<DockCardProps> = ({ item, onView, onDelete }) => {
  return (
    <div
      key={item.dock_id}
      className="border p-4 rounded shadow-sm flex gap-4 items-center w-full"
    >
      <div className="flex-1">
        <div className="flex flex-row gap-2">
          <p>Dock name:</p>
          <p className="font-semibold">{item.name}</p>
        </div>

        <div className="flex flex-row gap-2">
          <p>Owner Name:</p>
          <p className="font-semibold">{item.owner_name}</p>
        </div>

        <p className="text-sm text-gray-600">
          Price: ${item.price_per_night} per night / ${item.price_per_person} per person
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

export default DockCard;
