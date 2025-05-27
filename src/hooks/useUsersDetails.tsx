import { useState, useEffect, useCallback } from "react";
import type { UserData } from "../types/user";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useUsersDetails(id: string) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);
  const navigate = useNavigate();

    useEffect(() => {
      if (user) setFormData(user);
    }, [user]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!formData) return;
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/users/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data.user);
      console.log(data);
    } catch (err: any) {
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData).replace("phone_number", "phone"),
      });

      if (!res.ok) throw new Error("Failed to update user");
      setIsEditing(false);
      await fetchUsers();

    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete user");
      navigate("/users");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return { isLoading, formData, isEditing, showModal, setShowModal, setIsEditing, handleChange, handleSave, handleDelete};
}