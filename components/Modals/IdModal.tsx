"use client";
import { useIdModal } from "@/store/modals/useCreateModal";
import { Modal } from "../shared/Modal";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import { useIsFetching } from "@tanstack/react-query";

export default function IDModal() {
  const { isOpen, onClose } = useIdModal();
  const { clientDetailsData } = useManageClientStore();
  const isFetching = useIsFetching();
  return (
    <Modal
      title="Client ID"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-xl"
    >
      <div>
        {isFetching ? (
          <div className="w-full h-full flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="flex justify-center items-center">
            {clientDetailsData?.id_image === null ||
            !clientDetailsData?.id_image ? (
              <div className="w-full h-full flex justify-center items-center">
                <p className="text-xl font-semibold">
                  No ID Image Uploaded yet{" "}
                </p>
              </div>
            ) : (
              <img
                src={clientDetailsData?.id_image}
                alt="ID"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
