import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, ImageIcon } from 'lucide-react';

type DockData = {
  id: string;
  name: string;
  location: string;
  contactInfo: string;
  properties: string[];
  coverImage?: string;
  slideshowImages?: string[];
};

const dummyDock: DockData = {
  id: '1',
  name: 'Dock A',
  location: 'Harbor Street 42',
  contactInfo: 'owner@example.com',
  properties: ['WiFi', 'Shower', 'Breakfast included', 'Electricity', 'Water supply'],
  coverImage: '',
  slideshowImages: [],
};

const DockDetails: React.FC = () => {
  const { dockId } = useParams();
  const navigate = useNavigate();

  const [dock, setDock] = useState<DockData | null>(null);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (dockId === '1' || dockId === '2') {
      setDock(dummyDock);
      setChecked(Array(dummyDock.properties.length * 2).fill(true));
    } else {
      setDock(null);
    }
  }, [dockId]);

  const handleCheckboxChange = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const renderImagePlaceholder = () => (
    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
      <ImageIcon className="w-8 h-8 text-gray-400" />
    </div>
  );

  if (!dock) return <p className="p-6">Dock not found</p>;

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-3xl font-semibold">Dock Details</h1>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium">Dock Name:</label>
            <input
              type="text"
              value={dock.name}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location:</label>
            <input
              type="text"
              value={dock.location}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Contact information:</label>
            <input
              type="text"
              value={dock.contactInfo}
              className="border px-4 py-2 rounded w-full"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Properties:</label>
            <div className="grid grid-cols-2 gap-4 bg-purple-100 p-4 rounded">
              {[0, 1].map((col) => (
                <div key={col} className="flex flex-col gap-2">
                  {dock.properties.map((prop, idx) => (
                    <label key={idx} className="flex items-center gap-2">
                      <span>{prop}</span>
                      <input
                        type="checkbox"
                        checked={checked[col * dock.properties.length + idx]}
                        onChange={() => handleCheckboxChange(col * dock.properties.length + idx)}
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-medium mb-2">Cover image:</label>
            <button className="flex items-center gap-2 text-gray-700 border border-dashed px-4 py-2 rounded mb-2">
              <Plus size={16} />
              Add an image
            </button>
            {renderImagePlaceholder()}
          </div>
          <div>
            <label className="block font-medium mb-2">Slide show images:</label>
            <button className="flex items-center gap-2 text-gray-700 border border-dashed px-4 py-2 rounded mb-2">
              <Plus size={16} />
              Add an image
            </button>
            <div className="flex gap-2 flex-wrap">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx}>{renderImagePlaceholder()}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <button className="bg-black text-white px-4 py-2 rounded">Delete Dock</button>
        <button className="border px-4 py-2 rounded">Edit Dock</button>
        <button className="bg-gray-200 px-4 py-2 rounded">Save changes</button>
      </div>
    </div>
  );
};

export default DockDetails;
