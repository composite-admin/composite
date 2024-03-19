import ConsultantForm from "@/components/forms/ConsultantForm";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";

export default function EditConsultantPage() {
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div>
      <ConsultantForm isEdit={true}/>
      </div>
    </div>
  );
}
