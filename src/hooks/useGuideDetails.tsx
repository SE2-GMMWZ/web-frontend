import { useState, useEffect, useCallback } from "react";
import type { GuideData, GuideEnriched } from "../types/guide";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useGuideDetails(id: string) {
  const [guide, setGuide] = useState<GuideEnriched | null>(null);
  const [formData, setFormData] = useState<GuideEnriched | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { if (guide) setFormData(guide); }, [guide]);

  const fetchGuide = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/guides/${id}`);
      if (!res.ok) throw new Error("Failed to fetch guide");
      const data: GuideData = await res.json();

      let author_name = "Unknown Author";
      const userRes = await fetch(`${API_URL}/users/${data.author_id}`);
      if (userRes.ok) {
        const userData = await userRes.json();
        author_name = `${userData.user.name} ${userData.user.surname}`;
      }

      setGuide({ ...data, author_name });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchGuide(); }, [fetchGuide]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
    if (!formData) return;
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === "checkbox";

    let parsed: any;

    if (isCheckbox) {
      parsed = (e.target as HTMLInputElement).checked;
    } else if (name === "publication_date") {
      parsed = new Date(value).toISOString();
    } else if (name === "is_approved") {
      parsed = value === "Yes";
    } else {
      parsed = value;
    }

    setFormData({ ...formData, [name]: parsed });
  };

  const handleSave = async () => {
    if (!formData) return;
    const { author_name, ...dataToSave }: GuideEnriched = formData;

    try {
      const res = await fetch(`${API_URL}/guides/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
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
      const res = await fetch(`${API_URL}/guides/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete guide");
      navigate("/admin/guides");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return { isLoading, formData, isEditing, showModal, setShowModal, setIsEditing, handleChange, handleSave, handleDelete };
}
