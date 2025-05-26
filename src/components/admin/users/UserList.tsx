import React from "react";
import UserCard from "./UserCard.tsx";
import { UserData } from "../../../types/user.tsx";

type UserListProps = {
  items: UserData[];
  onView: (item: UserData) => void;
  onDelete: (item: UserData) => void;
};

export const UserList: React.FC<UserListProps> = ({
  items,
  onView,
  onDelete,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <UserCard
            key={item.user_id}
            item={item}
            onView={onView}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;
