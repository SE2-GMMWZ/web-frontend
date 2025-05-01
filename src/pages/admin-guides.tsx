import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/admin/AdminNavbar.tsx";
import AdminSearchBar from "../components/admin/AdminSearchBar.tsx";
import GuideList from "../components/admin/guides/GuideList.tsx";
import DeleteModal from "../components/admin/DeleteModal.tsx";

export const AdminGuides: React.FC = () => {
  const [search, setSearch] = useState("");
  const redirect = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const allGuides = [
    {
      id: "1",
      title: "Dock with me",
      author: "Docking Docker",
      dock: "Dock A",
      date: "2022-01-01",
      imageUrl:
        "https://helloartsy.com/wp-content/uploads/kids/beach/how-to-draw-a-dock/how-to-draw-a-dock-step-9.jpg",
    },
    {
      id: "2",
      title: "How to sail",
      author: "Sussy Sailor",
      dock: "Dock B",
      date: "2023-03-03",
      imageUrl:
        "https://thumbs.dreamstime.com/b/sunset-river-boat-dock-flying-birds-against-clouds-setting-sun-hand-painted-watercolor-illustration-paper-texture-141681745.jpg",
    },
  ];

  const filtered = allGuides.filter((booking) =>
    booking.title.toLowerCase().includes(search.toLowerCase()),
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
        onView={(guide) => redirect(`/admin/guide/${guide.id}`)}
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
