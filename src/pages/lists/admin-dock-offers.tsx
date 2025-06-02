import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../../components/admin/AdminSearchBar.tsx";
import DeleteModal from "../../components/admin/DeleteModal.tsx";
import Pagination from "../../components/Pagination.tsx";
import useDockingSpots from "../../hooks/useDockingSpots.tsx";
import { DockingSpotEnriched } from "../../types/docking-spot.tsx";
import AdminCardList from "../../components/admin/AdminCardList.tsx";
import DockCard from "../../components/admin/cards/DockCard.tsx";
import PageSelector from "../../components/PageSelector.tsx";

export default function AdminDockingSpots() {
  const { dockingSpots, isLoading, error, page, search, totalPages,
     deleteDockingSpot, setSearch, setPage } = useDockingSpots();
  const [selectedDock, setSelectedDock] = useState<DockingSpotEnriched | null>(null);
  const [showModal, setShowModal] = useState(false);
  const redirect = useNavigate();

  const handleDelete = async () => {
    if (!selectedDock) return;
    await deleteDockingSpot(selectedDock.dock_id);
    setShowModal(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold">Review Docking Spots</p>
      <p className="text-xl mb-5">Search for a docking spot</p>

      <AdminSearchBar
        value={search}
        onChange={setSearch}
        onClear={() => setSearch("")}
        placeholder="Search docking spots..."
      />

      <AdminCardList
        items={dockingSpots}
        onView={(dock) => redirect(`/admin/dock/${dock.dock_id}`)}
        onDelete={(dock) => {
          setSelectedDock(dock);
          setShowModal(true);
        }}
        CardComponent={DockCard}
      />

      {!isLoading && !error && (
        <Pagination currentPage={page} totalPages={totalPages} setPage={setPage} />
      )}

      <PageSelector currentPage={page} totalPages={totalPages} setPage={setPage} />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete docking spot "${selectedDock?.dock_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
