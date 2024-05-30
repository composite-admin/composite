import ConsultantForm from "@/components/forms/ConsultantForm";
import GoBack from "@/components/shared/GoBack";

export default function AddConsultantPage() {
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div>
        <ConsultantForm />
      </div>
    </div>
  );
}
