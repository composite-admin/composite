"use client";
import React, { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import { useModal } from "@/utils/modalContext";
import AddMaterialModal from "./(modal)/materials/add-material";
import AddToolsModal from "./(modal)/tools/add-tools";
import Image from "next/image";
import MaterialTableArea from "./(table)";

import GoBack from "@/components/shared/GoBack";
// import AvatarComponent from "@/components/shared/AvatarComponent";
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

  const handleEditClick = () => {
    if (supplier) {
      router.push(`/suppliers/${supplier.id}/edit`);
    }
  };

  const DetailItem = ({ label, value }: any) => (
    <div>
      <p className="text-[#475367] text-sm">{label}</p>
      <TextSkeleton text={value} isLoading={requestLoading} />
    </div>
  );

  const SupplierDetails = () => {
    if (!supplier) {
      return null;
    }

    const detailItems = [
      { label: "Supplier Name", value: supplier.supplier_name },
      { label: "Supplier Code", value: supplier.supplier_code?.toUpperCase() },
      { label: "Supplier Phone", value: supplier.supplier_ofc_phone },
      { label: "Contact Person", value: supplier.contact_person },
      { label: "Contact Mobile", value: supplier.contact_mobile },
      { label: "Contact Home Phone", value: supplier.contact_home_phone },
      { label: "Comment", value: supplier.comment },
      { label: "Address", value: supplier.supplier_address, colSpan: 3 },
    ];

    return (
      <div className="col-span-2 bg-white rounded-lg border-zinc-200 border">
        <div className="p-5 border-b border-b-zinc-200">
          <h1 className="text-[#101928] text-[18px] font-[600]">
            Supplier Details
          </h1>
        </div>

        <div className="grid grid-cols-4 p-5 gap-5">
          {detailItems.map(({ label, value, colSpan = 1 }, index) => (
            <div
              key={index}
              className={colSpan > 1 ? `col-span-${colSpan}` : ""}
            >
              <DetailItem label={label} value={value} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const QuickActions = () => (
    <div className="bg-white rounded-lg border-zinc-200 border divide-y text-primaryLight">
      <div className="p-5">
        <h2 className="text-[20px] text-zinc-800 font-bold">Quick Actions</h2>
      </div>

      <div className="flex items-center gap-4 py-3 px-5">
        <Image
          src={"/supplier-info.svg"}
          width={40}
          height={40}
          alt="supplier info"
        />
        <p className="cursor-pointer font-semibold" onClick={handleEditClick}>
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
        <Image src={"/truck.svg"} width={40} height={40} alt="supplier info" />
        <p className="font-semibold">Add Tools and Machinery</p>
      </div>
    </div>
  );

  return (
    <div>
      <GoBack />
      <div className="grid grid-cols-3 gap-5 my-10">
        <SupplierDetails />
        <QuickActions />
      </div>

      <MaterialTableArea supplier={supplier} />
    </div>
  );
};

export default SingleSupplier;
