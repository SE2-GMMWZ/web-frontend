import { useState, useEffect, useCallback } from "react";
import type { UserData } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL;

export function useUsersDetails(id: string) {
  const [user, setUsers] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const [isdeleted, setIsDeleted] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUsers(data.user);
      console.log(data);
    } catch (err: any) {
      setError(err.message || "Unexpected error");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const saveUser = async (formData: UserData, userId: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData).replace("phone_number", "phone"),
      });

      if (!res.ok) throw new Error("Failed to update user");

    } catch (err) {
      alert("Update failed");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");
      setIsDeleted(true);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return { user, isLoading, error, refetch: fetchUsers, saveUser, deleteUser, isDeleted: isdeleted};
}

