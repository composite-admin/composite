import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AvatarProps = {
  width?: string;
  height?: string;
  src?: string;
  classes?: string;
};

export function AvatarComponent({ height, width, src, classes }: AvatarProps) {
  return (
    <Avatar className={`${width ?? ""} ${height ?? ""} ${classes ?? ""}`}>
      <AvatarImage src={src ?? "https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
