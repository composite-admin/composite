"use client";
import { TestModal } from "@/components/Modals/TestModal";
import { useEffect, useState } from "react";


export const ModalProvider = () => {
  const [ismounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!ismounted) {
    return null;
  }

  return (
    <>
      <TestModal />
    </>
  );
};
