"use client";

import { useGetProjectById } from "@/hooks/useSelectOptions";
import useClientStore from "@/store/client/useClientStore";
import { formatDate } from "@/utils/formatDate";

export default function ProjectDetails() {
  const { projectDetails } = useClientStore();

  return (
    <div className="p-4 bg-white -Color shadow-lg rounded-lg mt-5 py-10">
      <div className="grid md:grid-cols-2 gap-8  w-4/5">
        <div className=" space-y-8">
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Project Code
            </span>
            <span className="self-start items-start justify-end block  w-full uppercase">
              {projectDetails?.project_code}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Start Date
            </span>
            <span className="self-start items-start justify-end block  w-full uppercase">
              {projectDetails?.start_date}
            </span>
          </p>{" "}
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Address
            </span>
            <span className="self-start items-start justify-end block  w-full uppercase">
              {projectDetails?.address}
            </span>
          </p>{" "}
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              State
            </span>
            <span className="self-start items-start justify-end block  w-full uppercase">
              {projectDetails?.state}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Duration
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {projectDetails?.project_duration} Days
            </span>
          </p>
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Project Description
            </span>
            <span className="self-start items-start justify-end block  w-full uppercase">
              {projectDetails?.project_description}
            </span>
          </p>{" "}
        </div>
        <div className=" space-y-8">
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Date Added
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {formatDate(projectDetails?.createdAt)}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              End Date
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {formatDate(projectDetails?.end_date)}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              City
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {projectDetails?.city}
            </span>
          </p>{" "}
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              LGA
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {projectDetails?.lga}
            </span>
          </p>{" "}
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Status
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {projectDetails?.status}
            </span>
          </p>{" "}
          <p className="flex justify-between">
            <span className="self-start items-start justify-end block  w-full ">
              Comment
            </span>
            <span className="self-start items-start justify-end block  w-full ">
              {projectDetails?.comment ?? "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
