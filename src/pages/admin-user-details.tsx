import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUsersDetails } from '../hooks/useUsersDetails.tsx';
import { UserData } from "../types/user";

const API_URL = process.env.REACT_APP_API_URL;

const UserDetails: React.FC = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading, refetch, saveUser } = useUsersDetails(userId as string);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserData | null>(null);

  useEffect(() => {
    if (user) setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await saveUser(formData as UserData, userId as string);
    setIsEditing(false);
    await refetch();
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");

      alert("User deleted");
      navigate("/users");
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (isLoading) return <p className="p-6">Loading user...</p>;
  if (!formData) return <p className="p-6">User not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6 mx-7 my-7">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-4xl font-semibold">User Details</h1>
      </div>

      <div className="flex flex-col gap-4 max-w-md">
        {["name", "surname", "email", "phone_number"].map((field) => (
          <div key={field}>
            <label className="block mb-1 font-medium capitalize">{field.replace("_", " ")}:</label>
            <input
              type="text"
              name={field}
              value={formData[field as keyof UserData] || ""}
              readOnly={!isEditing}
              onChange={handleChange}
              className="border px-4 py-2 rounded w-full"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete User
        </button>
        <button
          className="border px-4 py-2 rounded"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel Edit" : "Edit User"}
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
  );
};

export default UserDetails;
