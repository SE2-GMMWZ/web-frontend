import { useParams, useNavigate } from "react-router-dom";
import useGuideDetails from "../hooks/useGuideDetails.tsx";
import { GuideData } from "../types/guide";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function GuideDetails() {
  const { guideId } = useParams();
  const navigate = useNavigate();

  const { isLoading, formData, isEditing, showModal, setShowModal,
    setIsEditing, handleChange, handleSave, handleDelete } = useGuideDetails(guideId!);

  if (isLoading) return <p className="p-6">Loading guide...</p>;
  if (!formData) return <p className="p-6">Guide not found</p>;

  return (
    <DetailsLayout title="Guide Details" onBack={() => navigate("/admin/guides")}>
      <InputFields<GuideData>
        fields={[
          { name: "guide_id", readOnly: true },
          { name: "title" },
          { name: "author_id", readOnly: true },
          { name: "publication_date", readOnly: true },
          { name: "content", multiline: true },
          { name: "is_approved" }
        ]}
        formData={formData}
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
        title="Are you sure you want to delete this guide?"
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </DetailsLayout>
  );
}
