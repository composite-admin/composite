"use client";
import GoBack from "@/components/shared/GoBack";
import React, { useEffect } from "react";
import { HiHome } from "react-icons/hi2";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import { getSupplierById } from "@/api/suppliers-and-tools/suppliersRequests";
import { useToast } from "@/components/ui/use-toast";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";

const EditSupplier = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "inventory"
  )?.can_edit;

  const params = useParams<{ id: string }>();

  const updateSupplier = useSuppliersActionsStore<any>(
    (state) => state.updateSupplier
  );

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    delete data.id;
    toast({
      title: "Supplier has been updated successfully",
      variant: "success",
    });
    updateSupplier(Number(params.id), data);
    router.back();
    return;
  };

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await getSupplierById(Number(params.id));
        reset(response.data);
      } catch (error) {
        console.error("Error fetching supplier data:", error);
      }
    };

    fetchSupplier();
  }, [params.id]);

  if (!CAN_EDIT) {
    return <BlockEdiComponent />;
  }

  return (
    <>
      <GoBack />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-1 rounded-lg border border-outline bg-white p-[20px] mt-10 w-4/5 mx-auto">
          <div className="flex items-center justify-between cursor-pointer">
            <div className="flex gap-2 items-center">
              <div className="p-2 rounded-full bg-[#52a7f226] w-[50px] h-[50px] flex items-center justify-center">
                <HiHome />
              </div>
              <p className="text-[22px] font-[600] text-[#101928]">
                Edit Supplier
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 my-5 edit">
            <div className="flex flex-col ">
              <p className="value">Supplier Name</p>

              <input
                type="text"
                {...register("supplier_name", { required: true })}
                placeholder="Enter name"
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Address</p>

              <input
                type="text"
                {...register("supplier_address", { required: true })}
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Supplier Phone</p>

              <input
                type="tel"
                {...register("supplier_ofc_phone", { required: true })}
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Contact Person</p>

              <input
                type="text"
                {...register("contact_person", { required: true })}
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Contact Home Phone</p>

              <input
                type="tel"
                {...register("contact_home_phone")}
              />
            </div>

            <div className="flex flex-col ">
              <p className="value">Contact Mobile</p>

              <input
                type="tel"
                {...register("contact_mobile")}
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
            <button className="bg-primaryLight text-white  p-5 rounded-md">
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditSupplier;

