import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";

export default function page() {
  return (
    <>
    <GoBack/>
    <div>
        <div className="pt-10">
            <AvatarComponent  height="h-16" width="w-16"/>
        </div>
    </div>
    </>
  )
}