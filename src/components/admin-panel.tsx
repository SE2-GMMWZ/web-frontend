import React from 'react';
import { AdminCard } from './admin-panel-card.tsx';
import { AdminNavbar } from "./admin-panel-navbar.tsx";

export const AdminPanel: React.FC = () => {
  const cards = [
    { title: 'Dock offers', link: '/admin/docks' },
    { title: 'Users', link: '/admin' },
    { title: 'Bookings', link: '/admin/bookings' },
    { title: 'Guides', link: '/admin' },
  ];

  return (
    <div className="p-6 flex flex-col items-center">
        <AdminNavbar />
        <p className="text-2xl mb-5"> This is Admin panel! </p>
        <div className="grid grid-cols-2 gap-10 max-w-md mx-auto">
            {cards.map((card) => (
            <AdminCard cardName={card.title} link={card.link} />
            ))}
        </div>
    </div>
  );
};
