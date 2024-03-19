'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTestModalStore } from "@/hooks/UseTestModal";

export default function Home() {
  const onOpen = useTestModalStore((state) => state.isOpen);
  return (
    <>
      <div>
        <Button variant={"secondary"} onClick={() => onOpen}>Click me</Button>
      </div>
    </>
  );
}
