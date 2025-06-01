import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import DockList from "../components/admin/docks/DockList.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";
import Pagination from "../components/Pagination.tsx";
import useDockingSpots from "../hooks/useDockingSpots.tsx";
import { DockingSpotData } from "../types/docking-spot.tsx";

const API_URL = process.env.REACT_APP_API_URL;

export const AdminDockingSpots: React.FC = () => {
  const { dockingSpots, isLoading, error, page,
     search, setSearch, refetch, setPage } = useDockingSpots();

  const [selectedDock, setSelectedDock] = useState<DockingSpotData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const redirect = useNavigate();

  const handleDelete = async () => {
    if (!selectedDock) return;
    try {
      await fetch(`${API_URL}/docking-spots/${selectedDock.dock_id}`, {
        method: "DELETE",
      });
      setShowModal(false);
      await refetch();
    } catch (error) {
      alert("Failed to delete docking spot");
    }
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
        placeholder="Search bookings..."
      />

      <DockList
        items={dockingSpots}
        onView={(dock) => redirect(`/admin/dock/${dock.dock_id}`)}
        onDelete={(dock) => {
          setSelectedDock(dock);
          setShowModal(true);
        }}
      />

      {!isLoading && !error && (
        <Pagination
          currentPage={page}
          setPage={setPage}
          hasNextPage={true}
        />
      )}

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete docking spot "${selectedDock?.dock_id}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminDockingSpots;
