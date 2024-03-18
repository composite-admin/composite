import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarProps = {
  width?: string;
  height: string;
}

export function AvatarComponent({height,width}: AvatarProps) {
  return (
    <Avatar className={`${width} ${height} `}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
