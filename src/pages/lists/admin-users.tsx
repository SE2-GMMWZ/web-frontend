import { useUsers } from "../../hooks/useUsers.tsx";
import AdminEntityListPage from "../../components/admin/EntityListPage.tsx";
import { UserData } from "../../types/user.tsx";
import UserCard from "../../components/admin/cards/UserCard.tsx";

export default function AdminUsers() {
  const { users, isLoading, error, page, search, totalPages,
     deleteUser, setSearch, setPage } = useUsers();

  return (
    <AdminEntityListPage<UserData>
      title="Users"
      searchPlaceholder="Search users..."
      items={users}
      page={page}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      setSearch={setSearch}
      searchValue={search}
      setPage={setPage}
      deleteItem={deleteUser}
      getId={(user) => user.user_id}
      getViewPath={(user) => `/admin/user/${user.user_id}`}
      CardComponent={UserCard}
    />
  );
}
