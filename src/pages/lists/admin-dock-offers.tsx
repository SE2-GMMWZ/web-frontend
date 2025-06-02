import useDockingSpots from "../../hooks/useDockingSpots.tsx";
import AdminEntityListPage from "../../components/admin/EntityListPage.tsx";
import { DockingSpotEnriched } from "../../types/docking-spot.tsx";
import DockCard from "../../components/admin/cards/DockCard.tsx";

export default function AdminDockingSpots() {
  const { dockingSpots, isLoading, error, page, search, totalPages, 
    deleteDockingSpot, setSearch, setPage } = useDockingSpots();

  return (
    <AdminEntityListPage<DockingSpotEnriched>
      title="Docking Spots"
      searchPlaceholder="Search docking spots (by owner id) ..."
      items={dockingSpots}
      page={page}
      totalPages={totalPages}
      isLoading={isLoading}
      error={error}
      setSearch={setSearch}
      searchValue={search}
      setPage={setPage}
      deleteItem={deleteDockingSpot}
      getId={(dock) => dock.dock_id}
      getViewPath={(dock) => `/admin/dock/${dock.dock_id}`}
      CardComponent={DockCard}
    />
  );
}
