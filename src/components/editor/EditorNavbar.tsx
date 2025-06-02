import React from 'react';
import { HomeIcon } from 'lucide-react';

const EditorNavbar: React.FC = () => {
    const imageSource = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnSytzsSatQW-w-cHvryCPZP_Z21ScNlUl1w&s";
  return (
    <nav className="flex items-center justify-between px-6 py-3 shadow bg-white">
      <div className="flex items-center gap-2">
        <HomeIcon className="w-6 h-6" />
      </div>
      <div className="flex gap-6 text-sm text-gray-700">
        <button className="hover:text-black">My Guides</button>
        <button className="hover:text-black">Resources</button>
        <button className="hover:text-black">New Guide</button>
        <button className="hover:text-black">Contact</button>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={imageSource}
          alt="Profile"
          className="w-8 h-8 rounded-full object-cover"
        />
        <div className="text-right leading-tight">
          <p className="text-sm font-medium text-gray-700 text-left">Editor</p>
          <p className="text-xs text-gray-400">Hey Mark!</p>
        </div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
