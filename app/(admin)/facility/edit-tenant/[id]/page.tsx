import EditTenantForm from "@/components/forms/MultiStepFoms/EditTenantForm";

type props = {
  params: {
    id: string;
  };
};

export default function EditTEnantPage({ params: { id } }: props) {
  return <EditTenantForm id={id} />;
}
