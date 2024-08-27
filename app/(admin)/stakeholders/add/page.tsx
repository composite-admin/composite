"use client";
import GoBack from "@/components/shared/GoBack";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useStakeholdersActionsStore from "@/store/actions/stakeholdersActions";
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import { AxiosError } from "axios";

const AddStakeholder = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const { mutate } = useMutation({
    mutationKey: ["create stakeholder"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.post("/stakeholder", data);
        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Stakeholder created successfully",
            variant: "success",
          });
          router.back();
        }
        return response.data;
      } catch (error) {
        const axiosError = error as AxiosError;
        toast({
          variant: "destructive",
          title: "Error",
          description: axiosError.message || "An error occurred",
        });
      }
    },

    onError: (error: Error) => {
      toast({
        title: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    mutate(data);
    reset();
    return;
  };

  return (
    <>
      <GoBack />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
          <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">
            <h2 className="text-[#101928] font-[600] text-[22px]">
              Add Stakeholder
            </h2>
            <p>New Stakeholder Details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Stakeholder Name</p>

              <input
                type="text"
                {...register("stakeholder_name", { required: true })}
              />
              {errors.stakeholder_name && (
                <span className="text-red-500 text-xs">
                  Please enter a name.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("stakeholder_address", { required: true })}
              />
              {errors.stakeholder_address && (
                <span className="text-red-500 text-xs">
                  Please enter an Address.
                </span>
              )}
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
                type="text"
                {...register("contact_person", { required: true })}
              />
              {errors.contact_person && (
                <span className="text-red-500 text-xs">
                  This is a required field.
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <p className="value">Contact Home Phone</p>
              <input
                {...register("contact_home_phone", {
                  validate: validatePhoneNumber,
                })}
              />
            </div>
            <div className="flex flex-col">
              <p className="value">Contact Mobile</p>

              <input
                {...register("contact_mobile", {
                  validate: validatePhoneNumber,
                })}
              />
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
              {errors.government_agencies && (
                <span className="text-red-500 text-xs">
                  Please select an agency.
                </span>
              )}
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
              {errors.non_government_agencies && (
                <span className="text-red-500 text-xs">
                  Please select an agency.
                </span>
              )}
            </div>
            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>
              <textarea {...register("comment")} />
            </div>
            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              onClick={() => router.back()}
              type="button">
              Cancel
            </button>
            <button
              className="bg-primaryLight text-white  p-3 rounded-md"
              type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddStakeholder