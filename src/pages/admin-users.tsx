import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import { useUsers } from "../hooks/useUsers.tsx";
import { UserData } from "../types/user.tsx";
import Pagination from "../components/Pagination.tsx";
import AdminCardList from "../components/admin/AdminCardList.tsx";
import UserCard from "../components/admin/cards/UserCard.tsx";
import PageSelector from "../components/PageSelector.tsx";

export default function AdminUsers() {
  const { users, isLoading, error, page, search, totalPages, deleteUser, setSearch, setPage } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const redirect = useNavigate();

  const handleDelete = async () => {
    if (!selectedUser) return;
    await deleteUser(selectedUser.user_id);
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

      <AdminCardList
        items={users}
        onView={(user) => redirect(`/admin/user/${user.user_id}`)}
        onDelete={(user) => {
          setSelectedUser(user);
          setShowModal(true);
        }}
        CardComponent={UserCard}
      />

      {!isLoading && !error && (
        <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      )}

      <PageSelector currentPage={page} totalPages={totalPages} setPage={setPage} />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete user "${selectedUser?.user_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
