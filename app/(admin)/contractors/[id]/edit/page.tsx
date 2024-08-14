"use client"
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal'
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import useContractorsActionsStore from "@/store/actions/contractorsActions"
import { getContractorById} from '@/api/contractorsRequests';
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";
import { useToast } from "@/components/ui/use-toast";

const SingleContractorEdit = () => {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const updateContractor = useContractorsActionsStore<any>(
    (state) => state.updateContractor
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
      title: "Success",
      description: "Contractor updated successfully",
      variant: "success",
    });
    updateContractor(Number(params.id), data);
    router.back();
    return;
  };

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const response = await getContractorById(Number(params.id));
        reset(response.data);
      } catch (error) {
        console.error("Error fetching contractor data:", error);
      }
    };

    fetchContractor();
  }, [params.id, reset]);

  return (
    <>
      <GoBack />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-[80%] mx-auto my-10 rounded-lg border border-outline bg-white p-[29px]">
          <div className="flex gap-2 flex-col border-b border-b-gray-200 py-3">
            <h2 className="text-[#101928] font-[600] text-[22px]">
              Edit Contractor
            </h2>
            <p>Update Contractor Details here.</p>
          </div>

          <div className="grid grid-cols-2 gap-5 my-5 edit">
            <div className="flex flex-col">
              <p className="value">Contractor Name</p>

              <input
                type="text"
                {...register("contractor_name", { required: true })}
              />
            </div>

            <div className="flex flex-col">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("contractor_address", { required: true })}
              />
            </div>

            <div className="flex flex-col col-span-2">
              <p className="value">Service</p>

              <input
                type="text"
                {...register("contractor_service", { required: true })}
              />
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
              {errors.contact_home_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="value">Contact Person</p>

              <input type="text" {...register("contact_person")} />
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

              <input type="email" {...register("email")} />
            </div>

            <div className="flex flex-col">
              <p className="value">Website</p>

              <input type="text" {...register("website")} />
            </div>

            <div className="flex flex-col col-span-2">
              <div className="value">Comment</div>

              <textarea {...register("comment")} />
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

export default SingleContractorEdit