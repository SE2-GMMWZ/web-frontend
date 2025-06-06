import { useNavigate } from "react-router-dom";


export default function LoginButton() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/login/`)}
      className="flex flex-row items-center gap-4 px-4 pt-2 pb-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
    >
      Login
    </button>
  );
};
