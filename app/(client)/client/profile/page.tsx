import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

export default function ClientProfilePage() {
  return (
    <div>
      <div>
        <h1 className="text-responsive font-semibold">Profile</h1>
      </div>
      <div className="md:grid grid-cols-6 space-y-8 md:space-y-0 rounded-xl p-5 py-9 bg-white border border-borderColor">
        <div className="col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-textColor">Update your personal information</p>
          </div>
          <div>
            <AvatarComponent height="h-28" width="w-28" />
          </div>
          <div>
            <Button
              className="text-sm text-primaryLight gap-2 font-semibold rounded-xl border border-primaryLight w-max p-1"
              variant={"outline"}
            >
              <Upload />
              Change Photo
            </Button>
          </div>
        </div>
        <div className="col-span-4">
          <form className="space-y-6">
            <div className="flex flex-col ">
              <div className="flex gap-5">
                <div className="space-y-2 w-full ">
                  <Label>First name</Label>
                  <Input
                    type="text"
                    placeholder="johndoe@me.com"
                    disabled
                    className="disabled:bg-gray-200 border"
                  />
                </div>{" "}
                <div className="space-y-2 w-full ">
                  <Label>Last name</Label>
                  <Input
                    type="text"
                    placeholder="johndoe@me.com"
                    disabled
                    className="disabled:bg-gray-200 border"
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <div className="space-y-2 w-full ">
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                    placeholder="johndoe@me.com"
                    disabled
                    className="disabled:bg-gray-200 border"
                  />
                </div>{" "}
                <div className="space-y-2 w-full ">
                  <Label>Email Address</Label>
                  <Input
                    type="text"
                    placeholder="johndoe@me.com"
                    disabled
                    className="disabled:bg-gray-200 border"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                type="text"
                placeholder="johndoe@me.com"
                disabled
                className="disabled:bg-gray-200 border"
              />
            </div>
            <div className="space-y-2">
              <Label>Address</Label>
              <Input
                type="text"
                placeholder=" No. 11 Alhaja Jaiyeola Street"
                className="disabled:bg-gray-200 border"
              />
            </div>
            <div className="space-y-2">
              <Label>Lagos</Label>
              <Input
                type="text"
                placeholder="Lagos"
                className="disabled:bg-gray-200 border"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
