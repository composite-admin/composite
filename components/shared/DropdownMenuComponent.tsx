import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
  triggerText: string;
  items: string[];
  isOpen?: boolean;
};

export function DropdownMenuComponent({ triggerText, items, isOpen }: Props) {
  const [triggered, setTriggered] = useState(isOpen ?? false);
  return (
    <DropdownMenu onOpenChange={() => setTriggered(!triggered)}>
      <DropdownMenuTrigger
        asChild
        className="w-full flex items-center border-none justify-between gap-5 hover:bg-transparent bg-transparent p-0 m-0 focus-visible:ring-0 hover:text-primarylight"
      >
        <Button variant="outline" className="w-max">
          {triggerText}
          <ChevronDown
            className={`size-5 transition-all ${triggered ? "rotate-180" : ""}`}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-max">
        {items &&
          items.map((item) => (
            <DropdownMenuItem
              className="flex gap-2 items-center border border-borderColor/40 rounded-lg"
              key={item}
            >
              <Link href={item}>{item ?? null}</Link>
              <ChevronRight className="size-3.5 transition-all" />
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
