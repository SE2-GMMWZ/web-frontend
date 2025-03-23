import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';
import { AdminCard } from './admin-panel-card.tsx';

export const AdminPanel: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login/admin');
  };

  const handleHome = () => {
    navigate('/');
  };

  const cards = [
    { title: 'Dock offers' },
    { title: 'Users' },
    { title: 'Bookings' },
    { title: 'Guides' },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <button onClick={handleHome}>
          <HomeIcon className="w-6 h-6" />
        </button>
        <h1 className="text-lg">This is the Admin Panel</h1>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-1 rounded"
        >
          Log out
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
        {cards.map((card) => (
          <AdminCard cardName={card.title} />
        ))}
      </div>
    </div>
  );
};
