"use client"
import GoBack from "@/components/shared/GoBack";
import React, { useEffect } from "react";
import {
  useAddContractorModal,
  useAddMaterial,
  useAddStakeHolderModal,
  useAddStartupModal,
} from "@/store/inventory/UseInventoryModal";
import { useRouter, useParams } from "next/navigation";
import useProjectActionsStore from "@/store/actions/projectActions";
import Image from "next/image";
import ProjectCost from "@/components/Project/ProjectCost";
import ProjectTeam from "@/components/Project/ProjectTeam";
import StartupCost from "@/components/Project/StartupCost";
import Stakeholder from "@/components/Project/Stakeholder";
import Contractor from "@/components/Project/Contractor.tsx";
import Worker from "@/components/Project/Worker";
import Materials from "@/components/Project/Materials";
import ToolsAndMachine from "@/components/Project/ToolsAndMachine";
import CashAdvanced from "@/components/Project/CashAdvanced";
import { useProjectDetailsPageFormModal } from "@/store/project/useProjectModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SingleProject = () => {
  const onOpenAddStakeHolder = useAddStakeHolderModal((state) => state.onOpen);
  const onOpenAddContractor = useAddContractorModal((state) => state.onOpen);
  const onOpenStartupModal = useAddStartupModal((state) => state.onOpen);
  const onOpenAddMaterialMOdal = useAddMaterial((state) => state.onOpen);
  const { setProjectName, setCurrentModal, projectCode, projectName } =
    useProjectDetailsPageFormModal();

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
      title: "Add Consultant",
      action: onOpenAddStakeHolder,
      icon: "/./ct.svg",
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
      case "Add Material":
        setCurrentModal("add_material");
        break;
      case "Add Contractor":
        setCurrentModal("add_contractor");
        break;
      case "Add Consultant":
        setCurrentModal("add_consultant");
        break;
      case "Add Worker":
        router.push(`/project/add-worker?name=${projectName}`);
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
    setProjectName(
      selectedItem?.project_name,
      selectedItem?.project_code,
      selectedItem?.id
    );
  }, [
    getAllProjects,
    setProjectName,
    selectedItem?.project_name,
    selectedItem?.project_code,
    selectedItem?.id,
  ]);

  useEffect(() => {
    if (params.id) {
      getProjectById(params.id);
    }
  }, [getProjectById, params.id]);

  return (
    <>
      <GoBack />
      <div className="justify-between relative flex flex-col w-full lg:items-center gap-3 md:flex-row">
        <div>
          <div>
            <div className="flex flex-col gap-1.5">
              <h1 className="font-semibold text-2xl">
                {selectedItem && selectedItem.project_name}
              </h1>
              <p className="uppercase font-semibold text-textColor">
                {selectedItem && selectedItem.project_code}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div>
            <Button
              className=" top-5 right-5 hover:text-primaryLight/80 text-primaryLight border border-primaryLight bg-white font-semibold"
              variant={"outline"}
            >
              View Project Images
            </Button>
          </div>
          <div>
            <Link href={`/project/${selectedItem?.id}/edit`}>
              <Button className="w-max py-2">Edit Project</Button>
            </Link>
          </div>
        </div>
      </div>

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
      <Tabs defaultValue="project_cost">
        <TabsList>
          <TabsTrigger value="project_cost">Project Cost</TabsTrigger>
          <TabsTrigger value="project_team">Project Team</TabsTrigger>
          <TabsTrigger value="start_up_cost">Start-up Cost</TabsTrigger>
          <TabsTrigger value="stakeholder">Stakeholder</TabsTrigger>
          <TabsTrigger value="contractors">Contractors</TabsTrigger>
          <TabsTrigger value="workers">Workers</TabsTrigger>
          <TabsTrigger value="material">Material</TabsTrigger>
          <TabsTrigger value="tool_and_machinery">
            Tool and Machinery
          </TabsTrigger>
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="cash_advance">Cash Advance</TabsTrigger>
        </TabsList>
        <TabsContent value="project_cost">
          <ProjectCost />
        </TabsContent>
        <TabsContent value="project_team">
          <ProjectTeam projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="start_up_cost">
          <StartupCost projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="stakeholder">
          <Stakeholder projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="contractors">
          <Contractor projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="workers">
          <Worker projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="material">
          <Materials projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="tool_and_machinery">
          <ToolsAndMachine />
        </TabsContent>
        <TabsContent value="consultants">
          <Contractor projectCode={projectCode} />
        </TabsContent>
        <TabsContent value="cash_advance">
          <CashAdvanced />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default SingleProject