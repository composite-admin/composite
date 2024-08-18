"use client";
import GoBack from "@/components/shared/GoBack";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useStakeholderActionsStore from "@/store/actions/stakeholdersActions";
import { getStakeholderById } from "@/api/stakeholdersRequests";
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { useGetStakeholderById } from "@/hooks/useSelectOptions";
import axios from "axios";
import { api } from "@/config/api";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

const EditSingleStakeholder = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const { stakeholder } = useGetStakeholderById(Number(params.id));
  const { data } = useStaffPrivilegeStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    values: {
      ...stakeholder,
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["update stakeholder", params.id],
    mutationFn: async (data: any) => {
      try {
        const response = await api.put(`/stakeholder/${params.id}`, data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
    onSuccess: () => {
      toast({
        title: "Stakeholder updated successfully",
        variant: "success",
      });
      router.push("/stakeholders");
    },
  });
  const onSubmit = (data: any) => {
    mutate(data);
  };

  return (
    <>
      <GoBack />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
          <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">
            <h2 className="text-[#101928] font-[600] text-[22px]">
              Edit Stakeholder
            </h2>
            <p>Update Stakeholder Details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Stakeholder Name</p>

              <input
                type="text"
                defaultValue={stakeholder?.stakeholder_name}
                {...register("stakeholder_name", { required: true })}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("stakeholder_address", { required: true })}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Stakeholder Phone</p>

              <input
                {...register("stakeholder_ofc_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.stakeholder_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Contact Person</p>

              <input
                {...register("contact_person", {
                  required: false,
                })}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Contact Home Phone</p>

              <input
                {...register("contact_home_phone", {
                  required: false,
                  validate: (value: any) =>
                    value ? validatePhoneNumber(value) : true,
                })}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Contact Mobile</p>

              <input
                {...register("contact_mobile", {
                  validate: (value: any) =>
                    value ? validatePhoneNumber(value) : true,
                })}
              />
              {errors.contact_mobile && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Government Agency</p>
              <select {...register("government_agencies", { required: true })}>
                <option value="">Select Government Agency Type</option>
                <option value="LASBCA">LASBCA</option>
                <option value="LASTMA">LASTMA</option>
                <option value="Federal Fire Service">
                  Federal Fire Service
                </option>
                <option value="Lagos State Fire Service">
                  Lagos State Fire Service
                </option>
                <option value="Local Government Office">
                  Local Government Office
                </option>
                <option value="Lag Environmental Agencies">
                  Lag Environmental Agencies
                </option>
                <option value="Lagos State Material Testing Agency (LSMTA)">
                  Lagos State Material Testing Agency (LSMTA)
                </option>
                <option value="New Towns Development Authority (NTDA)">
                  New Towns Development Authority (NTDA)
                </option>
                <option value="Town Planning">Town Planning</option>
                <option value="Others">Others</option>
              </select>
            </div>

            <div className="flex flex-col">
              <p className="value">Non Government Agency</p>
              <select
                {...register("non_government_agencies", { required: true })}>
                <option value=""> Select Non Government Agency</option>
                <option value="Omo-onile">Omo-onile</option>
                <option value="Community Development Association">
                  Community Development Association
                </option>
                <option value="OPC">OPC</option>
                <option value="Community Vigilante Groups">
                  Community Vigilante Groups
                </option>
                <option value="Area Boys">Area Boys</option>
                <option value="Nigeria Police">Nigeria Police</option>
              </select>
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>

              <textarea {...register("comment")} />
            </div>

            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              type="button"
              onClick={() => {
                router.back();
              }}>
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primaryLight text-white  p-3 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditSingleStakeholder