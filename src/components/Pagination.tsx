import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
      >
        Previous
      </button>
      <span className="px-2 py-2 text-gray-700 font-semibold">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
