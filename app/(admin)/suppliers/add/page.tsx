"use client";
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/modals/useCreateModal'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiBellAlert } from 'react-icons/hi2'
import useSuppliersActionsStore from "@/store/actions/suppliersActions"
import { useForm } from 'react-hook-form';
import { validatePhoneNumber } from "../../../../utils/validatePhoneNumberInput";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const AddSuppliers = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { toast } = useToast();

  const createSupplier = useSuppliersActionsStore<any>(
    (state) => state.createSupplier
  );

  const { mutate } = useMutation({
    mutationKey: ["createSupplier"],
    mutationFn: (data: any) => {
      return createSupplier(data);
    },
    onSuccess: () => {
      toast({
        title: "Supplier created successfully",
        variant: "success",
      });
      router.push("/suppliers");
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
          <div className="flex gap-2 items-center border-b border-b-gray-200 py-3">
            <HiBellAlert />
            <h2 className="text-[#101928] font-[600] text-[22px]">
              Add Supplier
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Supplier Name</p>

              <input
                type="text"
                {...register("supplier_name", { required: true })}
              />
              {errors.supplier_name && (
                <span className="text-red-500 text-xs">
                  This field is required.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("supplier_address", { required: true })}
              />
              {errors.supplier_address && (
                <span className="text-red-500 text-xs">
                  This field is required.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Supplier Phone</p>

              <input
                {...register("supplier_ofc_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.supplier_ofc_phone && (
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
                  This field is required.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Contact Home Phone</p>

              <input
                {...register("contact_home_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />

            </div>

            <div className="flex flex-col">
              <p className="value">Contact Mobile</p>

              <input
                {...register("contact_mobile", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.contact_mobile && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>

              <textarea {...register("comment", { required: true })} />
            </div>

            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              onClick={() => router.back()}
              type="button"
            >
              Cancel
            </button>
            <button
              className="bg-primaryLight text-white  p-3 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddSuppliers