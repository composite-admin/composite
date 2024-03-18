'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTestModalStore } from "@/hooks/UseTestModal";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useTestModalStore((state) => state.onOpen);
  return (
    <>
      <div>
        <Button variant={"secondary"} onClick={onOpen}>Click me</Button>
      </div>
    </>
  );
}
