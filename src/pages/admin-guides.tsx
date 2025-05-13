import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import GuideList from "../components/admin/guides/GuideList.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import { useGuides } from "../hooks/useGuides.tsx";

export const AdminGuides: React.FC = () => {
  const { guides } = useGuides();
  const [search, setSearch] = useState("");
  const redirect = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const filtered = guides.filter((guide) =>
    guide.title.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold"> Review Guides</p>
      <p className="text-xl mb-5"> Search for a guide</p>
      <AdminSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search guides..."
      />
      <GuideList
        items={filtered}
        onView={(guide) => redirect(`/admin/guide/${guide.guide_id}`)}
        onDelete={(guide) => setShowModal(true)}
      />
      <DeleteModal
        isOpen={showModal}
        title="Are you sure you want to delete [Guide X]?"
        onCancel={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default AdminGuides;
