"use client"
import { DataTable } from '@/components/shared/DataTable'
import GoBack from '@/components/shared/GoBack'
import PageHead from '@/components/ui/pageHead'
import React, { useEffect, useState } from 'react'
import { columns } from '../columns'
import { data } from '../apartment/data'
import { HiDocument } from 'react-icons/hi2'
import { useAddContractorModal, useAddMaterial, useAddProjectModal, useAddStakeHolderModal, useAddStartupModal } from '@/store/inventory/UseInventoryModal'
import StartUpIcon from '@/components/icons/StartUpIcon'
import { useRouter, useParams } from 'next/navigation'
import useProjectActionsStore from "@/store/actions/projectActions"
import Image from 'next/image'
import SwitchTabs, { Key } from '@/components/ui/switchTabs'
import ProjectCost from '@/components/Project/ProjectCost'
import ProjectTeam from '@/components/Project/ProjectTeam'
import StartupCost from '@/components/Project/StartupCost'
import Stakeholder from '@/components/Project/Stakeholder'
import Contractor from '@/components/Project/Contractor.tsx'
import Worker from '@/components/Project/Worker'
import Materials from '@/components/Project/Materials'
import ToolsAndMachine from '@/components/Project/ToolsAndMachine'
import CashAdvanced from '@/components/Project/CashAdvanced'
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";

const SingleProject = () => {
  const onOpenAddStakeHolder = useAddStakeHolderModal((state) => state.onOpen);
  const onOpenAddContractor = useAddContractorModal((state) => state.onOpen);
  const onOpenStartupModal = useAddStartupModal((state) => state.onOpen);
  const onOpenAddMaterialMOdal = useAddMaterial((state) => state.onOpen);
  const { setProjectName, setCurrentModal } = useProjectDetailsPageFormModal();

  const options = [
    {
      title: "Add Startup Cost",
      action: onOpenStartupModal,
      icon: "/./illustration.svg",
    },
    {
      title: "Add Management Member",
      action: onOpenAddStakeHolder,
      icon: "/./addM.svg",
    },
    {
      title: "Add stakeholder",
      action: onOpenAddStakeHolder,
      icon: "/./st.svg",
    },
    {
      title: "Add Worker",
      action: onOpenAddStakeHolder,
      icon: "/./wk.svg",
    },
    {
      title: "Add Material",
      action: onOpenAddMaterialMOdal,
      icon: "/./mt.svg",
    },
    {
      title: "View Apartment",
      action: onOpenAddStakeHolder,
      icon: "/./hs.png",
    },
    {
      title: "View Tenant",
      action: onOpenAddStakeHolder,
      icon: "/./tn.svg",
    },
    {
      title: "View Images",
      action: onOpenAddStakeHolder,
      icon: "/./im.svg",
    },
    {
      title: "Add Contractor",
      action: onOpenAddContractor,
      icon: "/./ct.svg",
    },
  ];

  const showFormModal = (arg: string) => {
    switch (arg) {
      case "Add Startup Cost":
        setCurrentModal("add_startup_cost");
        break;
      case "Add Management Cost":
        setCurrentModal("add_management_cost");
        break;
      case "Add stakeholder":
        setCurrentModal("add_stakeholder");
        break;
      case "Add Worker":
        setCurrentModal("add_worker");
        break;
      case "Add Material":
        setCurrentModal("add_material");
        break;
      case "Add Contractor":
        setCurrentModal("add_contractor");
        break;
      default:
        break;
    }
  };

  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedItem = useProjectActionsStore<any>(
    (state) => state.selectedItem
  );
  const getProjectById = useProjectActionsStore<any>(
    (state) => state.getProjectById
  );
  const projects = useProjectActionsStore<any>((state: any) => state.items);
  const getAllProjects = useProjectActionsStore<any>(
    (state: any) => state.getAllProjects
  );

  useEffect(() => {
    getAllProjects();
    setProjectName(selectedItem?.project_name, selectedItem?.project_code);
  }, [
    getAllProjects,
    setProjectName,
    selectedItem?.project_name,
    selectedItem?.project_code,
  ]);

  useEffect(() => {
    if (params.id) {
      getProjectById(params.id);
    }
  }, [getProjectById, params.id]);

  const keys: Key[] = [
    {
      title: "Project Cost",
      component: <ProjectCost />,
    },
    {
      title: "Project Team",
      component: <ProjectTeam />,
    },
    {
      title: "Startup Cost",
      component: <StartupCost />,
    },
    {
      title: "Stakeholder",
      component: <Stakeholder />,
    },
    {
      title: "Contractor",
      component: <Contractor />,
    },
    {
      title: "Workers",
      component: <Worker />,
    },
    {
      title: "Material",
      component: <Materials />,
    },
    {
      title: "Tools and Machinery",
      component: <ToolsAndMachine />,
    },
    {
      title: "Cash Advanced",
      component: <CashAdvanced />,
    },
  ];

  const [comp, setComp] = useState(<ProjectCost />);

  return (
    <>
      <GoBack />
      <PageHead
        headText={selectedItem && selectedItem.project_name}
        subText={selectedItem && selectedItem.project_code}
        buttonText="Edit Project"
        buttonAction={() =>
          selectedItem && router.push(`/project/${selectedItem.id}/edit`)
        }
      />

      <div className="grid grid-cols-3 gap-5 my-10">
        <div className="col-span-2 bg-white rounded-lg border-[#D0D5DD] ">
          <div className="p-5 border-b border-b-gray-300">
            <h1 className="text-[#101928] text-[18px] font-[600]">
              Project Details
            </h1>
          </div>

          <div className="grid grid-cols-4 p-5 gap-5">
            <div>
              <p className="text-[#475367] text-sm">Project Name:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.project_name}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Project Description:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.project_description}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Project Location:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.project_location}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Start Date:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.start_date}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">End Date:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.end_date}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Project Supervisor:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.project_supervisor}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Status:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.status}
              </p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Comment:</p>
              <p className="text-[#101928] text-[16px] font-[600]">
                {selectedItem && selectedItem.comment}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-[#D0D5DD] grid grid-cols-3 gap-5 text-primaryLight p-5">
          {options.map((item, i) => {
            return (
              <div
                key={i}
                className="flex items-center justify-center flex-col cursor-pointer"
                onClick={() => showFormModal(item.title)}
              >
                <Image alt="" src={String(item.icon)} width={30} height={30} />
                <p className="text-center text-[10.37px] text-[#6E6E6E]">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <SwitchTabs keys={keys} setComp={setComp} />

      <div className="mt-10">{comp}</div>
    </>
  );
};

export default SingleProject