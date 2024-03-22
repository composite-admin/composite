"use client";

import { useTestModalStore } from "@/hooks/UseTestModal";
import { Modal } from "../../shared/Modal";
import ViewDetails from "../../shared/ViewDetails";
import keys from "@/app/(admin)/inventory/keys";
import { useInventoryDetails } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";

export const DetailsModal = () => {
  const isOpen = useInventoryDetails((state) => state.isOpen);
  const onClose = useInventoryDetails((state) => state.onClose);

  const router = useRouter();
  return (
    <Modal
      title=""
      description=''
      isOpen={isOpen}
      onClose={onClose}
      classname="w-3/4"
    >
      <ViewDetails
        title="Inventory Details"
        dateSubmitted="6th July, 2023"
        editAction={()=> {router.push("/inventory/899/update"); onClose()}}
        keys={keys}
      />
    </Modal>
  );
};
