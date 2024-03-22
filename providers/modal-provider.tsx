"use client";
import { DetailsModal } from "@/components/Modals/inventory/DetailsModal";
import SuccesModal from "@/components/Modals/SuccesModal";
import { TestModal } from "@/components/Modals/TestModal";
import AddAndEditBreakdownModal from "@/components/Modals/cash-advance/AddAndEditBreakdownModal";
import ProjectSuccessModal from "@/components/Modals/projects/ProjectSuccessModal";
import AddCommentModal from "@/components/Modals/requests/AddCommentModal";
import UpdateRequestModal from "@/components/Modals/requests/UpdateRequestModal";
import { useEffect, useState } from "react";
import AddProjectModal from "@/components/Modals/projects/AddProjectModal";


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
      <AddAndEditBreakdownModal/>
      <ProjectSuccessModal />
      <AddProjectModal />
      <SuccesModal/>
    </>
  );
};
