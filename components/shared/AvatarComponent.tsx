"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userStore } from "@/store/auth/AuthStore";

type AvatarProps = {
  width?: string;
  height?: string;
  src?: string;
  classes?: string;
};

export function AvatarComponent({ height, width, src, classes }: AvatarProps) {
  return null;
}
