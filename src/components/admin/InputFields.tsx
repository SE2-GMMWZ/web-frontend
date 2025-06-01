type InputFieldsProps<T> = {
  fields: (keyof T)[];
  formData: T;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputFields<T>({
  fields,
  formData,
  isEditing,
  onChange,
}: InputFieldsProps<T>) {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      {fields.map((field) => (
        <div key={String(field)}>
          <label className="block mb-1 font-medium capitalize">
            {String(field).replace("_", " ")}:
          </label>
          <input
            type="text"
            name={String(field)}
            value={String(formData[field] ?? "")}
            readOnly={!isEditing}
            onChange={onChange}
            className="border px-4 py-2 rounded w-full"
          />
        </div>
      ))}
    </div>
  );
}
