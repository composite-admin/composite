import InputComponent from "@/components/forms/MultiStepFoms/InputComponent";
import { Modal } from "@/components/shared/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddAndEditBreakDownModal } from "@/store/modals/useCreateModal";

export default function AddAndEditBreakdownModal() {
  const isOpen = useAddAndEditBreakDownModal((state) => state.isOpen);
  const onClose = useAddAndEditBreakDownModal((state) => state.onClose);
  const breakdownModalType = useAddAndEditBreakDownModal(
    (state) => state.breakdownModalType
  );

  if (breakdownModalType === "add") {
    return (
      <Modal
        title="Add Breakdown"
        description="Add to the cash advance breakdown here."
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl"
      >
        <form className="space-y-5">
          <div className="space-y-7">
            <div className='space-y-2'>
            <Label htmlFor="amount">Description</Label>
            <Input
              placeholder="eg: For cememtEnter "
              name="description"
            />
            </div>
            <div className='space-y-2'>
            <Label htmlFor="amount">Amount</Label>
            <Input
              placeholder="Enter amount"
              name="amount"
            />
            </div>
            <div className='space-y-2'>
          <Label htmlFor='commet'>
            Comment
            </Label>
        <Textarea
              placeholder="Lorem ipsum dolor sit amet consectetur. 
                Ac id vulputate accumsan arcu venenatis t
                ellus nulla eu
                Placeholder"
              name="description"
            />
        </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <Button variant={'secondary'} className='w-full'>Cancel</Button>
              <Button className="w-full">Submit</Button>

            </div>
          </div>
        </form>
      </Modal>
    );
  }

  if (breakdownModalType === "edit") {
    return (
      <Modal
        title="Add Comment"
        isOpen={isOpen}
        onClose={onClose}
        classname="max-w-xl"
      >
    <form className="space-y-5">
          <div className="space-y-7">
            <div className='space-y-2'>
            <Label htmlFor="amount">Request Code</Label>
            <Input
              placeholder="CPD141906"
              name="Request Code"
              value='CPD141906'
              disabled
              className="disabled:bg-gray-300"
            />
            </div>
            <div className='space-y-2'>
            <Label htmlFor="amount">Description</Label>
            <Input
              placeholder="eg: For cememtEnter "
              name="description"
            />
            </div>
            <div className='space-y-2'>
            <Label htmlFor="amount">Amount</Label>
            <Input
              placeholder="Enter amount"
              name="amount"
            />
            </div>
            <div className='space-y-2'>

          <Label htmlFor='commet'>
            Comment
            </Label>
        <Textarea
              placeholder="Lorem ipsum dolor sit amet consectetur. 
                Ac id vulputate accumsan arcu venenatis t
                ellus nulla eu
                Placeholder"
              name="description"
            />
        </div>

            <div className="flex flex-col lg:flex-row gap-8">
              <Button variant={'secondary'} className='w-full'>Cancel</Button>
              <Button className="w-full">Submit</Button>

            </div>
          </div>
        </form>
      </Modal>
    );
  }
}
