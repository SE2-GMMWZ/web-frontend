import React from 'react';

type AdminSearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
};

export const AdminSearchBar: React.FC<AdminSearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search...',
}) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded px-4 py-2 w-full"
      />
      {value && (
        <button onClick={onClear} className="text-xl px-2">
          ❌
        </button>
      )}
    </div>
  );
};

export default AdminSearchBar;