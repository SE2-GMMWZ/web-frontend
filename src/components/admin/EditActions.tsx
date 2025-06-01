type EditActionsProps = {
  isEditing: boolean;
  onToggleEdit: () => void;
  onDelete: () => void;
  onSave?: () => void;
  deleteLabel?: string;
  editLabel?: string;
  cancelLabel?: string;
  saveLabel?: string;
};

export default function EditActions({
  isEditing,
  onToggleEdit,
  onDelete,
  onSave,
  deleteLabel = "Delete",
  editLabel = "Edit",
  cancelLabel = "Cancel Edit",
  saveLabel = "Save Changes",
}: EditActionsProps) {
  return (
    <div className="flex gap-4 mt-6">
      <button
        className="bg-red-600 text-white px-4 py-2 rounded"
        onClick={onDelete}
      >
        {deleteLabel}
      </button>
      <button
        className="border px-4 py-2 rounded"
        onClick={onToggleEdit}
      >
        {isEditing ? cancelLabel : editLabel}
      </button>
      {isEditing && onSave && (
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={onSave}
        >
          {saveLabel}
        </button>
      )}
    </div>
  );
}
