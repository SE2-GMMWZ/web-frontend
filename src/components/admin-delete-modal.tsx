import React from 'react';
import { X } from 'lucide-react';

type DeleteModalProps = {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DeleteModal: React.FC<DeleteModalProps> = ({
  title,
  subtitle = 'This change cannot be reversed',
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md relative max-w-sm w-full">
        <button onClick={onCancel} className="absolute top-3 right-3 text-gray-500">
          <X size={20} />
        </button>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{subtitle}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border text-gray-800 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
