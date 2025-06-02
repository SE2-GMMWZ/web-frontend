import { HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EditorNavbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center px-8 py-3 shadow bg-white">

      <div className="flex items-center gap-2">
        <HomeIcon onClick={() => navigate("/editor")} className="w-6 h-6 hover:cursor-pointer" />
      </div>

      <div className="flex-1 flex justify-center gap-6 text-sm text-gray-700">
        <button onClick={() => navigate("/editor")} className="hover:text-black">My Guides</button>
        <button onClick={() => navigate("/editor/add-guide")} className="hover:text-black">New Guide</button>
      </div>

      <div className="w-6 h-6" />
    </nav>
  );
};
