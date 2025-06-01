import React from "react";

interface PaginationProps {
  currentPage: number;
  setPage: (page: number) => void;
  hasNextPage: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage, hasNextPage }) => {
  return (
    <div className="mt-6 flex justify-center gap-4">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
      >
        Previous
      </button>
      <span className="px-2 py-2 text-gray-700 font-semibold">Page {currentPage}</span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
