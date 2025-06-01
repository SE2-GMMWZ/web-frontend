import { useState, useEffect } from "react";
import { UserData } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL;

export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/users/list?offset=${page*10}`);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError(err.message || "Unexpected error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const deleteUser = async (userId : string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
    } catch (err) {
      alert("Delete failed");
    }
  };

  return { users, isLoading, error, page, deleteUser, setPage };
}
