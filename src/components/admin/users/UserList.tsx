import React from 'react';
import UserCard from './UserCard.tsx';

type Item = {
    id: string;
    name: string;
    username: string;
    surname: string;
    imageUrl: string;
};

type UserListProps = {
  items: Item[];
  onView: (item: Item) => void;
  onDelete: (item: Item) => void;
};

export const UserList: React.FC<UserListProps> = ({ items, onView, onDelete }) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1 space-y-4">
        {items.map((item) => (
          <UserCard key={item.id} item={item} onView={onView} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default UserList;