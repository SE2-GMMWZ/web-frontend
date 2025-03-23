import React, { useState } from 'react';
import { AdminNavbar } from "./admin-panel-navbar.tsx";
import { SearchBar } from "./admin-search-bar.tsx";
import { BookingList } from "./admin-booking-list.tsx";
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from "./admin-delete-modal.tsx";

export const AdminBookings: React.FC = () => {
    const [search, setSearch] = useState('');
    const redirect = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const allBookings = [
        { id: '1', title: 'Big Dock', location: 'Dock A', user: 'Abraham Lincol',
            dateStart: '2022-01-01', dateEnd: '2022-01-02',
            imageUrl: 'https://helloartsy.com/wp-content/uploads/kids/beach/how-to-draw-a-dock/how-to-draw-a-dock-step-9.jpg'},
        { id: '2', title: 'Docky dock', location: 'Dock B', user: 'Winston Churchill',
            dateStart: '2023-02-03', dateEnd: '2023-02-04',
            imageUrl: 'https://thumbs.dreamstime.com/b/sunset-river-boat-dock-flying-birds-against-clouds-setting-sun-hand-painted-watercolor-illustration-paper-texture-141681745.jpg'},
    ];

    const filtered = allBookings.filter((booking) =>
        booking.title.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="p-6 flex flex-col items-center">
            <AdminNavbar />
            <p className="text-2xl mb-5 font-bold"> Review Bookings</p>
            <p className="text-xl mb-5"> Search for a booking</p>
            <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search bookings..."
            />
            <BookingList
                items={filtered}
                onView={(dock) => redirect(`/admin/dock/${dock.id}`)}
                onDelete={(dock) => setShowModal(true)}
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
