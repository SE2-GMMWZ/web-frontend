import { useParams, useNavigate } from "react-router-dom";
import useUsersDetails from '../hooks/useUsersDetails.tsx';
import { UserData } from "../types/user";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function UserDetails(){
  const { userId } = useParams();
  const navigate = useNavigate();
  const { isLoading, formData, isEditing, showModal, setShowModal,
    setIsEditing, handleChange, handleSave, handleDelete} = useUsersDetails(userId!);

  if (isLoading) return <p className="p-6">Loading user...</p>;
  if (!formData) return <p className="p-6">User not found</p>;

  return (
    <DetailsLayout title="User Details" onBack={() => navigate("/admin/users")}>
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
        onConfirm={handleDelete}
      />
    </DetailsLayout>
  );
};
