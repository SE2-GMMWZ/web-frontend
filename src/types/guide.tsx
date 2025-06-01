import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import Pagination from "../components/Pagination.tsx";
import { useGuides } from "../hooks/useGuides.tsx";
import { GuideData } from "../types/guide";
import AdminCardList from "../components/admin/AdminCardList.tsx";
import { GuideCard } from "../components/admin/cards/GuideCard.tsx";

export const AdminGuides: React.FC = () => {
  const { guides, isLoading, error, page, search, setSearch, 
    onlyUnapproved, setOnlyUnapproved, setPage, refetch, deleteGuide } = useGuides();
  const [selectedGuide, setSelectedGuide] = useState<GuideData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const redirect = useNavigate();

  const handleDelete = async () => {
    if (!selectedGuide) return;
    await deleteGuide(selectedGuide.guide_id);
    setShowModal(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold">Review Guides</p>
      <p className="text-xl mb-2">Search for a guide</p>

      <div className="flex items-center gap-4 mb-4">
        <AdminSearchBar
          value={search}
          onChange={setSearch}
          onClear={() => setSearch("")}
          placeholder="Search guides..."
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={onlyUnapproved} onChange={() => setOnlyUnapproved(prev => !prev)} />
          Show guides to approve
        </label>
      </div>

      <AdminCardList
        items={guides}
        onView={(guide) => redirect(`/admin/guide/${guide.guide_id}`)}
        onDelete={(guide) => {
          setSelectedGuide(guide);
          setShowModal(true);
        }}
        CardComponent={GuideCard}
      />

      {!isLoading && !error && (
        <Pagination currentPage={page} setPage={setPage} hasNextPage={true} />
      )}

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete guide "${selectedGuide?.guide_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminGuides;
