import { useState, useEffect, useCallback } from "react";
import type { GuideData } from "../types/guide";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useGuideDetails(id: string) {
  const [guide, setGuide] = useState<GuideData | null>(null);
  const [formData, setFormData] = useState<GuideData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (guide) setFormData(guide);
  }, [guide]);

  const fetchGuide = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/guides/${id}`);
      if (!res.ok) throw new Error("Failed to fetch guide");
      const data = await res.json();
      setGuide(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchGuide();
  }, [fetchGuide]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  if (!formData) return;

  const { name, value } = e.target;

  const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";
  const parsedValue =
    isCheckbox ? (e.target as HTMLInputElement).checked :
    name === "publication_date" ? new Date(value).toISOString() :
    value;

  setFormData({ ...formData, [name]: parsedValue });
};


  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/guides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update guide");
      setIsEditing(false);
      await fetchGuide();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/guides/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete guide");
      navigate("/admin/guides");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return {
    isLoading,
    formData,
    isEditing,
    showModal,
    setShowModal,
    setIsEditing,
    handleChange,
    handleSave,
    handleDelete,
  };
}
