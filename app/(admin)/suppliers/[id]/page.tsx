"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import Image from "next/image";
import MaterialTableArea from "./(table)";

const SingleSupplier = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const selectedItem = useSuppliersActionsStore<any>((state) => state.selectedItem);
  const getSupplierById = useSuppliersActionsStore<any>((state) => state.getSupplierById);
  const suppliers = useSuppliersActionsStore<any>((state: any) => state.items);
  const getAllSuppliers = useSuppliersActionsStore<any>((state: any) => state.getAllSuppliers);

  useEffect(() => {
    getAllSuppliers();
  }, [getAllSuppliers]);

  useEffect(() => {
    if (params.id) {
      getSupplierById(params.id);
    }
  }, [getSupplierById, params.id]);

  return (
    <div>
      <GoBack />

      <div className="flex gap-3 items-center">
        <AvatarComponent classes="size-14" />
        <div>
          <p className="font-semibold text-xl">{selectedItem && selectedItem.supplier_name}</p>
          <p className="uppercase">{selectedItem && selectedItem.supplier_code}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 my-10">
        <div className="col-span-2 bg-white rounded-lg border-zinc-200 border">
          <div className="p-5 border-b border-b-zinc-200">
            <h1 className="text-[#101928] text-[18px] font-[600]">Supplier Details</h1>
          </div>

          <div className="grid grid-cols-4 p-5 gap-5">
            <div>
              <p className="text-[#475367] text-sm">Supplier Name:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.supplier_name}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Supplier Code:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.supplier_code}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Address:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.supplier_address}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Supplier Phone:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.supplier_ofc_phone}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Person:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.contact_person}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Mobile:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.contact_mobile}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Home Phone:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.contact_home_phone}</p>
            </div>

            <div>
              <p className="text-[#475367] text-sm">Comment:</p>
              <p className="text-[#101928] text-[16px] font-[600]">{selectedItem && selectedItem.comment}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-zinc-200 border divide-y text-primaryLight">
          <div className="p-5">
            <h2 className="text-[20px] text-zinc-800 font-bold">Quick Actions</h2>
          </div>

          <div className="flex items-center gap-4 py-3 px-5">
            <Image src={"/supplier-info.svg"} width={40} height={40} alt="supplier info" />
            <p
              className="cursor-pointer font-semibold"
              onClick={() => router.push(`/suppliers/${selectedItem.id}/edit`)}
            >
              Edit Supplier Information
            </p>
          </div>

          <div className="flex items-center gap-4 py-3 px-5 cursor-pointer">
            <Image src={"/devices.svg"} width={40} height={40} alt="supplier info" />
            <p className="font-semibold">Add Supplier Material</p>
          </div>

          <div className="flex items-center gap-4 py-5 px-5 cursor-pointer">
            <Image src={"/truck.svg"} width={40} height={40} alt="supplier info" />
            <p className="font-semibold">Add Tools and Machinery</p>
          </div>
        </div>
      </div>

      <MaterialTableArea />
    </div>
  );
};

export default SingleSupplier;
