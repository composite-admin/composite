import FramerModal from "@/components/shared/FramerModal";
import { AddMaterialData } from "@/store/actions/materials-and-tools/types";
import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierMaterialsStore from "@/store/actions/materials-and-tools/materialsActions";
import useSuppliersActionsStore from "@/store/actions/suppliersActions";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";
import { BlockEdiComponent } from "@/components/shared/BlockEdit";
import { useToast } from "@/components/ui/use-toast";

const AddMaterialModal = () => {
  const { hideModal } = useModal();
  const { selectedItem: supplier } = useSuppliersActionsStore();
  const { toast } = useToast();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AddMaterialData>({});
  const store = useSupplierMaterialsStore();
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_CREATE = staffPrivilege?.find(
    (item: any) => item.type === "supplier"
  )?.can_create;

  const onSubmit: SubmitHandler<AddMaterialData> = (data) => {
    if (isNaN(data.unit_price) || isNaN(data.quantity)) {
      toast({
        title: "Error",
        description: "Unit price and quantity must be numbers",
        variant: "destructive",
      });
      return;
    }

    store.createMaterial({
      ...data,
      supplier_code: supplier?.supplier_code!,
      supplier_name: supplier?.supplier_name!,
      unit_price: parseFloat(`${data.unit_price}`),
      quantity: parseFloat(`${data.quantity}`),
    });
    reset();
    hideModal();
  };

  return (
    <FramerModal
      isOpen={true}
      isAutomatic={false}
      onClose={hideModal}>
      {!CAN_CREATE ? (
        <div className="md:min-w-[30rem] w-[98%] bg-white rounded-lg p-10">
          <div className="space-y-4">
            <p className="text-xl font-bold">
              You do not have permission to do this
            </p>
            <button
              role="button"
              className="w-full py-3 font-semibold rounded-lg bg-zinc-300"
              onClick={hideModal}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="md:min-w-[40rem] w-[98%] bg-white rounded-lg p-10">
          <div className="space-y-4">
            <p className="text-3xl font-bold">Add Material</p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4">
              <div className="space-y-1">
                <label className="font-semibold">Material Description</label>
                <input
                  type="text"
                  className={`w-full outline-none p-3 border rounded-lg placeholder:text-zinc-500 ${
                    errors.mat_desc ? "border-red-500" : "border-zinc-300"
                  }`}
                  placeholder="Enter Description"
                  {...register("mat_desc", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Quantity</label>
                <input
                  type="text"
                  className={`w-full outline-none p-3 border rounded-lg placeholder:text-zinc-500 ${
                    errors.quantity ? "border-red-500" : "border-zinc-300"
                  }`}
                  placeholder="Enter Quantity"
                  {...register("quantity", { required: true })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold">Unit Price</label>
                <input
                  type="text"
                  className={`w-full outline-none p-3 border rounded-lg placeholder:text-zinc-500 ${
                    errors.unit_price ? "border-red-500" : "border-zinc-300"
                  }`}
                  placeholder="Enter Description"
                  {...register("unit_price", { required: true })}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  role="button"
                  className="w-full py-4 font-semibold rounded-lg bg-zinc-300"
                  onClick={hideModal}>
                  Cancel
                </button>
                <input
                  className="w-full py-4 font-semibold cursor-pointer rounded-lg bg-primaryLight text-white duration-300 disabled:opacity-30"
                  disabled={store.requestLoading}
                  value={store.requestLoading ? "Wait..." : "Add Material"}
                  type="submit"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </FramerModal>
  );
};

export default AddMaterialModal;
