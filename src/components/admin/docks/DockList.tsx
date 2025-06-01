import React from "react";
import DockCard from "./DockCard.tsx";
import { DockingSpotEnriched } from "../../../types/docking-spot.tsx";

type DockListProps = {
  items: DockingSpotEnriched[];
  onView: (item: DockingSpotEnriched) => void;
  onDelete: (item: DockingSpotEnriched) => void;
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
