import React from "react";
import DockCard from "./DockCard.tsx";
import { DockingSpotData } from "../../../types/docking-spot.tsx";

type DockListProps = {
  items: DockingSpotData[];
  onView: (item: DockingSpotData) => void;
  onDelete: (item: DockingSpotData) => void;
};

const DockList: React.FC<DockListProps> = ({ items, onView, onDelete }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[600px] space-y-4">
        {items.map((item) => (
          <DockCard
            key={item.dock_id}
            item={item}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default DockList;
