import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditorNavbar from "../EditorNavbar.tsx";
import { GuideData } from "../../../types/guide";
import useEditorGuides from "../../../hooks/useEditorGuides.tsx";

// Leaflet icon fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker: React.FC<{
  latitude: number;
  longitude: number;
  onChange: (lat: number, lng: number) => void;
}> = ({ latitude, longitude, onChange }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[latitude, longitude]}
        draggable={true}
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target;
            const pos = marker.getLatLng();
            onChange(pos.lat, pos.lng);
          },
        }}
      />
    </MapContainer>
  );
};

const GuideViewEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getGuideById, updateGuide } = useEditorGuides("");

  const [guide, setGuide] = useState<GuideData | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [links, setLinks] = useState<string[]>([]);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    getGuideById(id).then((result) => {
      if (result) {
        setGuide(result);
        setTitle(result.title);
        setContent(result.content);
        setImages(result.images || []);
        setLinks(result.links || []);
        setLatitude(result.location.latitude);
        setLongitude(result.location.longitude);
      }
    });
  }, [id, getGuideById]);

  const handleSave = async () => {
    if (!guide || latitude === null || longitude === null) return;
    await updateGuide({
      ...guide,
      title,
      content,
      images: images.filter((url) => url.trim() !== ""),
      links: links.filter((url) => url.trim() !== ""),
      location: { latitude, longitude },
    });
    setEditMode(false);
  };

  const updateList = (index: number, value: string, list: string[], setter: (val: string[]) => void) => {
    const copy = [...list];
    copy[index] = value;
    setter(copy);
  };

  if (!guide || latitude === null || longitude === null) {
    return <p className="p-6 text-gray-500">Loading guide...</p>;
  }

  return (
    <div>
      <EditorNavbar />
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{editMode ? "Edit Guide" : "Guide Details"}</h2>
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          )}
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            {editMode ? (
              <input
                className="w-full border px-4 py-2 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <p className="text-lg text-gray-900">{title}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            {editMode ? (
              <textarea
                className="w-full border px-4 py-2 rounded h-40"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            ) : (
              <p className="text-gray-800 whitespace-pre-wrap">{content}</p>
            )}
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Images</label>
            {editMode ? (
              <>
                {images.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => updateList(i, e.target.value, images, setImages)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 border px-4 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Delete image"
                    >
                      🗑
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setImages([...images, ""])}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Image
                </button>
              </>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {images.map((img, i) => (
                  <li key={i}>
                    <a href={img} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{img}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Links */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Links</label>
            {editMode ? (
              <>
                {links.map((url, i) => (
                  <div key={i} className="flex items-center gap-2 mb-2">
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => updateList(i, e.target.value, links, setLinks)}
                      placeholder="https://example.com"
                      className="flex-1 border px-4 py-2 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => setLinks(links.filter((_, idx) => idx !== i))}
                      className="text-red-600 hover:text-red-800 text-sm"
                      title="Delete link"
                    >
                      🗑
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setLinks([...links, ""])}
                  className="text-blue-600 text-sm hover:underline"
                >
                  + Add Link
                </button>
              </>
            ) : (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {links.map((link, i) => (
                  <li key={i}>
                    <a href={link} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{link}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <div className="h-64 border rounded overflow-hidden">
              {editMode ? (
                <LocationPicker
                  latitude={latitude}
                  longitude={longitude}
                  onChange={(lat, lng) => {
                    setLatitude(lat);
                    setLongitude(lng);
                  }}
                />
              ) : (
                <MapContainer
                  center={[latitude, longitude]}
                  zoom={12}
                  scrollWheelZoom={false}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={[latitude, longitude]} />
                </MapContainer>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 inline-block text-sm text-blue-600 hover:underline"
        >
          ← Back to list
        </button>
      </div>
    </div>
  );
};

export default GuideViewEditor;

