import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, LinkIcon, MapPin } from "lucide-react";
import { useGuidesDetails } from "../hooks/useGuidesDetails.tsx";
import { GuideData } from "../types/guide.tsx";

const API_URL = process.env.REACT_APP_API_URL;

const GuideDetails: React.FC = () => {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { guide, isLoading, refetch } = useGuidesDetails(guideId as string);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<GuideData | null>(null);

  useEffect(() => {
    if (guide) setFormData(guide);
  }, [guide]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, [name]: name === "publication_date" ? new Date(value).toISOString() : value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/guides/${guideId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to update guide");

      setIsEditing(false);
      await refetch();
      alert("Guide updated successfully");
    } catch (err) {
      alert("Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this guide?")) return;

    try {
      const res = await fetch(`${API_URL}/guides/${guideId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete guide");

      alert("Guide deleted");
      navigate("/admin/guides");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (isLoading) return <p className="p-6">Loading guide...</p>;
  if (!formData) return <p className="p-6">Guide not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-bold text-center w-full">Guide Details</h1>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            readOnly={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            readOnly={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-medium">Publication Date:</label>
          <input
            type="date"
            name="publication_date"
            value={formData.publication_date?.split("T")[0] || ""}
            readOnly={!isEditing}
            onChange={handleChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Location:</label>
          <div className="flex gap-2 items-center">
            <MapPin />
            <span>{formData.location?.latitude}, {formData.location?.longitude}</span>
          </div>
        </div>

        {formData.links?.length > 0 && (
          <div>
            <label className="block font-medium">Links:</label>
            <ul className="list-disc list-inside text-blue-600">
              {formData.links.map((link, i) => (
                <li key={i}>
                  <a href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1">
                    <LinkIcon size={16} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_approved}
            disabled={!isEditing}
            onChange={() =>
              setFormData({ ...formData, is_approved: !formData.is_approved })
            }
          />
          <label className="font-medium">Approved</label>
        </div>

        <div className="flex gap-4 mt-6">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete Guide
          </button>
          <button
            className="border px-4 py-2 rounded"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel Edit" : "Edit Guide"}
          </button>
          {isEditing && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded"
              onClick={handleSave}
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuideDetails;
