import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import EditorNavbar from "../components/editor/EditorNavbar.tsx";
import { useAuth } from "../providers/AuthProvider.tsx";

const API_URL = process.env.REACT_APP_API_URL;

// Fix Leaflet's default icon issues
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationPicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useMapEvents({
    click(e) {
      const pos: [number, number] = [e.latlng.lat, e.latlng.lng];
      setPosition(pos);
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function AddGuideView() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [links, setLinks] = useState<string[]>([""]);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateArray = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });
  };

  const handleSubmit = async () => {
    if (!title || !content || lat === null || lng === null) {
      setError("Please fill in all required fields and select a location.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/guides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          author_id: user?.id,
          images: images.filter(Boolean),
          links: links.filter(Boolean),
          is_approved: false,
          publication_date: new Date().toISOString(),
          location: { latitude: lat, longitude: lng },
        }),
      });

      if (!res.ok) throw new Error("Failed to add guide");

      navigate("/editor");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <EditorNavbar />
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Create a Mega Super Cool Guide 🚀</h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <label className="block mb-2 font-medium">Title</label>
        <input type="text" className="w-full border px-4 py-2 rounded mb-4" value={title} onChange={e => setTitle(e.target.value)} />

        <label className="block mb-2 font-medium">Content</label>
        <textarea className="w-full border px-4 py-2 rounded h-48 mb-4" value={content} onChange={e => setContent(e.target.value)} />

        <label className="block mb-2 font-medium">Image URLs</label>
        {images.map((img, i) => (
          <input
            key={i}
            type="text"
            value={img}
            onChange={e => updateArray(setImages, i, e.target.value)}
            className="w-full border px-4 py-2 rounded mb-2"
            placeholder="https://example.com/image.jpg"
          />
        ))}
        <button onClick={() => setImages([...images, ""])} className="mb-4 text-blue-600 hover:underline text-sm">+ Add Image</button>

        <label className="block mb-2 font-medium">External Links</label>
        {links.map((link, i) => (
          <input
            key={i}
            type="text"
            value={link}
            onChange={e => updateArray(setLinks, i, e.target.value)}
            className="w-full border px-4 py-2 rounded mb-2"
            placeholder="https://example.com"
          />
        ))}
        <button onClick={() => setLinks([...links, ""])} className="mb-4 text-blue-600 hover:underline text-sm">+ Add Link</button>

        <label className="block mb-2 font-medium">Select Location</label>
        <div className="h-[300px] border rounded overflow-hidden mb-6">
          <MapContainer
            center={[51.505, -0.09]}
            zoom={4}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <LocationPicker onPick={(lat, lng) => { setLat(lat); setLng(lng); }} />
          </MapContainer>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Guide"}
          </button>
          <button
            onClick={() => navigate("/editor")}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

