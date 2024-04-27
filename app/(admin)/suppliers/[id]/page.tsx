"use client";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import Image from "next/image";
import MaterialTableArea from "./(table)";
import { useModal } from "@/utils/modalContext";
import AddMaterialModal from "./(modal)/materials/add-material";
import AddToolsModal from "./(modal)/tools/add-tools";
import TextSkeleton from "@/components/shared/TextSkeleton";


const SingleSupplier = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { showModal } = useModal();

  const {
    selectedItem: supplier,
    getSupplierById,
    getAllSuppliers,
    requestLoading,
  } = useSuppliersActionsStore();

  useEffect(() => {
    getAllSuppliers();
  }, [getAllSuppliers]);

  useEffect(() => {
    if (params.id) {
      getSupplierById(params.id);
    }
  }, [getSupplierById, params.id]);

  const showMaterialModal = () => showModal(<AddMaterialModal />);
  const showAddToolsModal = () => showModal(<AddToolsModal />);

  return (
    <div>
      <GoBack />

      <div className="flex gap-3 items-center">
        <AvatarComponent classes="size-14" />
        <div>
          <p className="font-semibold text-xl">
            {supplier && supplier.supplier_name}
          </p>
          <p className="uppercase">{supplier && supplier.supplier_code}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 my-10">
        <div className="col-span-2 bg-white rounded-lg border-zinc-200 border">
          <div className="p-5 border-b border-b-zinc-200">
            <h1 className="text-[#101928] text-[18px] font-[600]">
              Supplier Details
            </h1>
          </div>

          <div className="grid grid-cols-4 p-5 gap-5">
            <div>
              <p className="text-[#475367] text-sm">Supplier Name:</p>
              <TextSkeleton
                text={supplier?.supplier_name}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Supplier Code:</p>
              <TextSkeleton
                text={supplier?.supplier_code}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Address:</p>
              <TextSkeleton
                text={supplier?.supplier_address}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Supplier Phone:</p>
              <TextSkeleton
                text={supplier?.supplier_ofc_phone}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Person:</p>
              <TextSkeleton
                text={supplier?.contact_person}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Mobile:</p>
              <TextSkeleton
                text={supplier?.contact_mobile}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Contact Home Phone:</p>
              <TextSkeleton
                text={supplier?.contact_home_phone}
                isLoading={requestLoading}
              />
            </div>

            <div>
              <p className="text-[#475367] text-sm">Comment:</p>
              <TextSkeleton
                text={supplier?.comment}
                isLoading={requestLoading}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border-zinc-200 border divide-y text-primaryLight">
          <div className="p-5">
            <h2 className="text-[20px] text-zinc-800 font-bold">
              Quick Actions
            </h2>
          </div>

          <div className="flex items-center gap-4 py-3 px-5">
            <Image
              src={"/supplier-info.svg"}
              width={40}
              height={40}
              alt="supplier info"
            />
            <p
              className="cursor-pointer font-semibold"
              onClick={() => router.push(`/suppliers/${supplier?.id}/edit`)}
            >
              Edit Supplier Information
            </p>
          </div>

          <div
            className="flex items-center gap-4 py-3 px-5 cursor-pointer"
            onClick={showMaterialModal}
          >
            <Image
              src={"/devices.svg"}
              width={40}
              height={40}
              alt="supplier info"
            />
            <p className="font-semibold">Add Supplier Material</p>
          </div>

          <div
            className="flex items-center gap-4 py-5 px-5 cursor-pointer"
            onClick={showAddToolsModal}
          >
            <Image
              src={"/truck.svg"}
              width={40}
              height={40}
              alt="supplier info"
            />
            <p className="font-semibold">Add Tools and Machinery</p>
          </div>
        </div>
      </div>

      <MaterialTableArea />
    </div>
  );
};

export default SingleSupplier;
