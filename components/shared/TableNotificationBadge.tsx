import { Plus } from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  icon?: React.ReactNode;
  onclick?: () => void;
  title?: string;
  notification?: string;
};

export default function TableNotificationBadge({icon,notification, title, onclick}: Props) {
  return (
    <Badge
      variant="secondary"
      className="flex bg-[#F0F2F5] border-borderColor items-center gap-2 p-2 rounded-[5px] w-max hover:bg-primaryLight-100 cursor-pointer"
    >
      <Plus className="w-4 h-4" />
      <span>All tenant</span>
      <span>10</span>
    </Badge>
  );
}
