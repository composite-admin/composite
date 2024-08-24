"use client"
import GoBack from "@/components/shared/GoBack";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useContractorsActionsStore from "@/store/actions/contractorsActions";
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { api } from "@/config/api";
import { useMutation } from "@tanstack/react-query";

const AddContractor = () => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createContractor = useContractorsActionsStore<any>(
    (state) => state.createContractor
  );

  const { mutate } = useMutation({
    mutationKey: ["create Contractors"],
    mutationFn: async (data: any) => {
      try {
        const response = await api.post("/contractors", data);
        if (response.status === 201 || response.status === 200) {
          toast({
            title: "Contractor created successfully",
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
              Add Contractor
            </h2>
            <p>Add new contractor details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Contractor Name</p>

              <input
                type="text"
                {...register("contractor_name", { required: true })}
              />
              {errors.contractor_name && (
                <span className="text-red-500 text-xs">
                  Please enter a full name.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("contractor_address", { required: true })}
              />
              {errors.contractor_address && (
                <span className="text-red-500 text-xs">
                  Please enter an Address.
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <p className="value">Service</p>

              <input
                type="text"
                {...register("contractor_service", { required: true })}
              />
              {errors.contractor_service && (
                <span className="text-red-500 text-xs">
                  This field is required.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Contractor Phone</p>

              <input
                {...register("contractor_ofc_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.contractor_ofc_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
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
              <p className="value">Contact Person</p>

              <input
                type="text"
                {...register("contact_person")}
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
              <p className="value">Email</p>

              <input
                type="email"
                {...register("email")}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Website</p>

              <input
                type="text"
                {...register("website")}
              />
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

export default AddContractor