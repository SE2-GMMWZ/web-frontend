import React from "react";
import { useNavigate } from "react-router-dom";

type AdminCardProps = {
  cardName: string;
};

export const AdminCard: React.FC<AdminCardProps> = ({ cardName }) => 
{
    return (
        <div
            className="border rounded-lg p-6 flex flex-col items-center shadow"
          >
            <p className="mb-4 font-semibold">{cardName}</p>
            <button className="bg-black text-white px-4 py-1 rounded">
              Check
            </button>
          </div>
    );
}
