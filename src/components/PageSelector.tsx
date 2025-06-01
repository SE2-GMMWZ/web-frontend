import React from "react";

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ currentPage, totalPages, setPage }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const page = parseInt(e.target.value, 10);
    if (!isNaN(page)) {
      setPage(page);
    }
  };

  return (
    <div className="mt-4 flex items-center gap-2 text-sm">
      <label htmlFor="page-select">Go to page:</label>
      <select
        id="page-select"
        value={currentPage}
        onChange={handleChange}
        className="border px-2 py-1 rounded"
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            Page {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PageSelector;
