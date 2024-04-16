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

const SingleWorker = () => {
  const router = useRouter();
  const onOpen = useSuccessModal((state) => state.onOpen);

  const params = useParams<{ id: string }>();

  const updateWorker = useWorkersActionsStore<any>((state) => state.updateWorker);

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    // Pass the form data to your submitForm action
    console.log(data);
    delete data.id;
    onOpen();
    updateWorker(Number(params.id), data);
    router.back();
    return;
  };

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await getWorkerById(Number(params.id));
        reset(response.data);
      } catch (error) {
        console.error("Error fetching worker data:", error);
      }
    };

    fetchWorker();
  }, [params.id]);

  return (
    <>
      <GoBack />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
          <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">
            <h2 className="text-[#101928] font-[600] text-[22px]">Add Worker</h2>
            <p>Update Worker Details here.</p>
          </div>
          <div>
            <h3 className="text-[20px]">Photograph</h3>
            <p className="text-gray-400">This image will be used to recognize the supplier</p>
            <div className="text-primaryLight border-2 border-primaryLight rounded-md p-2 gap-1 cursor-pointer flex items-center w-fit text-[12px]">
              <HiPhotograph />
              <span>Upload Photo</span>
            </div>
          </div>

          <AvatarComponent />
          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Worker Name</p>

              <input type="text" {...register("worker_name", { required: true })} />
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Company</p>

              <input type="text" {...register("worker_company", { required: true })} />
            </div>
            <div className="flex flex-col">
              <p className="value">Worker Address</p>

              <input type="text" {...register("worker_address", { required: true })} />
            </div>

            <div className="flex flex-col ">
              <p className="value">Service Type</p>

              <input type="text" {...register("service_type", { required: true })} />
            </div>
            <div className="flex flex-col ">
              <p className="value">Section</p>

              <input type="text" {...register("section", { required: true })} />
            </div>
            <div className="flex flex-col ">
              <p className="value">Worker Source</p>

              <input type="text" {...register("worker_source", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Office Phone</p>

              <input type="text" {...register("worker_ofc_phone", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Mobile</p>

              <input type="text" {...register("worker_mobile", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Home Phone</p>

              <input type="text" {...register("worker_home_phone", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Service</p>

              <input type="text" {...register("worker_service", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Worker Email</p>

              <input type="email" {...register("worker_email", { required: true })} />
            </div>

            <div className="flex flex-col">
              <p className="value">Bank Name</p>

              <input type="text" {...register("bank_name", { required: true })} />
            </div>
            <div className="flex flex-col">
              <p className="value">Account Name</p>

              <input type="text" {...register("account_name", { required: true })} />
            </div>
            <div className="flex flex-col">
              <p className="value">Account Number</p>

              <input type="text" {...register("account_number", { required: true })} />
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>

              <textarea {...register("comment", { required: true })} />
            </div>

            <button className="bg-[#EBEBEB] text-textColor rounded-md" onClick={() => router.back()}>
              Cancel
            </button>
            <button className="bg-primaryLight text-white  p-3 rounded-md" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SingleWorker;
