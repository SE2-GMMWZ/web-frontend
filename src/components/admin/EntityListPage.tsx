import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar.tsx";
import AdminSearchBar from "./AdminSearchBar.tsx";
import AdminCardList from "./AdminCardList.tsx";
import DeleteModal from "./DeleteModal.tsx";
import Pagination from "../Pagination.tsx";
import PageSelector from "../PageSelector.tsx";

type AdminEntityListPageProps<T> = {
  title: string;
  searchPlaceholder: string;
  items: T[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  error: any;
  setSearch: (val: string) => void;
  setPage: (val: number) => void;
  searchValue: string;
  deleteItem: (id: string) => Promise<void>;
  getId: (item: T) => string;
  getViewPath: (item: T) => string;
  CardComponent: React.ComponentType<{
      item: T;
      onView: (item: T) => void;
      onDelete: (item: T) => void;
  }>;
  extraFilters?: React.ReactNode;
};

export default function AdminEntityListPage<T>({ title, searchPlaceholder, items, 
    page, totalPages, isLoading, error, setSearch, setPage, searchValue, deleteItem,
    getId, getViewPath, CardComponent, extraFilters }: AdminEntityListPageProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!selectedItem) return;
    await deleteItem(getId(selectedItem));
    setShowModal(false);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <AdminNavbar />
      <p className="text-2xl mb-5 font-bold">Review {title}</p>
      <p className="text-xl mb-2">Search for a {title.toLowerCase().slice(0, -1)}</p>

      <div className="flex items-center gap-4 mb-4">
        <AdminSearchBar
          value={searchValue}
          onChange={setSearch}
          onClear={() => setSearch("")}
          placeholder={searchPlaceholder}
        />
        {extraFilters}
      </div>

      <AdminCardList
        items={items}
        onView={(item) => navigate(getViewPath(item))}
        onDelete={(item) => {
          setSelectedItem(item);
          setShowModal(true);
        }}
        CardComponent={CardComponent}
      />

      {!isLoading && !error && (
        <Pagination currentPage={page} setPage={setPage} totalPages={totalPages} />
      )}

      <PageSelector currentPage={page} totalPages={totalPages} setPage={setPage} />

      <DeleteModal
        isOpen={showModal}
        title={`Are you sure you want to delete ${title.toLowerCase().slice(0, -1)} "${selectedItem ? getId(selectedItem) : ""}"?`}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
