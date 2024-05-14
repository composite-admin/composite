import Link from "next/link";
import { AvatarComponent } from "../shared/AvatarComponent";
import { Badge } from "../ui/badge";

interface Props {
  title?: string;
  description?: number;
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
          <div className="flex items-center gap-1.5 p-1 xl:w-max w-max">
            <h2 className="text-xs lg:text-sm capitalize font-semibold w-max">
              {title}
            </h2>
            <Badge
              variant="secondary"
              className="w-5 lg:w-7 bg-primaryLight-500 text-center  text-white hover:bg-primaryLight-500/90"
            >
              {description || 0}
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

