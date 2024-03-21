import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateRequestModal } from "@/store/modals/useCreateModal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function UpdateRequestModal() {
  const isOpen = useUpdateRequestModal((state) => state.isOpen);
  const onClose = useUpdateRequestModal((state) => state.onClose);

  return (
    <Modal
      title="Add Comment"
      description="Make changes to supplier material"
      isOpen={isOpen}
      onClose={onClose}
      classname="w-[90%] md:max-w-3xl"
    >
      <form className="space-y-5">
        <div className="space-y-4">
          <div className="space-y-4">
            <Input
              value="Cash advance - request type"
              className="bg-gray-200 text-textColor"
            />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label>Purpose</Label>
            <Input placeholder="Foundation" />
            <Label>Description</Label>
            <Textarea placeholder="Foundation" />
          </div>
        </div>
        <div className="w-full">
          <Button className="w-full">Done</Button>
        </div>
      </form>
    </Modal>
  );
}
