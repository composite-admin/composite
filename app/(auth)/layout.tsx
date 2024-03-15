"use client";
import HeroImage from "@/components/auth/HeroImage";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { RiLock2Fill, RiMailCloseLine } from "react-icons/ri";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="m-[24px] grid grid-cols-2 gap-10">
      <HeroImage />
      {children}
    </section>
  );
}
