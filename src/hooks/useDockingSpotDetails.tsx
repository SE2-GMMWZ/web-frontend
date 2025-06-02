import { useState, useEffect, useCallback } from "react";
import type { DockingSpotData, DockingSpotEnriched } from "../types/docking-spot";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function useDockingSpotDetails(id: string) {
  const [dock, setDock] = useState<DockingSpotEnriched | null>(null);
  const [formData, setFormData] = useState<DockingSpotEnriched | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dock) setFormData(dock);
  }, [dock]);

  const fetchDock = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/docking-spots/${id}`);
      if (!res.ok) throw new Error("Failed to fetch docking spot");

      const dockData: DockingSpotData = await res.json();

      const userRes = await fetch(`${API_URL}/users/${dockData.owner_id}`);
      let owner_name = "Unknown Owner";
      if (userRes.ok) {
        const userData = await userRes.json();
        owner_name = `${userData.user.name} ${userData.user.surname}`;
      }

      setDock({ ...dockData, owner_name });
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDock();
  }, [fetchDock]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!formData) return;

    const { name, value } = e.target;
    const parsedValue =
      name === "price_per_night" || name === "price_per_person" || name === "services_pricing"
        ? Number(value)
        : value;

    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSave = async () => {
    if (!formData) return;

    const { owner_name, ...rawData }: DockingSpotEnriched = formData;

    try {
      const res = await fetch(`${API_URL}/docking-spots/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawData),
      });

      if (!res.ok) throw new Error("Failed to update docking spot");
      setIsEditing(false);
      await fetchDock();
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${API_URL}/docking-spots/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete docking spot");
      navigate("/admin/docks");
    } catch (err) {
      alert("Delete failed");
    }
    setShowModal(false);
  };

  return { isLoading, formData, isEditing, showModal, setShowModal,
     setIsEditing, handleChange, handleSave, handleDelete };
}
