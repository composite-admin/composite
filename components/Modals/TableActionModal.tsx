import { useTableActionStore } from "@/store/useTableActionStore";
import { Modal } from "../shared/Modal";
import AddStartUpForm from "../forms/projects/AddStartUpForm";
import AddMaterialForm from "../forms/projects/AddMaterialForm";
import { Button } from "../ui/button";
import { api } from "@/config/api";

export default function TableActionModal() {
  const { onClose, isOpen, tableActions, isEditOrDelete, rowID, deleteUrl } =
    useTableActionStore();

  const deleteRow = async (arg: string) => {
    try {
      const res = await api.delete(`/${arg}/${rowID}`);
      if (res.status === 200) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
    console.log(rowID);
  };

  if (isEditOrDelete === "delete") {
    return (
      <Modal
        title="Delete"
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-lg"
      >
        <h1 className="text-red-500 font-semibold">
          Are you sure you want to delete this item?
        </h1>
        <div className="grid grid-cols-2 pt-3 gap-2">
          <Button type="button" variant={"secondary"} onClick={onClose}>
            No, Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => deleteRow(deleteUrl as string)}
          >
            Yes, I am sure
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      title="Edit Information"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-2xl"
    >
      {tableActions === "material-edit" ? (
        <p>
          {" "}
          <AddMaterialForm />
        </p>
      ) : tableActions === "start-up-cost-edit" ? (
        <AddStartUpForm />
      ) : null}
    </Modal>
  );
}
