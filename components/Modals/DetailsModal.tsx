"use client";

import { useTestModalStore } from "@/hooks/UseTestModal";
import { Modal } from "../shared/Modal";
import ViewDetails from "../shared/ViewDetails";
import keys from "@/app/(admin)/inventory/keys";

export const DetailsModal = () => {
  const testModal = useTestModalStore();
  return (
    <Modal
      title="Inventory"
      description='description="Check Inventory"'
      isOpen={false}
      onClose={testModal.onClose}
      classname="max-w-2xl"
    >
      <ViewDetails
        title="Inventory Details"
        dateSubmitted="6th July, 2023"
        editAction={null}
        keys={keys}
      />
    </Modal>
  );
};
