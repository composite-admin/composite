import { Modal } from "@/components/shared/Modal";
import useCashAdvanceStore from "@/store/cash-advance/useCashAdvanceStore";
import RequestIOUForm from "./RequestIOUForm";
import RefundRequestOrIOUForm from "./RefundRequestOrIOUForm";
import ReturnCashAdvance from "./ReturnCashAdvance";

export default function AdvancesModals() {
  const { isOpen, onClose, currentFormType, setFormTypes, CashAdvanceDetails } =
    useCashAdvanceStore();
  return (
    <Modal
      title={
        currentFormType === "request"
          ? "Request/IOU"
          : currentFormType === "refund"
          ? "Refund Cash Advance"
          : "Return Cash Advance"
      }
      description="Enter cash details here."
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-3xl"
    >
      {currentFormType === "request" && CashAdvanceDetails && (
        <RequestIOUForm />
      )}
      {currentFormType === "refund" && <RefundRequestOrIOUForm />}
      {currentFormType === "return" && <ReturnCashAdvance />}
    </Modal>
  );
}
