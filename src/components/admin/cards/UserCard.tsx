import React from "react";
import { UserData } from "../../../types/user";

type UserCardProps = {
  item: UserData;
  onView: (item: UserData) => void;
  onDelete: (item: UserData) => void;
};

export const UserCard: React.FC<UserCardProps> = ({
  item,
  onView,
  onDelete,
}) => {
  return (
    <div
      key={item.user_id}
      className="border py-3 px-4 rounded shadow-sm flex gap-4 items-center"
    >
      <div className="flex-1">
        <p className="text-m text-gray-800">{item.name} {item.surname}</p>
        <p className="text-sm text-gray-600">Email: {item.email}</p>
        <p className="text-sm text-gray-600">userId: {item.user_id}</p>
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

export default UserCard;
