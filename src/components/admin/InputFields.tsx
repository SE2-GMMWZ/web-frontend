type FieldConfig<T> = {
  name: keyof T;
  readOnly?: boolean;
  multiline?: boolean;
};

type InputFieldsProps<T> = {
  fields: FieldConfig<T>[];
  formData: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function InputFields<T>({ fields, formData, onChange }: InputFieldsProps<T>) {
  const editableFields = fields.filter(f => !f.readOnly);
  const readOnlyFields = fields.filter(f => f.readOnly);

  const renderFields = (fieldSet: FieldConfig<T>[]) =>
    fieldSet.map(({ name, readOnly, multiline }) => {
      const value = String(formData[name] ?? "");
      const baseClass = `w-full border rounded ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`;
      return (
        <div key={String(name)}>
          <label className="block mb-1 font-medium capitalize">
            {String(name).replace(/_/g, " ")}:
          </label>
          {multiline ? (
            <textarea
              name={String(name)}
              value={value}
              readOnly={readOnly}
              onChange={onChange}
              className={`${baseClass} p-2 h-32 resize-y`}
            />
          ) : (
            <input
              type="text"
              name={String(name)}
              value={value}
              readOnly={readOnly}
              onChange={onChange}
              className={`${baseClass} px-4 py-2`}
            />
          )}
        </div>
      );
    });

  return (
    <div className="flex w-full gap-8 justify-between">
      <div className="flex flex-col gap-4 flex-1">{renderFields(editableFields)}</div>
      <div className="flex flex-col gap-4 flex-1">{renderFields(readOnlyFields)}</div>
    </div>
  );
}

