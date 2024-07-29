"use client";
import React, { useState, useEffect } from "react";
import { AddAndEditApartmentModal } from "@/components/Modals/AddAndEditApartmentModal";
import { DetailsModal } from "@/components/Modals/inventory/DetailsModal";
import ChangePasswordModal from "@/components/Modals/ChangePasswordModal";
import AddPrivilegeModal from "@/components/Modals/AddPrivilegeModal";
import SuccesModal from "@/components/Modals/SuccesModal";
import AddAndEditBreakdownModal from "@/components/Modals/cash-advance/AddAndEditBreakdownModal";
import ProjectSuccessModal from "@/components/Modals/projects/ProjectSuccessModal";
import AddCommentModal from "@/components/Modals/requests/AddCommentModal";
import UpdateRequestModal from "@/components/Modals/requests/UpdateRequestModal";
import AddProjectModal from "@/components/Modals/projects/AddProjectModal";
import AddContractorModal from "@/components/Modals/projects/AddContractorModal";
import AddMaterial from "@/components/Modals/projects/AddMaterialModel";
import AddStakeHolderModal from "@/components/Modals/projects/AddStakeholderModel";
import AddStartUp from "@/components/Modals/projects/AddStartUpModal";
import AddWorkerModal from "@/components/Modals/projects/AddWorkerModal";
import EditFlatModal from "@/components/Modals/faclility/EditFlatModal";
import ProjectDetailsPageFormModal from "@/components/Project/ProjectDetailsPageFormModal";
import AddToProjectModal from "@/components/Modals/AddToProjectModal";
import RequestApprovalModal from "@/app/(admin)/requests/request-details/[id]/forms/RequestApprovalModal";
import IDModal from "@/components/Modals/IdModal";
import ClientModal from "@/app/(client)/client/project/ClientModal";
import UpdateProjectModal from "@/components/Modals/projects/UpdateProject";
import TableActionModal from "@/components/Modals/TableActionModal";
import AdvancesModals from "@/app/(admin)/cash-advance/details/(forms_and_modals)/AdvancesModals";

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
      <AddPrivilegeModal />
      <IDModal />
      <AddAndEditApartmentModal />
      <ClientModal />
      <EditFlatModal />
      <AddCommentModal />
      <UpdateRequestModal />
      <DetailsModal />
      <AddAndEditBreakdownModal />
      <ProjectSuccessModal />
      <AddProjectModal />
      <SuccesModal />
      <AddContractorModal />
      <AddMaterial />
      <AddStakeHolderModal />
      <AddStartUp />
      <UpdateProjectModal />
      <AddWorkerModal />
      <ProjectDetailsPageFormModal />
      <AddToProjectModal />
      <RequestApprovalModal />
      <TableActionModal />
      <AdvancesModals />
    </>
  );
};
