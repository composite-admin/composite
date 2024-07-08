import { useChangePasswordModal } from "@/store/modals/useCreateModal";
import ManageStaffModalIcon from "../icons/ManageStaffModalIcon";
import { Modal } from "../shared/Modal";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import ChangePasswordForm from "../forms/ChangePasswordForm";

export default function ChangePasswordModal() {
  const { isOpen, onClose } = useChangePasswordModal();
  //   const passwordStatus = getCookie("pwd_status");
  const passwordStatus = "0";

  return (
    <Modal
      title="Change Password"
      description="You are required to set a new password on your first login"
      isOpen={passwordStatus === "0" ? false : false}
      onClose={onClose}
      classname="max-w-md"
    >
      <ChangePasswordForm />
    </Modal>
  );
}
