import FramerModal from "@/components/shared/FramerModal";
import { UpdateMaterialData } from "@/store/actions/materials-and-tools/types";
import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierToolsAndMachineriesStore from "@/store/actions/materials-and-tools/toolsAndMachineryActions";
import { IAddToolsAndMachineryData, ISupplierMaterialSubTypesData, ISupplierMaterialTypesData } from "@/utils/types";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import React, { ChangeEvent, useEffect, useState } from "react";

const AddToolsModal = () => {
  const { hideModal } = useModal();

  const { selectedItem } = useSuppliersActionsStore();

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAddToolsAndMachineryData>({
    defaultValues: { supplier_name: selectedItem?.supplier_name, supplier_code: selectedItem?.supplier_code },
  });

  const { requestLoading, getMaterialSubTypes, getMaterialTypes, materialTypes, materialSubTypes } =
    useSupplierToolsAndMachineriesStore();

  const [types, setTypes] = useState<ISupplierMaterialTypesData[] | null>(materialTypes);
  const [subTypes, setSubTypes] = useState<ISupplierMaterialSubTypesData[] | null>(materialSubTypes);

  console.log({ selectedItem });

  useEffect(() => {
    getMaterialTypes();
  }, [getMaterialTypes]);

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const onSubmit: SubmitHandler<IAddToolsAndMachineryData> = (data) => {
    reset();
    hideModal();
  };

  return (
    <FramerModal isOpen={true} isAutomatic={false} onClose={hideModal}>
      <div className="lg:min-w-[50rem] md:min-w-[40rem] max-w-[60rem] w-full bg-white rounded-lg p-10 sm:grid space-y-6 sm:space-y-0 grid-cols-[1.5fr_4fr]">
        <div className="space-y-2">
          <p className="text-3xl font-bold">Add Tools and Machinery</p>
          <p className="text-zinc-500">Make changes to tools and machinery</p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold">Supplier</label>
              <input
                type="text"
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 disabled:bg-zinc-300  border-zinc-300`}
                placeholder="Enter Description"
                {...register("supplier_name", { required: true })}
                disabled
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold">Type</label>
              <select
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                  errors.tool_type ? "border-red-500" : "border-zinc-300"
                }`}
              ></select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold">Procurement Type</label>
              <select
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                  errors.procurement_type ? "border-red-500" : "border-zinc-300"
                }`}
              ></select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                  errors.description ? "border-red-500" : "border-zinc-300"
                }`}
                placeholder="Enter Description"
                {...register("description", { required: true })}
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold">Comment</label>
              <textarea
                rows={5}
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                  errors.comment ? "border-red-500" : "border-zinc-300"
                }`}
                placeholder="Enter Description"
                {...register("comment", { required: true })}
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                role="button"
                className="w-full py-4 font-semibold rounded-lg bg-zinc-300 text-center"
                onClick={hideModal}
                value={"Cancel"}
              />

              <input
                className="w-full py-4 font-semibold cursor-pointer rounded-lg bg-primaryLight text-white duration-300 disabled:opacity-30"
                disabled={requestLoading}
                value={requestLoading ? "Wait..." : "Add Material"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </FramerModal>
  );
};

export default AddToolsModal;
