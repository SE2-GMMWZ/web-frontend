import React, { useState } from 'react';
import { AdminNavbar } from "./admin-panel-navbar.tsx";
import { SearchBar } from "./admin-search-bar.tsx";
import { UserList } from "./admin-users-list.tsx";
import { useNavigate } from 'react-router-dom';
import { DeleteModal } from "./admin-delete-modal.tsx";

export const AdminUsers: React.FC = () => {
    const [search, setSearch] = useState('');
    const redirect = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const allUsers = [
        { id: '1', name: 'Tony', surname: 'Stark', username: 'IronMan',
            imageUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2017/03/superior-iron-man.jpg'},
        { id: '2', name: 'Bruce', surname: 'Banner', username: 'Hulk',
            imageUrl: 'https://cosmicbook.news/wp-content/uploads/2025/01/marvel-world-war-hulk-rumors.webp'},
    ];

    const filtered = allUsers.filter((user) =>
        user.username.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div className="p-6 flex flex-col items-center">
            <AdminNavbar />
            <p className="text-2xl mb-5 font-bold"> Review Users</p>
            <p className="text-xl mb-5"> Search for a user</p>
            <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch('')}
            placeholder="Search users..."
            />
            <UserList
                items={filtered}
                onView={(user) => redirect(`/admin/users/${user.id}`)}
                onDelete={(user) => setShowModal(true)}
            />
            <DeleteModal
                isOpen={showModal}
                title="Are you sure you want to delete [User X]?"
                onCancel={() => setShowModal(false)}
                onConfirm={() => {
                setShowModal(false);
                }}
            />
        </div>
    );
};
