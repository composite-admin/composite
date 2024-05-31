"use client";

import { useGetProjectById } from "@/hooks/useSelectOptions";
import useClientStore from "@/store/client/useClientStore";
import { formatDate } from "@/utils/formatDate";
import * as React from "react";

export default function ProjectDetails() {
  const { projectDetails } = useClientStore();
  const isDateField = (key: string) => {
    const dateFields = [
      "createdAt",
      "end_date",
      "updatedAt",
      "start_date",
      "date_added",
    ];
    return dateFields.includes(key);
  };

  const renderProjectDetail = (key: string, value: any) => (
    <div className="flex justify-between flex-col">
      <span className="self-start items-start justify-end block w-full capitalize font-semibold">
        {key.replace(/\_/g, " ")}
      </span>
      <span className="self-start items-start justify-end block w-full text-textColor">
        {isDateField(key) && value
          ? formatDate(value)
          : key === "project_code"
          ? value.toUpperCase()
          : typeof value === "object"
          ? JSON.stringify(value)
          : value}
      </span>
    </div>
  );

  // Create an array of keys you want to display
  const keysToDisplay = [
    "project_name",
    "project_code",
    "address",
    "state",
    "project_duration",
    "start_date",
    "end_date",
    "project_description",
    "comment",
  ];

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-5 py-10">
      {projectDetails ? (
        <div className="grid md:grid-cols-2 gap-8 mx-auto">
          <div className="space-y-8">
            {Object.entries(projectDetails)
              .filter(([key]) => keysToDisplay.includes(key))
              .slice(0, keysToDisplay.length / 2)
              .map(([key, value], index) => (
                <React.Fragment key={index}>
                  {renderProjectDetail(key, value)}
                </React.Fragment>
              ))}
          </div>
          <div className="space-y-8">
            {Object.entries(projectDetails)
              .filter(([key]) => keysToDisplay.includes(key))
              .slice(keysToDisplay.length / 2)
              .map(([key, value], index) => (
                <React.Fragment key={index}>
                  {renderProjectDetail(key, value)}
                </React.Fragment>
              ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}