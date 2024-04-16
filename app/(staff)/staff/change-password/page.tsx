import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";

export default function ChangePasswordPage() {
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <FormContainer
        title="Change Password"
        description="Set a new password here"
        isColumn={false}
      >
        <div>
          <ChangePasswordForm />
        </div>
      </FormContainer>
    </div>
  );
}
