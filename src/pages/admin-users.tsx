import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import UserList from "../components/admin/users/UserList.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import { useUsers } from "../hooks/useUsers.tsx";
import { UserData } from "../types/user.tsx";
import Pagination from "../components/Pagination.tsx";

export const AdminUsers: React.FC = () => {
  const [search, setSearch] = useState("");
  const redirect = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);

  const { users: allUsers, isLoading, error, page, deleteUser, setPage } = useUsers();

  const filtered = allUsers.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.surname.toLowerCase().includes(search.toLowerCase())  ||
    user.user_id.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = () => {
    if(selectedUser) {
      deleteUser(selectedUser.user_id);
    }
    setShowModal(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold">Review Users</p>
      <p className="text-xl mb-5">Search for a user</p>
      <AdminSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search users..."
      />

      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Failed to load users: {error}</p>}

      {!isLoading && !error && (
        <UserList
          items={filtered}
          onView={(user) => redirect(`/admin/user/${user.user_id}`)}
          onDelete={(user) => {setShowModal(true); setSelectedUser(user)}}
        />
      )}
      {!isLoading && !error && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          hasNextPage={true}
        />
      )}

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete ${selectedUser?.user_id}?`}
        onCancel={() => setShowModal(false)}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default AdminUsers;
