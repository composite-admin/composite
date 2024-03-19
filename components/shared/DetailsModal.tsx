"use client";

import { useTestModalStore } from "@/hooks/UseTestModal";
import { Modal } from "../shared/Modal";

interface DetailsModalProps{
    title: string,
    description: string,
    children: any
}

export const DetailsModal = ({title, description, children}: DetailsModalProps) => {
  const testModal = useTestModalStore();
  return (
    <Modal
      title={title}
      description={description}
      isOpen={true}
      onClose={testModal.onClose}
    >
      {children}
    </Modal>
  );
};
