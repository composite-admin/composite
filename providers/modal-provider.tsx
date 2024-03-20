"use client";
import { DetailsModal } from "@/components/Modals/DetailsModal";
import { TestModal } from "@/components/Modals/TestModal";
import AddCommentModal from "@/components/Modals/requests/AddCommentModal";
import UpdateRequestModal from "@/components/Modals/requests/UpdateRequestModal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!ismounted) {
    return null;
  }

  return (
    <>
      <TestModal />
      <AddCommentModal />
      <UpdateRequestModal/>
      <DetailsModal/>
    </>
  );
};
