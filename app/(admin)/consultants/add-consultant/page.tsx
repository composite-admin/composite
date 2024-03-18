import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";

export default function page() {
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div>
        <FormContainer
          title="Add new consultant"
          description=""
          isColumn={true}
        >
          <form></form>
        </FormContainer>
      </div>
    </div>
  );
}
