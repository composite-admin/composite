"use client";

import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import { useGetClientDetails } from "@/hooks/useSelectOptions";
import { userStore } from "@/store/auth/AuthStore";
import { ChevronRight, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function ClientHomePage() {
  const { userId } = userStore();
  
  const { details, isClientDetailsLoading } = useGetClientDetails(userId!);
  return (
    <div className="lg:pr-24">
      <div>
        <aside className="bg-white flex-col md:flex-row flex justify-between items-center border-borderColor border p-6 gap-5 rounded-xl ">
          <div className="flex flex-col gap-2.5">
            <h2 className="text-responsive font-semibold">
              Welcome, {details?.first_name} {details?.last_name}
            </h2>
            <span className="text-textColor text-sm text-wrap max-w-xs">
              {details?.address}
            </span>
            <Link
              href="/client/profile"
              className="flex justify-between items-center text-sm font-semibold text-primaryLight w-32"
            >
              <span>View Profile</span>
              <span>
                <ChevronRight />
              </span>
            </Link>
          </div>
          <div>
            <AvatarComponent height="h-28" width="w-28" />
          </div>
        </aside>
      </div>
      <div>
        <div className="pb-12 flex gap-10 py-3  md:overflow-x-visible overflow-x-auto hide">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

const Card = () => {
  return (
    <div className="flex-col gap-6 space-y-3 border-borderColor border rounded-xl shadow-lg p-6 w-full min-w-[250px] sm:min-w-0 bg-white">
      <div className="flex justify-between items-center">
        <span>
          <HomeIcon />
        </span>
        <span className="text-primaryLight font-semibold">5</span>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">Projects</h2>
        <p className="text-textColor text-xs w-52  text-wrap">
          View and manage all the information regarding your projects
        </p>
      </div>
      <div className=" text-sm text-white font-semibold">
        <Button className="rounded-xl">View</Button>
      </div>
    </div>
  );
};
