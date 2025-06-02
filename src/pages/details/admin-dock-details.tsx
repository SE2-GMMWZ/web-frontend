import { useParams } from "react-router-dom";
import EntityDetailsPage from "../../components/EntityDetailsPage.tsx";
import { DockingSpotEnriched } from "../../types/docking-spot.tsx";
import useDockingSpotDetails from "../../hooks/useDockingSpotDetails.tsx";

export default function DockingSpotDetails() {
  const { dockId } = useParams();

  return (
    <EntityDetailsPage<DockingSpotEnriched>
      title="Docking Spot Details"
      backPath="/admin/docks"
      idParam={dockId!}
      useDetailsHook={useDockingSpotDetails}
      fields={[
        { name: "dock_id", readOnly: true, leftAlign: false },
        { name: "name", readOnly: false, leftAlign: true },
        { name: "owner_id", readOnly: true, leftAlign: false },
        { name: "owner_name", readOnly: true, leftAlign: false },
        { name: "description", multiline: false, readOnly: true, leftAlign: true },
        { name: "availability", readOnly: false, leftAlign: true },
        { name: "price_per_night", readOnly: false, leftAlign: true },
        { name: "price_per_person", readOnly: false, leftAlign: true },
        { name: "services", readOnly: false, leftAlign: true },
        { name: "services_pricing", readOnly: false, leftAlign: true },
      ]}
    />
  );
}
