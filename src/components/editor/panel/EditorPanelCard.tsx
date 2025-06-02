import React from "react";
import { GuideData } from "../../../types/guide";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type EditorPanelCardProps = {
  guide: GuideData;
  onView: (item: GuideData) => void;
  onDelete: (item: GuideData) => void;
};

const EditorPanelCard: React.FC<EditorPanelCardProps> = ({ guide, onView, onDelete }) => {
  const {
    title,
    content,
    images,
    links,
    location,
    publication_date,
    author_id,
    is_approved,
  } = guide;

  const formattedDate = new Date(publication_date).toLocaleDateString();
  const hasImage = images?.length > 0 && images[0];
  const lat = location?.latitude || 0;
  const lng = location?.longitude || 0;

  return (
    <div className="flex flex-col sm:flex-row items-start gap-6 p-5 bg-white border rounded-xl shadow-sm hover:shadow-md transition">
      <div className="w-28 h-28 shrink-0 rounded border overflow-hidden bg-gray-100 flex items-center justify-center">
        {hasImage ? (
          <img src={images[0]} alt="Preview" className="object-cover w-full h-full" />
        ) : (
          <span className="text-xs text-gray-400">No image</span>
        )}
      </div>

      <div className="flex-1 min-w-0 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
        <p className="text-sm text-gray-700 line-clamp-2">{content}</p>

        <div className="text-xs text-gray-500 flex flex-wrap gap-3">
          <span>🗓 {formattedDate}</span>
          <span>🧑 {author_id || "Unknown"}</span>
          <span>🔗 {links?.length || 0} links</span>
          <span className={is_approved ? "text-green-600" : "text-yellow-600"}>
            {is_approved ? "✅ Approved" : "⏳ Pending"}
          </span>
        </div>

        <div className="h-32 w-full rounded overflow-hidden border">
          <MapContainer
            center={[lat, lng]}
            zoom={10}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[lat, lng]} />
          </MapContainer>
        </div>
      </div>

      <div className="flex flex-col gap-2 shrink-0">
        <button
          onClick={() => onView(guide)}
          className="px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View
        </button>
        <button
          onClick={() => onDelete(guide)}
          className="px-4 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EditorPanelCard;

