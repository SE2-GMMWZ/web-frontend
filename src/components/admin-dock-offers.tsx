import React, { useState } from 'react';
import { AdminNavbar } from "./admin-panel-navbar.tsx";
import { SearchBar } from "./admin-search-bar.tsx";
import { CardList } from "./admin-card-list.tsx";
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from "./admin-delete-modal.tsx";

export const AdminDockOffers: React.FC = () => {
    const [search, setSearch] = useState('');
    const redirect = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const allDocks = [
        { id: '1', title: 'Big Dock', location: 'Dock A', owner: 'Jessica Jones', 
            imageUrl: 'https://helloartsy.com/wp-content/uploads/kids/beach/how-to-draw-a-dock/how-to-draw-a-dock-step-9.jpg'},
        { id: '2', title: 'Docky dock', location: 'Dock B', owner: 'Luke Cage',
            imageUrl: 'https://thumbs.dreamstime.com/b/sunset-river-boat-dock-flying-birds-against-clouds-setting-sun-hand-painted-watercolor-illustration-paper-texture-141681745.jpg'},
    ];

    const filtered = allDocks.filter((dock) =>
        dock.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="p-6 flex flex-col items-center">
            <AdminNavbar />
            <p className="text-2xl mb-5 font-bold"> Docks page</p>
            <p className="text-xl mb-5"> Browse and edit Dock offers</p>
            <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search docks..."
            />
            <CardList
                items={filtered}
                onView={(dock) => redirect(`/admin/dock/${dock.id}`)}
                onDelete={(dock) => setShowModal(true)}
                onAddNew={() => alert('Add new dock')}
            />
            <DeleteModal
                isOpen={showModal}
                title="Are you sure you want to delete [Booking X]?"
                onCancel={() => setShowModal(false)}
                onConfirm={() => {
                setShowModal(false);
                }}
            />
        </div>
    );
};
