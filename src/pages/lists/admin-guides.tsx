import { useGuides } from "../../hooks/useGuides.tsx";
import { GuideCard } from "../../components/admin/cards/GuideCard.tsx";
import AdminEntityListPage from "../../components/admin/EntityListPage.tsx";
import { GuideData } from "../../types/guide.tsx";

export default function AdminGuides() {
  const { guides, isLoading, error, page, search, totalPages,
    deleteGuide, setSearch, setPage, onlyUnapproved, setOnlyUnapproved } = useGuides();

  return (
    <AdminEntityListPage<GuideData>
      title="Guides"
      searchPlaceholder="Search guides (by author id) ..."
      items={guides}
      page={page}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      setSearch={setSearch}
      searchValue={search}
      setPage={setPage}
      deleteItem={deleteGuide}
      getId={(guide) => guide.guide_id}
      getViewPath={(guide) => `/admin/guide/${guide.guide_id}`}
      CardComponent={GuideCard}
      extraFilters={
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={onlyUnapproved}
            onChange={() => setOnlyUnapproved((prev) => !prev)}
          />
          Show guides to approve
        </label>
      }
    />
  );
}
