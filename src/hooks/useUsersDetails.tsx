import { useState, useEffect } from "react";
import type { UserData } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL;

export function useUsersDetails(id: string) {
  const [user, setUsers] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  const fetchUsers = async () => {
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
  };

  useEffect(() => {
    fetchUsers();
  }, [id]);

  return { user, isLoading, error, refetch: fetchUsers };
}
