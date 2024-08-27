import FramerModal from "@/components/shared/FramerModal";
import { UpdateMaterialData } from "@/store/actions/materials-and-tools/types";
import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierToolsAndMachineriesStore from "@/store/actions/materials-and-tools/toolsAndMachineryActions";
import { IAddToolsAndMachineryData, ISupplierMaterialSubTypesData, ISupplierMaterialTypesData } from "@/utils/types";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useGetAllInventoryTypes } from "@/hooks/useSelectOptions";
import Add from "./AddToolAndMachinery";


const AddToolsModal = () => {
  const { hideModal } = useModal();
  const { inventories } = useGetAllInventoryTypes();

  const { selectedItem } = useSuppliersActionsStore();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IAddToolsAndMachineryData>({
    defaultValues: {
      supplier_name: selectedItem?.supplier_name,
      supplier_code: selectedItem?.supplier_code,
    },
  });

  const {
    requestLoading,
    getMaterialSubTypes,
    getMaterialTypes,
    materialTypes,
    materialSubTypes,
    createTool,
  } = useSupplierToolsAndMachineriesStore();

  const [selectedMaterialType, setSelectedMaterialType] = useState("");
  const [selectedMaterialSubType, setSelectedMaterialSubType] = useState("");

  useEffect(() => {
    getMaterialTypes();
  }, [getMaterialTypes]);

  useEffect(() => {
    // initial subtype fetch

    if (!materialTypes || materialTypes.length === 0) return;

    getMaterialSubTypes(materialTypes[0].material_type_id);
  }, [materialTypes]);

  const onTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSelectedMaterialType("");
      return;
    }

    const matType = JSON.parse(value) as ISupplierMaterialTypesData;

    const materialId = matType.material_type_id;
    getMaterialSubTypes(materialId);

    const materialDesc = matType.material_type_desc;

    setSelectedMaterialType(materialDesc);
  };

  const onSubTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      setSelectedMaterialSubType("");
      return;
    }

    const subType = value;
    setSelectedMaterialSubType(subType);
  };

  const onSubmit: SubmitHandler<IAddToolsAndMachineryData> = (data) => {
    if (!selectedMaterialType || !selectedMaterialSubType) {
      return;
    }

    const mainData: IAddToolsAndMachineryData = {
      ...data,
      tool_type: `${selectedMaterialType}`,
      procurement_type: `${selectedMaterialSubType}`,
      comment: "",
    };

    createTool(mainData);
    hideModal();
  };

  return (
    <FramerModal
      isOpen={true}
      isAutomatic={false}
      onClose={hideModal}>
      <div className="max-w-4xl gap-4 overflow-y-auto w-full bg-white rounded-lg p-10 md:grid space-y-6 md:space-y-0 grid-cols-[1.5fr_4fr]">
        <div className="space-y-2">
          <p className="lg:text-3xl md:text-2xl font-bold">
            Add Tools and Machinery
          </p>
          <p className="text-zinc-500">Make changes to tools and machinery</p>
        </div>
        <div className="space-y-4">
          <Add />
        </div>
      </div>
    </FramerModal>
  );
};

export default AddToolsModal;















// <form
// onSubmit={handleSubmit(onSubmit)}
// noValidate
// className="space-y-4"
// >
// <div className="space-y-1">
//   <label className="font-semibold">Supplier</label>
//   <input
//     type="text"
//     className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 disabled:bg-zinc-300  border-zinc-300`}
//     placeholder="Enter Description"
//     {...register("supplier_name", { required: true })}
//     disabled
//   />
// </div>
// <div className="space-y-1">
//   <label className="font-semibold">Type</label>
//   <select
//     className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
//       errors.tool_type ? "border-red-500" : "border-zinc-300"
//     }`}
//     onChange={onTypeChange}
//   >
//     <option value="" className="text-zinc-400">
//       Select
//     </option>
//     {inventories?.map((type: any, id: any) => (
//       <option value={JSON.stringify(type)} key={id}>
//         {type.type}
//       </option>
//     ))}
//   </select>
// </div>

// <div className="space-y-1">
//   <label className="font-semibold">Description</label>
//   <input
//     type="text"
//     className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
//       errors.description ? "border-red-500" : "border-zinc-300"
//     }`}
//     placeholder="Enter Description"
//     {...register("description", { required: true })}
//   />
// </div>

// <div className="space-y-1">
//   <label className="font-semibold">Procurement Type</label>
//   <select
//     className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
//       errors.procurement_type ? "border-red-500" : "border-zinc-300"
//     }`}
//     onChange={onSubTypeChange}
//   >
//     <option value="lease" id="lease">
//       Lease
//     </option>
//     <option value="sale" id="sale">
//       Sale
//     </option>
//   </select>
// </div>

// <div className="space-y-1">
//   <label className="font-semibold">Comment</label>
//   <textarea
//     rows={5}
//     className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 resize-none text-zinc-800 ${
//       errors.comment ? "border-red-500" : "border-zinc-300"
//     }`}
//     placeholder="Enter Description"
//     {...register("comment", { required: true })}
//   ></textarea>
// </div>
// <div className="grid grid-cols-2 gap-2">
//   <input
//     role="button"
//     className="w-full md:py-4 py-3 text-sm md:text-base font-semibold rounded-lg bg-zinc-300 text-center"
//     onClick={hideModal}
//     value={"Cancel"}
//   />

//   <input
//     className="w-full md:py-4 py-3 text-sm md:text-base font-semibold cursor-pointer rounded-lg bg-primaryLight text-white duration-300 disabled:opacity-30"
//     disabled={
//       requestLoading ||
//       !selectedMaterialType ||
//       !selectedMaterialSubType
//     }
//     value={requestLoading ? "Wait..." : "Add Tools & Machinery"}
//     type="submit"
//   />
// </div>
// </form>`