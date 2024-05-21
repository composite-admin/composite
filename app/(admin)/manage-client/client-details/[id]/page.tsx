"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  useGetClientDetails,
  useGetClientProjectData,
} from "@/hooks/useSelectOptions";
import { projectColumns } from "./projectColumn";
import useManageClientStore from "@/store/manage-client/useManageClientStore";
import {
  useAddToProjectModal,
  useIdModal,
} from "@/store/modals/useCreateModal";
import Link from "next/link";
import { useEffect } from "react";

type Params = {
  params: {
    id: string;
  };
};

export default function ClientDetailsPage({ params }: Params) {
  const { setClientDetailsData } = useManageClientStore();
  const { onOpen: onOpenIdImage } = useIdModal();

  const { details, isClientDetailsLoading } = useGetClientDetails(params.id!);
  const { onOpen, setAddToProjectFormType } = useAddToProjectModal();
  const showModal = () => {
    setAddToProjectFormType("client");
    onOpen();
  };

  useEffect(() => {
    if (details) {
      setClientDetailsData(details);
    }
  }, [details, setClientDetailsData]);

  const { ClientProjectDetails, isClientProjectLoading } =
    useGetClientProjectData(params.id);
  return (
    <>
      <GoBack />
      <div>
        <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
          <div className="pt-1 flex gap-2.5">
            <AvatarComponent height="h-16" width="w-16" />
            <div className="flex flex-col">
              <span className="text-responsive font-semibold capitalize">
                {details?.first_name} {details?.last_name}
              </span>
              <span className="text-xs text-subtext uppercase">
                {details?.activation_code}
              </span>
            </div>
          </div>
          <div>
            <Button onClick={onOpenIdImage}>View ID Image</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-6 gap-10 pt-10">
          {/* details */}
          <div className="bg-white rounded-lg md:col-span-4 ">
            <h2 className="border-b p-7 text-lg font-semibold">
              Client Details
            </h2>
            <div className="p-7 grid sm:grid-cols-2 xl:grid-cols-4 gap-5 grid-flow-dense grid-rows-2">
              <div className="flex flex-col gap-1 ">
                <span>Contact Person:</span>
                <span className="font-semibold  md:text-lg capitalize">
                  {details?.first_name} {details?.last_name}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span>Contact Mobile:</span>
                <span className="font-semibold  md:text-lg">
                  {details?.mobile_number}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span>Office Phone:</span>
                <span className="font-semibold  md:text-lg">
                  {details?.phone_number}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span>Email:</span>
                <span className="font-semibold  md:text-lg">
                  {details?.email}
                </span>
              </div>
              <div className="flex flex-col gap-1 ">
                <span>State:</span>
                <span className="font-semibold  md:text-lg">
                  {details?.state}
                </span>
              </div>{" "}
              <div className="flex flex-col gap-1 ">
                <span>Address:</span>
                <span className="font-semibold  md:text-lg">
                  {details?.address}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white flex-col flex max-w-xs rounded-lg md:col-span-2 auto-rows-min min-h-[20rem] md:max-w-full">
            <h2 className="border-b p-7 text-lg font-semibold">
              Client Details
            </h2>

            <div className="flex flex-col">
              <div className="flex gap-5 items-center border-b p-8">
                <div className="flex gap-2 items-center">
                  <AvatarComponent />
                </div>
                <div className="text-primaryLight-500 font-semibold">
                  <Link
                    href={`/manage-client/edit-client/ ${details?.userid}`}
                    className="text-primaryLight-500 font-semibold"
                  >
                    <span className="text-sm">Edit Client Information</span>
                  </Link>
                </div>
              </div>
              <div className="flex gap-5 items-center p-8">
                <div className="flex gap-2 items-center">
                  <AvatarComponent />
                </div>
                <div className="text-primaryLight-500 font-semibold">
                  <span className="text-sm cursor-pointer " onClick={showModal}>
                    Add to Project
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <Tabs defaultValue="project">
          <TabsList>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="comment">Comment</TabsTrigger>
          </TabsList>
          <TabsContent value="project">
            <DataTable
              columns={projectColumns}
              data={ClientProjectDetails ?? []}
            />
          </TabsContent>
          {/* <DataTable columns={columnTwo} data={dataTwo}/> */}
        </Tabs>
      </div>
    </>
  );
}
