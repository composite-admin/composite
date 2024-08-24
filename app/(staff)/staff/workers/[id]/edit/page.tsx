"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import { useSuccessModal } from "@/store/inventory/UseInventoryModal";
import { HiPhotograph } from "react-icons/hi";
import React, { useEffect } from "react";
import { HiBellAlert } from "react-icons/hi2";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useWorkersActionsStore from "@/store/actions/worker/workersActions";
import { getWorkerById } from "@/api/worker/workersRequests";
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useToast } from "@/components/ui/use-toast";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";

const SingleWorker = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams<{ id: string }>();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "worker"
  )?.can_edit;

  const updateWorker = useWorkersActionsStore<any>(
    (state) => state.updateWorker
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    delete data.id;
    toast({
      title: "Worker updated successfully",
      variant: "success",
    });
    updateWorker(Number(params.id), data);
    router.back();
    return;
  };

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await getWorkerById(Number(params.id));
        reset(response);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };

    fetchWorker();
  }, [params.id]);

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <>
      <GoBack />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
          <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">
            <h2 className="text-[#101928] font-[600] text-[22px]">
              Edit Worker
            </h2>
            <p>Update Worker Details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Worker Name</p>

              <input
                type="text"
                {...register("worker_name", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Company</p>

              <input
                type="text"
                {...register("worker_company", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Address</p>

              <input
                type="text"
                {...register("worker_address", { required: true })}
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Service Type</p>

              <input
                type="text"
                {...register("service_type", { required: true })}
              />
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
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Email</p>

              <input
                type="email"
                {...register("worker_email")}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Bank Name</p>

              <input
                type="text"
                {...register("bank_name", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <p className="value">Account Name</p>

              <input
                type="text"
                {...register("account_name", { required: true })}
              />
            </div>
            <div className="flex flex-col">
              <p className="value">Account Number</p>

              <input
                type="text"
                {...register("account_number", { required: true })}
              />
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>

              <textarea {...register("comment")} />
            </div>

            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              onClick={() => router.push("/contractors")}
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

export default SingleWorker;