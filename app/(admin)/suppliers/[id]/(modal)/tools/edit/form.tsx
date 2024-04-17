import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierToolsAndMachineriesStore from "@/store/actions/materials-and-tools/toolsAndMachineryActions";
import { ISupplierMaterialTypesData, IToolAndMachineryData, IUpdateToolAndMachineryData } from "@/utils/types";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Props = { row: Row<IToolAndMachineryData>; finish: () => void };

const EditToolsFormContent: React.FC<Props> = ({ row, finish }) => {
  const { hideModal } = useModal();

  // row data
  const { comment, description, tool_id } = row.original;

  const { selectedItem: supplier } = useSuppliersActionsStore();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<IUpdateToolAndMachineryData>({
    defaultValues: { comment, description },
  });

  const { requestLoading, getMaterialSubTypes, getMaterialTypes, materialTypes, materialSubTypes, updateTool } =
    useSupplierToolsAndMachineriesStore();

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

  const onSubmit: SubmitHandler<IUpdateToolAndMachineryData> = (data) => {
    if (!selectedMaterialType || !selectedMaterialSubType) {
      // toast({ title: "Incomplete Data", variant: "destructive" });
      return;
    }

    const updateData: IUpdateToolAndMachineryData = {
      ...data,
      tool_type: `${selectedMaterialType}`,
      procurement_type: `${selectedMaterialSubType}`,
    };

    updateTool(tool_id, updateData);

    finish();
  };

  return (
    <div className="lg:min-w-[50rem] md:min-w-[40rem] max-w-[60rem] max-h-[35rem] lg:max-h-[38rem] gap-4 overflow-y-auto w-full bg-white rounded-lg p-10 md:grid space-y-6 md:space-y-0 grid-cols-[1.5fr_4fr]">
      <div className="space-y-2">
        <p className="lg:text-3xl md:text-2xl font-bold">Edit Tools and Machinery</p>
        <p className="text-zinc-500">Make changes to tools and machinery</p>
        <Button title="Submit Changes" onClick={handleSubmit(onSubmit)}>
          Submit Changes
        </Button>
      </div>
      <div className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div className="space-y-1">
            <label className="font-semibold">Supplier</label>
            <input
              type="text"
              className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 disabled:bg-zinc-300  border-zinc-300`}
              placeholder="Enter Description"
              value={supplier?.supplier_name}
              disabled
            />
          </div>
          <div className="space-y-1">
            <label className="font-semibold">Type</label>
            <select
              className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                errors.tool_type ? "border-red-500" : "border-zinc-300"
              }`}
              onChange={onTypeChange}
            >
              <option value="" className="text-zinc-400">
                Select
              </option>
              {materialTypes?.map((materialType, id) => (
                <option value={JSON.stringify(materialType)} key={id}>
                  {materialType.material_type_desc}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="font-semibold">Procurement Type</label>
            <select
              className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                errors.procurement_type ? "border-red-500" : "border-zinc-300"
              }`}
              onChange={onSubTypeChange}
            >
              <option value="" className="text-zinc-400">
                Select
              </option>
              {materialSubTypes?.map((subType, id) => (
                <option value={subType.sub_type_desc} key={id}>
                  {subType.sub_type_desc}
                </option>
              ))}
            </select>
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
              className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 resize-none text-zinc-800 ${
                errors.comment ? "border-red-500" : "border-zinc-300"
              }`}
              placeholder="Enter Description"
              {...register("comment", { required: true })}
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              role="button"
              className="w-full md:py-4 py-3 text-sm md:text-base font-semibold rounded-lg bg-zinc-300 text-center"
              onClick={hideModal}
              value={"Cancel"}
            />

            <input
              className="w-full md:py-4 py-3 text-sm md:text-base font-semibold cursor-pointer disabled:cursor-not-allowed rounded-lg bg-primaryLight text-white duration-300 disabled:opacity-30"
              disabled={requestLoading || !selectedMaterialType || !selectedMaterialSubType || !isValid}
              value={requestLoading ? "Wait..." : "Submit Changes"}
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditToolsFormContent;
