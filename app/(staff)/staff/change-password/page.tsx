import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HomeIcon } from "lucide-react";

export default function ChangePasswordPage() {
  return (
    <div>
      <div>
        <GoBack />
      </div>
      <div >
        <FormContainer
          title="New Request"
          withIcon
          isColumn
          icon={<HomeIcon />}
        >
        <div className="space-y-6">
        <div className="flex flex-col w-full gap-2.5">
            <Label>Select Request Type</Label>
            <select
              className="border h-12 border-borderColor p-2  rounded-md"
              id="Cash advance"
              title="Cash advance"
            >
              <option value="Cash Advance project">Cash Advance Project</option>
            </select>
          </div>
          <div className="flex flex-col md:flex-row w-full gap-2.5">
          <div className="flex flex-col w-full gap-2.5">
              <Label>Enter Amount</Label>
              <Input
                type="text"
                placeholder="Enter Amount"
              />
            </div>
            <div className="flex flex-col w-full gap-2.5">
              <Label>Enter Description</Label>
              <Input
                placeholder="Enter Description"
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2.5">
              <Label>Purpose</Label>
              <Input
                placeholder="Enter Purpose"
              />
            </div>
            <div className="flex flex-col w-full gap-2.5">
              <Label>Enter Description</Label>
              <Textarea
              className="h-16"
                placeholder="Enter Description"
              />
            </div>
            <div className="flex flex-col w-full gap-2.5">
              <Label>Comment</Label>
              <Textarea
                placeholder="Enter Comment"
              />
            </div>
            <div className="flex flex-col md:flex-row w-full gap-5">
              <Button className="w-full" variant={"secondary"}>Cancel</Button>
              <Button className="w-full">Submit</Button>
            </div>
        </div>
        </FormContainer>
      </div>
    </div>
  );
}
