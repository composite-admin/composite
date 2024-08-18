import FramerModal from "@/components/shared/FramerModal";
import { Material, UpdateMaterialData } from "@/store/actions/materials-and-tools/types";
import { useModal } from "@/utils/modalContext";
import { SubmitHandler, useForm } from "react-hook-form";
import useSupplierMaterialsStore from "@/store/actions/materials-and-tools/materialsActions";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/config/api";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useStaffPrivilegeStore } from "@/store/staff/useStaffStore";

type Props = Row<Material>;

const EditMaterialModal: React.FC<Props> = (row) => {
  const { hideModal } = useModal();
  const { toast } = useToast();
  const { mat_desc, unit_price, quantity, mat_id } = row.original;

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateMaterialData>({
    defaultValues: { unit_price, quantity, mat_desc },
  });
  const { data: staffPrivilege } = useStaffPrivilegeStore();

  const CAN_EDIT = staffPrivilege?.find(
    (item: any) => item.type === "supplier"
  )?.can_edit;

  const store = useSupplierMaterialsStore();

  const { mutate } = useMutation({
    mutationKey: ["update-material", mat_id],
    mutationFn: async (data: UpdateMaterialData) => {
      try {
        const response = await api.put(`/suppliers-materials/${mat_id}`, data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message);
        } else {
          throw error;
        }
      }
    },
  });

  const onSubmit: SubmitHandler<UpdateMaterialData> = (data) => {
    mutate(data, {
      onSuccess: () => {
        hideModal();
        toast({
          title: "Supplier material updated successfully",
          variant: "success",
        });
        window.location.reload();
      },
    });
  };

  return (
    <FramerModal
      isOpen={true}
      isAutomatic={false}
      onClose={hideModal}>
      {!CAN_EDIT ? (
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
        <div className="lg:min-w-[30rem] md:min-w-[30rem] w-full bg-white rounded-lg p-10 sm:grid space-y-6 sm:space-y-0 grid-cols-[1.5fr_4fr]">
          <div className="space-y-2">
            <p className="text-xl font-bold">Edit Material</p>
            <p className="text-zinc-500">
              Make changes to supplier <br /> material
            </p>
            <div className="pt-4">
              <Button
                title="Submit Changes"
                onClick={handleSubmit(onSubmit)}>
                Submit Changes
              </Button>
            </div>
          </div>
          <div className="space-y-4 ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4 px-3">
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
      )}
    </FramerModal>
  );
};

export default EditMaterialModal;
