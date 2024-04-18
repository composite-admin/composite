import FramerModal from "@/components/shared/FramerModal";
import { Material, UpdateMaterialData } from "@/store/actions/materials-and-tools/types";
import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierMaterialsStore from "@/store/actions/materials-and-tools/materialsActions";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Props = Row<Material>;

const EditMaterialModal: React.FC<Props> = (row) => {
  const { hideModal } = useModal();

  const { mat_desc, unit_price, quantity, mat_id } = row.original;

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateMaterialData>({ defaultValues: { unit_price, quantity, mat_desc } });

  const store = useSupplierMaterialsStore();

  const onSubmit: SubmitHandler<UpdateMaterialData> = (data) => {
    store.updateMaterial(mat_id, {
      ...data,
      unit_price: parseFloat(`${data.unit_price}`),
      quantity: parseFloat(`${data.quantity}`),
    });
    reset();
    hideModal();
  };

  return (
    <FramerModal isOpen={true} isAutomatic={false} onClose={hideModal}>
      <div className="lg:min-w-[70rem] md:min-w-[40rem] w-full bg-white rounded-lg p-10 sm:grid space-y-6 sm:space-y-0 grid-cols-[1.5fr_4fr]">
        <div className="space-y-2">
          <p className="text-3xl font-bold">Edit Material</p>
          <p className="text-zinc-500">Make changes to supplier material</p>
          <div className="pt-4">
            <Button title="Submit Changes" onClick={handleSubmit(onSubmit)}>
              Submit Changes
            </Button>
          </div>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <div className="space-y-1">
              <label className="font-semibold">Material Description</label>
              <input
                type="text"
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 disabled:bg-zinc-300 ${
                  errors.mat_desc ? "border-red-500" : "border-zinc-300"
                }`}
                disabled
                placeholder="Enter Description"
                {...register("mat_desc", { required: false })}
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold">Quantity</label>
              <input
                type="text"
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
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
                className={`w-full outline-none p-4 border rounded-lg placeholder:text-zinc-500 ${
                  errors.unit_price ? "border-red-500" : "border-zinc-300"
                }`}
                placeholder="Enter Description"
                {...register("unit_price", { required: true })}
              />
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
                disabled={store.requestLoading}
                value={store.requestLoading ? "Wait..." : "Submit Changes"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </FramerModal>
  );
};

export default EditMaterialModal;
