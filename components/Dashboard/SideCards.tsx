import Link from "next/link";
import { AvatarComponent } from "../shared/AvatarComponent";
import { Badge } from "../ui/badge";

interface Props {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  href?: string;
}

export default function SideCards({
  title,
  description,
  href,
  children,
}: Props) {
  return (
    <div className="shadow-sm bg-white border border-[#E4E7EC] rounded-2xl w-full max-w-sm p-3.5 min-h-[270px] flex flex-col justify-start">
      <div>
        <div className="flex justify-between items-center  pb-3.5">
          <div className="flex items-center gap-1.5 p-1 xl:w-max w-1/2">
            <h2 className="text-xs lg:text-sm capitalize font-semibold w-full">
              {title}
            </h2>
            <Badge
              variant="secondary"
              className="w-7 lg:w-9 bg-primaryLight-500 text-center  text-white hover:bg-primaryLight-500/90"
            >
              {description}
            </Badge>
          </div>
          <div className=" w-1/2 justify-end text-right text-xs text-primaryLight-500 underline font-semibold">
            <Link href={href || "#"}>View all</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

// <div className="flex justify-between items-center border-b py-3">
// <div className="flex gap-2 items-center">
//   <AvatarComponent />
//   <div className="text-xs flex flex-col">
//     <span className="text-sm">Alison Ogaga</span>
//     <span>CRN128320182</span>
//   </div>
// </div>
// <p className="text-primaryLight-500 font-semibold">View</p>
// </div>
// <div className="flex justify-between items-center border-b py-3">
// <div className="flex gap-2 items-center">
//   <AvatarComponent />
//   <div className="text-xs flex flex-col">
//     <span className="text-sm">Alison Ogaga</span>
//     <span>CRN128320182</span>
//   </div>
// </div>
// <p className="text-primaryLight-500 font-semibold">View</p>
// </div>
