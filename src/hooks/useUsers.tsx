import { useEffect, useState, useCallback } from "react";
import { UserData } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL;

export function useUsers() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${API_URL}/users/list?page=${page}${search !== "" ? `&query=${encodeURIComponent(search)}` : ""}`
      );
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.users || []);
      setTotalPages(data.total_pages || 1);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 300);
    return () => clearTimeout(delay);
  }, [fetchUsers]);

  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete user");
      await fetchUsers();
    } catch {
      alert("Delete failed");
    }
  };

  return { users, isLoading, error, page, search, totalPages, deleteUser, setSearch, setPage };
}
