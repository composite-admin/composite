"use client";
import GoBack from "@/components/shared/GoBack";
import { useSuccessModal } from "@/store/modals/useCreateModal";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useToast } from "@/components/ui/use-toast";

const AddWorker = () => {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const createWorker = useWorkersActionsStore<any>(
    (state) => state.createWorker
  );

  const onSubmit = (data: any) => {
    toast({
      title: "Worker created successfully",
      variant: "success",
    });
    router.back();
    createWorker(data);
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
              Add Worker
            </h2>
            <p>New Worker Details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Worker Name</p>

              <input
                type="text"
                {...register("worker_name", { required: true })}
              />
              {errors.worker_name && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Company</p>

              <input
                type="text"
                {...register("worker_company", { required: true })}
              />
              {errors.worker_company && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Address</p>

              <input
                type="text"
                {...register("worker_address", { required: true })}
              />
              {errors.worker_address && (
                <p className="text-red-500">This field is required</p>
              )}
            </div>

            <div className="flex flex-col ">
              <p className="value">Service Type</p>
              <select {...register("service_type", { required: true })}>
                <option value=""></option>
                <option value="Borehole Drilling">Borehole Drilling</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Cabinetry/Furniture">
                  Cabinetry / Furniture
                </option>
                <option value="Cable TV Installation">
                  Cable TV Installation
                </option>
                <option value="Cleaning">Cleaning</option>
                <option value="Concret Casting">Concret Casting</option>
                <option value="CCTV / Security Installation">
                  CCTV / Security Installation
                </option>
                <option value="Data / Video / Voice Cabling">
                  Data / Video / Voice Cabling
                </option>
                <option value="Electrical">Electrical</option>
                <option value="House Painting">House Painting</option>
                <option value="Gardening">Gardening</option>
                <option value="Mable Work">Mable Work</option>
                <option value="Masonry">Masonry</option>
                <option value="Paving">Paving</option>
                <option value="Piling Work">Piling Work</option>
                <option value="Plumbing">Plumbing</option>
                <option value="PoP Work">PoP Work</option>
                <option value="Roofing">Roofing</option>
                <option value="Scalfolding">Scalfolding</option>
                <option value="Spray Painting">Spray Painting</option>
                <option value="Steel Bending">Steel Bending</option>
                <option value="Tiling">Tiling</option>
                <option value="Welding">Welding</option>
              </select>
              {errors.service_type && (
                <span className="text-red-500 text-xs">
                  Please select a service type.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Office Phone</p>

              <input
                {...register("worker_ofc_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.worker_ofc_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Mobile</p>

              <input
                {...register("worker_mobile", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.worker_mobile && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Home Phone</p>

              <input
                {...register("worker_home_phone", {
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.worker_home_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Service</p>

              <input
                type="text"
                {...register("worker_service", { required: true })}
              />
              {errors.worker_service && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Email</p>

              <input
                type="email"
                {...register("worker_email", { required: true })}
              />
              {errors.worker_email && (
                <span className="text-red-500 text-xs">
                  Please enter a valid email.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Bank Name</p>

              <input
                type="text"
                {...register("bank_name", { required: true })}
              />
              {errors.bank_name && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <p className="value">Account Name</p>

              <input
                type="text"
                {...register("account_name", { required: true })}
              />
              {errors.account_name && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <p className="value">Account Number</p>

              <input
                type="text"
                {...register("account_number", { required: true })}
              />
              {errors.account_number && (
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

export default AddWorker;
