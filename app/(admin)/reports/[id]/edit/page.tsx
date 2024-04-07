"use client";
import GoBack from "@/components/shared/GoBack";
import useAddReportMutation from "@/mutations/AddReportMutation";
import { useSuccessModal } from "@/store/inventory/UseInventoryModal";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiBellAlert } from "react-icons/hi2";

export default function ReportEditPage() {
  const onOpen = useSuccessModal((state) => state.onOpen);
  const router = useRouter();

  const {action, isSuccess} = useAddReportMutation()

  const [formData, setFormData] = useState({
    report_type: "",
    project_name: "",
    report_summary: "",
    project_supervisor: "",
    challenges: "",
    solutions: "",
    recommendation: "",
    materials_on_site: "",
    visitors: "",
    weather: "",
    photograph_id: "",
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log(formData);
    action(formData)
  };

  useEffect(()=> {
    if(isSuccess){
      onOpen()
    }
  }, [isSuccess])

  return (
    <>
      <GoBack />
      <div className="my-5 rounded-lg border border-outline bg-white p-[29px]">
        <div className="grid grid-cols-[1fr_3fr] gap-10 pb-10">
          <div className="flex gap-3 flex-col">
            <div className="">
              <h2 className="text-textColor2 text-[16px] font-[600]">
                Edit Report
              </h2>
              <p className="text-sm text-textColor">
                Update report details here.
              </p>
            </div>

            <button
              className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit"
              onClick={() => handleSubmit()}
            >
              Submit Changes
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <p className="value">Report Type</p>
              <div className="flex items-center gap-5 radio my-2">
                <div>
                  <input
                    type="radio"
                    name="report_type"
                    id="Daily"
                    value="daily"
                    onChange={handleInputChange}
                  />
                  <p>Daily</p>
                </div>

                <div>
                  <input
                    type="radio"
                    name="report_type"
                    id="Weekly"
                    value="weekly"
                    onChange={handleInputChange}
                  />
                  <p>Weekly</p>
                </div>

                <div>
                  <input
                    type="radio"
                    name="report_type"
                    id="Monthly"
                    value="monthly"
                    onChange={handleInputChange}
                  />
                  <p>Monthly</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 edit">
              <div className="flex flex-col">
                <p className="value">Project</p>

                <select
                  name="project"
                  id="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                >
                  <option value="Bode Peters">Bode Peters</option>
                </select>
              </div>

              <div className="flex flex-col">
                <p className="value">Project Summary</p>

                <select
                  name="report_summary"
                  id="report_summary"
                  value={formData.report_summary}
                  onChange={handleInputChange}
                >
                  <option value="Bode Peters">Bode Peters</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="value">Project Supervisor</p>
              <select
                name="project_supervisor"
                id="project_supervisor"
                className="w-full"
                value={formData.project_supervisor}
                onChange={handleInputChange}
              >
                <option value="">Abayomi Salomi</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-5 edit-info">
              <div className="flex flex-col gap-2">
                <p className="value">Challenges Encountered</p>
                <textarea
                  name="challenges"
                  id="challenges"
                  value={formData.challenges}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <p className="value">Proffered Solution</p>
                <textarea
                  name="solutions"
                  id="solutions"
                  value={formData.solutions}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <p className="value">Future Recommendation</p>
                <textarea
                  name="recommendation"
                  id="recommendation"
                  value={formData.recommendation}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <p className="value">Equipment on Site / Status</p>
                <textarea
                  name="materials_on_site"
                  id="materials_on_site"
                  value={formData.materials_on_site}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <p className="value">Visitors to Site</p>
                <textarea
                  name="visitors"
                  id="visitors"
                  value={formData.visitors}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2">
                <p className="value">Weather Report</p>
                <textarea
                  name="weather"
                  id="weather"
                  value={formData.weather}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2 col-span-2">
                <p className="value">Progress Photograph</p>
                <textarea
                  name="photograph_id"
                  id="photograph_id"
                  value={formData.photograph_id}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button
                className="bg-[#EBEBEB] text-textColor rounded-md"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                className="bg-primaryLight text-white p-4 rounded-md"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {showOverlay && <TestModal />} */}
    </>
  );
}
