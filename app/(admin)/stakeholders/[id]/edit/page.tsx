"use client";
import GoBack from '@/components/shared/GoBack'
import { useSuccessModal } from '@/store/inventory/UseInventoryModal';
import React, { useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm } from 'react-hook-form';
import useStakeholderActionsStore from "@/store/actions/stakeholdersActions"
import { getStakeholderById } from '@/api/stakeholdersRequests';
import { validatePhoneNumber } from "@/utils/validatePhoneNumberInput";

const EditSingleStakeholder = () => {
  const router = useRouter();
  const onOpen = useSuccessModal((state) => state.onOpen);

  const params = useParams<{ id: string }>();

  const updateStakeholder = useStakeholderActionsStore<any>(
    (state) => state.updateStakeholder
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    delete data.id;
    onOpen();
    updateStakeholder(Number(params.id), data);
    router.back();
    return;
  };

  useEffect(() => {
    const fetchStakeholder = async () => {
      try {
        const response = await getStakeholderById(Number(params.id));
        reset(response.data);
      } catch (error) {
        console.error("Error fetching stakeholder data:", error);
      }
    };

    fetchStakeholder();
  }, [params.id]);

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
                {...register("stakeholder_phone", {
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
                  required: true,
                  validate: validatePhoneNumber,
                })}
              />
              {errors.contact_person && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
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
              {errors.contact_home_phone && (
                <span className="text-red-500 text-xs">
                  Please enter a valid phone number.
                </span>
              )}
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
                {...register("non_government_agencies", { required: true })}
              >
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

              <textarea {...register("comment", { required: true })} />
            </div>

            <button
              className="bg-[#EBEBEB] text-textColor rounded-md"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              className="bg-primaryLight text-white  p-3 rounded-md"
              onClick={onOpen}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditSingleStakeholder