import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddCommentModal,
  useEditFlatModal,
} from "@/store/modals/useCreateModal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup, SelectLabel } from "@/components/ui/select";

export default function EditFlatModal() {
  const { isOpen, onClose, action } = useEditFlatModal();

  console.log();
  return (
    <Modal
      title="Edit Flat"
      description="Make changes to this flat"
      isOpen={isOpen}
      onClose={onClose}
      classname="max-w-xl"
    >
      <form className="space-y-5">
        <div>
          <Label>Project</Label>
          <Select disabled>
            <SelectTrigger>
              <SelectValue placeholder={action} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{action}</SelectLabel>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Flat Description</Label>
          <Textarea className="h-[5rem]" placeholder="Enter description" />
        </div>
        <div>
          <Label>Comment</Label>
          <Textarea className="h-[5rem]" placeholder="Enter comment here" />
        </div>
        <div className="flex flex-col lg:flex-row gap-3">
          <Button className="w-full" variant={"secondary"}>
            Cancel
          </Button>
          <Button className="w-full">Add Apartment</Button>
        </div>
      </form>
    </Modal>
  );
}
