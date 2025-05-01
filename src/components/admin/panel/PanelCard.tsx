import React from "react";
import { useNavigate } from "react-router-dom";

type AdminPanelCardProps = {
  cardName: string;
  link: string;
};

export const AdminPanelCard: React.FC<AdminPanelCardProps> = ({
  cardName,
  link,
}) => {
  const navigate = useNavigate();
  return (
    <div className="border rounded-lg p-6 flex flex-col items-center shadow">
      <p className="mb-4 font-semibold">{cardName}</p>
      <button
        onClick={() => navigate(link)}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Check
      </button>
    </div>
  );
};

export default AdminPanelCard;
