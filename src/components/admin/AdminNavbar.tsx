import React from "react";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider.tsx";

export const AdminNavbar: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="flex w-full pt-2 px-10 justify-between items-center">
      <button onClick={handleHome}>
        <HomeIcon className="w-6 h-6" />
      </button>
      <button
        onClick={logout}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Log out
      </button>
    </div>
  );
};

export default AdminNavbar;
