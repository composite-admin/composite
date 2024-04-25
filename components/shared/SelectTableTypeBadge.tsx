import { Badge } from "../ui/badge";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  onclick?: () => void;
  title: string;
  notification: number;
}

export default function SelectTableTypeBadge({
  icon,
  notification,
  title,
  onclick,
  ...props
}: Props) {
  return (
    <Badge
      variant="secondary"
      className={`flex bg-[#F0F2F5] border-borderColor items-center gap-2 p-2.5 rounded-[5px] w-max hover:bg-primaryLight-100 cursor-pointer ${props.className}`}
      onClick={onclick}
    >
      {icon}
      <span>{title}</span>
      <span className="bg-primaryLight-500 text-xs font-semibold text-white rounded-xl px-1.5 w-max">
        {notification}
      </span>
    </Badge>
  );
}
