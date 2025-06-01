import { useParams, useNavigate } from "react-router-dom";
import useDockingSpotDetails from "../hooks/useDockingSpotDetails.tsx";
import { DockingSpotEnriched } from "../types/docking-spot.ts";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import DetailsLayout from "../components/admin/DetailsLayout.tsx";
import EditActions from "../components/admin/EditActions.tsx";
import InputFields from "../components/admin/InputFields.tsx";

export default function DockingSpotDetails() {
  const { dockId } = useParams();
  const navigate = useNavigate();

  const { isLoading, formData, isEditing, showModal, 
    setShowModal, setIsEditing, handleChange, handleSave, handleDelete, } = useDockingSpotDetails(dockId!);

  if (isLoading) return <p className="p-6">Loading docking spot...</p>;
  if (!formData) return <p className="p-6">Docking spot not found</p>;

  return (
    <DetailsLayout title="Docking Spot Details" onBack={() => navigate("/admin/docks")}>

      <InputFields<DockingSpotEnriched>
        fields={[
          { name: "dock_id", readOnly: true },
          { name: "name" },
          { name: "owner_id", readOnly: true },
          { name: "owner_name", readOnly: true },     
          { name: "description" },
          { name: "availability" },
          { name: "price_per_night" },
          { name: "price_per_person" },
          { name: "services" },
          { name: "services_pricing" },
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
        title="Are you sure you want to delete this docking spot?"
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </DetailsLayout>
  );
}
