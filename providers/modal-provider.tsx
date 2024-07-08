"use client";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { AddAndEditApartmentModal } from "@/components/Modals/AddAndEditApartmentModal";
import { DetailsModal } from "@/components/Modals/inventory/DetailsModal";
import ChangePasswordModal from "@/components/Modals/ChangePasswordModal";

// Lazy-loaded components
const SuccesModal = lazy(() => import("@/components/Modals/SuccesModal"));
const AddAndEditBreakdownModal = lazy(
  () => import("@/components/Modals/cash-advance/AddAndEditBreakdownModal")
);
const ProjectSuccessModal = lazy(
  () => import("@/components/Modals/projects/ProjectSuccessModal")
);
const AddCommentModal = lazy(
  () => import("@/components/Modals/requests/AddCommentModal")
);
const UpdateRequestModal = lazy(
  () => import("@/components/Modals/requests/UpdateRequestModal")
);
const AddProjectModal = lazy(
  () => import("@/components/Modals/projects/AddProjectModal")
);
const AddContractorModal = lazy(
  () => import("@/components/Modals/projects/AddContractorModal")
);
const AddMaterial = lazy(
  () => import("@/components/Modals/projects/AddMaterialModel")
);
const AddStakeHolderModal = lazy(
  () => import("@/components/Modals/projects/AddStakeholderModel")
);
const AddStartUp = lazy(
  () => import("@/components/Modals/projects/AddStartUpModal")
);
const UpdateProjectModal = lazy(
  () => import("@/components/Modals/projects/UpdateProject")
);
const AddWorkerModal = lazy(
  () => import("@/components/Modals/projects/AddWorkerModal")
);
const EditFlatModal = lazy(
  () => import("@/components/Modals/faclility/EditFlatModal")
);
const ProjectDetailsPageFormModal = lazy(
  () => import("@/components/Project/ProjectDetailsPageFormModal")
);
const AddToProjectModal = lazy(
  () => import("@/components/Modals/AddToProjectModal")
);
const RequestApprovalModal = lazy(
  () =>
    import(
      "@/app/(admin)/requests/request-details/[id]/forms/RequestApprovalModal"
    )
);
const AdvancesModals = lazy(
  () =>
    import(
      "@/app/(admin)/cash-advance/details/(forms_and_modals)/AdvancesModals"
    )
);
const ClientModal = lazy(
  () => import("@/app/(client)/client/project/ClientModal")
);
const TableActionModal = lazy(
  () => import("@/components/Modals/TableActionModal")
);
const IDModal = lazy(() => import("@/components/Modals/IdModal"));

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
