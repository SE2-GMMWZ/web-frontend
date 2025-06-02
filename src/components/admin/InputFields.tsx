type FieldConfig<T> = {
  name: keyof T;
  readOnly?: boolean;
  multiline?: boolean;
  options?: string[];
  leftAlign? : boolean;
};

type InputFieldsProps<T> = {
  fields: FieldConfig<T>[];
  formData: T;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export default function InputFields<T>({ fields, formData, onChange }: InputFieldsProps<T>) {
  const leftFields = fields.filter(f => f.leftAlign);
  const rightFields = fields.filter(f => !f.leftAlign);

  const renderFields = (fieldSet: FieldConfig<T>[]) =>
  fieldSet.map(({ name, readOnly, multiline, options }) => {
    let value = formData[name] as String | boolean | number | undefined;
    if (name === "is_approved") {
      value = value === true ? "Yes" : "No";
    } else {
      value = String(value ?? "");
    }
    const baseClass = `w-full border rounded ${readOnly ? "bg-gray-100 cursor-not-allowed" : ""}`;

    return (
      <div key={String(name)}>
        <label className="block mb-1 font-medium capitalize">
          {String(name).replace(/_/g, " ")}:
        </label>

        {options ? (
          <select
            name={String(name)}
            value={value as string}
            disabled={readOnly}
            onChange={onChange}
            className={`${baseClass} px-4 py-2`}
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : multiline ? (
          <textarea
            name={String(name)}
            value={value as string}
            readOnly={readOnly}
            onChange={onChange}
            className={`${baseClass} p-2 h-32 resize-y`}
          />
        ) : (
          <input
            type="text"
            name={String(name)}
            value={value as string}
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
      <div className="flex flex-col gap-4 flex-1">{renderFields(leftFields)}</div>
      <div className="flex flex-col gap-4 flex-1">{renderFields(rightFields)}</div>
    </div>
  );
}

