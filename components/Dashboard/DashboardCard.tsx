import { CardGraphIcon, TotalProjectsIcon } from "../icons";
import { Badge } from "../ui/badge";

type Props = {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  withIcon?: boolean;
};

export default function DashboardCard({
  title,
  description,
  icon,
  withIcon,
}: Props) {
  return (
    <div className=" border-borderColor border py-5 rounded-xl shadow-lg p-3 w-full min-w-[250px] sm:min-w-0 bg-white">
      <div className="space-y-2.5">
        <h3 className="text-sm font-semibold text-textColor uppercase">
          {title ?? "Total Projects"}
        </h3>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg text-textColor uppercase">
            {description ?? "1"}
          </p>
          <div className="bg-[#F0F1FA] p-1.5 w-10 h-10 flex justify-center items-center rounded-full">
            {withIcon ? icon : <TotalProjectsIcon />}
          </div>
        </div>
      </div>
    </div>
  );
}
