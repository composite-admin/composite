import AddNewClientForm from "@/components/forms/AddNewClientForm";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

export default function AddNewClientPage() {
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "client"
  )?.can_create;

  if (!CAN_CREATE) {
    return <BlockEdiComponent />;
  }

  return (
    <>
      <GoBack />
      <AddNewClientForm />
    </>
  );
}
