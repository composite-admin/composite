import ChangePasswordForm from "@/components/forms/ChangePasswordForm";
import FormContainer from "@/components/shared/FormContainer";

export default function page() {
  return (
    <FormContainer
      title="Change Password"
      description="Set a new password here"
    >
      <div>
        <ChangePasswordForm />
      </div>
    </FormContainer>
  );
}
