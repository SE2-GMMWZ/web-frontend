type FieldConfig<T> = {
  name: keyof T;
  readOnly?: boolean;
};

type InputFieldsProps<T> = {
  fields: FieldConfig<T>[];
  formData: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};


export default function InputFields<T>({
  fields,
  formData,
  onChange,
}: InputFieldsProps<T>) {
  return (
    <div className="flex flex-col gap-4 max-w-md">
      {fields.map(({ name, readOnly }) => (
        <div key={String(name)}>
          <label className="block mb-1 font-medium capitalize">
            {String(name).replace("_", " ")}:
          </label>
          <input
            type="text"
            name={String(name)}
            value={String(formData[name] ?? "")}
            readOnly={readOnly}
            onChange={onChange}
            className={`border px-4 py-2 rounded w-full ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`}
          />
        </div>
      ))}
    </div>
  );
}
