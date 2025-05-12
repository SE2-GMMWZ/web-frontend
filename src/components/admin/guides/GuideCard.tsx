import React from "react";
import { GuideData } from "../../../types/guide";

type GuideCardProps = {
  item: GuideData;
  onView: (item: GuideData) => void;
  onDelete: (item: GuideData) => void;
};

export const GuideCard: React.FC<GuideCardProps> = ({
  item,
  onView,
  onDelete,
}) => {
  const formattedDate = new Date(item.publication_date).toLocaleDateString();
  return (
    <div
      key={item.guide_id}
      className="border p-4 rounded shadow-sm flex gap-4 items-center"
    >
      <div className="flex-1">
        <p className="font-semibold">{item.title}</p>
        <p className="text-sm text-gray-600">Author: {item.author_id}</p>
        <p className="text-sm text-gray-600">Date posted: {formattedDate}</p>
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

export default GuideCard;
