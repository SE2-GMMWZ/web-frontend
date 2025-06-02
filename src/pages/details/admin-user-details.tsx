import { useParams } from "react-router-dom";
import EntityDetailsPage from "../../components/admin/EntityDetailsPage.tsx";
import { UserData } from "../../types/user.tsx";
import useUsersDetails from "../../hooks/useUsersDetails.tsx";

export default function UserDetails() {
  const { userId } = useParams();

  return (
    <EntityDetailsPage<UserData>
      title="User Details"
      backPath="/admin/users"
      idParam={userId!}
      useDetailsHook={useUsersDetails}
      fields={[
        { name: "user_id", readOnly: true, leftAlign: false },
        { name: "name", readOnly: false, leftAlign: true },
        { name: "surname", readOnly: false, leftAlign: true },
        { name: "email", readOnly: true, leftAlign: false },
        { name: "phone_number", readOnly: false, leftAlign: true },
      ]}
    />
  );
}
