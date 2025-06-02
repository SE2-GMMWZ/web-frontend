import { useParams } from "react-router-dom";
import EntityDetailsPage from "../../components/admin/EntityDetailsPage.tsx";
import { GuideEnriched } from "../../types/guide.tsx";
import useGuideDetails from "../../hooks/useGuideDetails.tsx";

export default function GuideDetails() {
  const { guideId } = useParams();

  return (
    <EntityDetailsPage<GuideEnriched>
      title="Guide Details"
      backPath="/admin/guides"
      idParam={guideId!}
      useDetailsHook={useGuideDetails}
      fields={[
        { name: "guide_id", readOnly: true, leftAlign: false },
        { name: "title", readOnly: false, leftAlign: true },
        { name: "author_id", readOnly: true, leftAlign: false },
        { name: "author_name", readOnly: true, leftAlign: false },
        { name: "publication_date", readOnly: true, leftAlign: false },
        { name: "content", multiline: true, readOnly: false, leftAlign: true },
        { name: "is_approved", options: ["Yes", "No"], readOnly: false, leftAlign: true },
      ]}
    />
  );
}
