import { useNavigate } from "react-router-dom";
import DeleteModal from "./DeleteModal.tsx";
import DetailsLayout from "./DetailsLayout.tsx";
import EditActions from "./EditActions.tsx";
import InputFields from "./InputFields.tsx";

type Field<T> = {
  name: keyof T;
  readOnly?: boolean;
  leftAlign?: boolean;
  multiline?: boolean;
  options?: string[];
};

type AdminEntityDetailsPageProps<T> = {
  title: string;
  backPath: string;
  useDetailsHook: (id: string) => {
    isLoading: boolean;
    formData: T | null;
    isEditing: boolean;
    showModal: boolean;
    setShowModal: (value: boolean) => void;
    setIsEditing: (value: boolean) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSave: () => void;
    handleDelete: () => void;
  };
  idParam: string;
  fields: Field<T>[];
};

export default function AdminEntityDetailsPage<T>({ title, backPath, 
  useDetailsHook, idParam, fields }: AdminEntityDetailsPageProps<T>) {
  const navigate = useNavigate();
  const hookData = useDetailsHook(idParam);

  const { isLoading, formData, isEditing, showModal,
     setShowModal, setIsEditing, handleChange, handleSave, handleDelete } = hookData;

  if (isLoading) return <p className="p-6">Loading {title.toLowerCase()}...</p>;
  if (!formData) return <p className="p-6">{title.replace(" Details", "")} not found</p>;

  return (
    <DetailsLayout title={title} onBack={() => navigate(backPath)}>
      <InputFields<T>
        fields={fields.map((field) => ({
            ...field,
            readOnly: field.readOnly === false ? !isEditing : true,
        }))}
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
        title={`Are you sure you want to delete this ${title.toLowerCase().replace(" details", "")}?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </DetailsLayout>
  );
}
