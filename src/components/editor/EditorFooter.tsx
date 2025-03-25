import React from 'react';

const EditorFooter: React.FC = () => {
    return (
        <footer className="border-t mt-12 px-8 py-6 bg-white">
          <div className="max-w-screen-lg mx-auto grid grid-cols-2 gap-8 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="hover:underline cursor-pointer">Contact Admin</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <p className="hover:underline cursor-pointer">Your photos</p>
              <p className="hover:underline cursor-pointer">Your drafts</p>
            </div>
          </div>
        </footer>
      );
    };

export default EditorFooter;