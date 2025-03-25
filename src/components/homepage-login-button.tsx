import React from "react";
import { useNavigate } from "react-router-dom";

type LoginButtonProps = {
  userType: string;
};

export const LoginButton: React.FC<LoginButtonProps> = ({ userType }) => {
  const navigate = useNavigate();
  return (
    <button
    onClick={() => navigate(`/login/${userType}`)}
    className="flex flex-row items-center gap-4 px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition">
      {userType === 'Admin' ? 'Log in as Admin' : 'Log in as Editor'}
    </button>
  );
};



export default LoginButton;