import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RoleAndPassword() {
  return (
    <div>
    <form>
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full md:w-1/2 space-y-3">
          <div className="space-y-2">
            <Label className="py-2" htmlFor="name">
              First name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label className="py-2" htmlFor="name">
              First name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-3">
          <div className="space-y-2">
            <Label className="py-2" htmlFor="name">
              First name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div className="space-y-2">
            <Label className="py-2" htmlFor="name">
              First name
            </Label>
            <Input id="name" placeholder="John Doe" />
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-col md:flex-row pt-10">
        <Button className="w-full" variant="secondary">
          Cancel
        </Button>
        <Button className="w-full">Submit </Button>
      </div>
    </form>
  </div>
  )
}