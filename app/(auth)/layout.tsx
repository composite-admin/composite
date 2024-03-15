"use client";
import HeroImage from "@/components/auth/HeroImage";

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
