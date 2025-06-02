import { useParams, useNavigate } from "react-router-dom";
import useGuideDetails from "../hooks/useGuideDetails.tsx";
import { GuideEnriched } from "../types/guide";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function GuideDetails() {
  const { guideId } = useParams();
  const navigate = useNavigate();
  const { isLoading, formData, isEditing, showModal, setShowModal, setIsEditing, handleChange, handleSave, handleDelete } = useGuideDetails(guideId!);

  if (isLoading) return <p className="p-6">Loading guide...</p>;
  if (!formData) return <p className="p-6">Guide not found</p>;

  return (
    <DetailsLayout title="Guide Details" onBack={() => navigate("/admin/guides")}>

      <InputFields<GuideEnriched>
        fields={[
          { name: "guide_id", readOnly: true, leftAlign: false },
          { name: "title", readOnly: !isEditing, leftAlign: true },
          { name: "author_id", readOnly: true, leftAlign: false },
          { name: "author_name", readOnly: true, leftAlign: false },
          { name: "publication_date", readOnly: true, leftAlign: false },
          { name: "content", multiline: true, readOnly: !isEditing, leftAlign: true },
          { name: "is_approved", options: ["Yes", "No"], readOnly: !isEditing, leftAlign: true },
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
