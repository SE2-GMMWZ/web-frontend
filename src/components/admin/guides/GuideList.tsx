import React from "react";
import GuideCard from "./GuideCard.tsx";
import { GuideData } from "../../../types/guide.tsx";

type GuideListProps = {
  items: GuideData[];
  onView: (item: GuideData) => void;
  onDelete: (item: GuideData) => void;
};

export const BookingList: React.FC<GuideListProps> = ({
  items,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <GuideCard
            key={item.guide_id}
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
