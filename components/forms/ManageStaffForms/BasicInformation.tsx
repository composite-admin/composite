import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BasicInformation() {
  return (
    <div className="pt-2">
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <aside className="flex flex-col gap-2.5 w-1/2">
          <span>Photograhp</span>
          <span className="text-sm  text-textColor w-44  text-wrap">
            This image will be used to recognize the staff
          </span>
          <Button
            className="w-max h-[2.2rem] border-primaryLight border text-primaryLight font-sembold"
            variant="outline"
          >
            Upload photo
          </Button>
        </aside>
        <aside className="w-1/2">
          <AvatarComponent width="w-[100px]" height="h-[100px]" />
        </aside>
      </div>

      <div className="py-5">
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
          <div className='flex gap-5 flex-col md:flex-row pt-10'>
            <Button className='w-full' variant='secondary'> Cancel </Button>
            <Button className='w-full'>Submit </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
