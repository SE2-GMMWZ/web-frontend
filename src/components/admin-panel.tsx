import React from 'react';
import { AdminCard } from './admin-panel-card.tsx';
import { AdminNavbar } from "./admin-panel-navbar.tsx";

export const AdminPanel: React.FC = () => {
  const cards = [
    { title: 'Dock offers' },
    { title: 'Users' },
    { title: 'Bookings' },
    { title: 'Guides' },
  ];

  return (
    <div className="p-6 flex flex-col items-center">
        <AdminNavbar />
        <p className="text-2xl mb-5"> This is Admin panel! </p>
        <div className="grid grid-cols-2 gap-10 max-w-md mx-auto">
            {cards.map((card) => (
            <AdminCard cardName={card.title} />
            ))}
        </div>
    </div>
  );
};
