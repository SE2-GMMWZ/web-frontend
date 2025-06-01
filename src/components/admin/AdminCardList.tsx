import React from "react";

type AdminCardListProps<T> = {
  items: T[];
  CardComponent: React.ComponentType<{
    item: T;
    onView: (item: T) => void;
    onDelete: (item: T) => void;
  }>;
  onView: (item: T) => void;
  onDelete: (item: T) => void;
  layout?: "centered" | "fluid";
};

export default function AdminCardList<T>({
  items,
  CardComponent,
  onView,
  onDelete,
  layout = "centered",
}: AdminCardListProps<T>) {
  return (
    <div className={`flex ${layout === "centered" ? "justify-center w-full" : "gap-4"}`}>
      <div className={`${layout === "centered" ? "w-[700px]" : "flex-1"} space-y-4`}>
        {items.map((item, index) => (
          <CardComponent key={index} item={item} onView={onView} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
