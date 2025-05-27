import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUsersDetails } from '../hooks/useUsersDetails.tsx';
import { UserData } from "../types/user";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function UserDetails(){
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading, refetch, saveUser, deleteUser, isDeleted } = useUsersDetails(userId as string);
  const [showModal, setShowModal] = useState(false);
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
    setShowModal(false);
    deleteUser(userId as string);
    if(isDeleted) {
      navigate("/users");
    }
  };

  if (isLoading) return <p className="p-6">Loading user...</p>;
  if (!formData) return <p className="p-6">User not found</p>;

  return (
    <DetailsLayout title="User Details" onBack={() => navigate("/users")}>
      <InputFields<UserData>
        fields={["name", "surname", "email", "phone_number"]}
        formData={formData}
        isEditing={isEditing}
        onChange={handleChange}
      />

      <EditActions
        isEditing={isEditing}
        onToggleEdit={() => setIsEditing(!isEditing)}
        onDelete={() => setShowModal(true)}
        onSave={handleSave}
      />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete this user?`}
        onCancel={() => setShowModal(false)}
        onConfirm={() => handleDelete()}
      />
    </DetailsLayout>
  );
};
