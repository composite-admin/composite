"use client";

import GoBack from "@/components/shared/GoBack";
import { testdata } from "@/utils/contents";
import GridDetailsComponent from "@/components/shared/GridDetailsComponent";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { Button } from "@/components/ui/button";
import EditStaffForm from "./EditStaffForm";
import { useQuery } from "@tanstack/react-query";
import { IStaffDetailsData } from "@/utils/types";
import { getStuffTyped } from "@/hooks/useSelectOptions";

export default function EditStaffPage({ params }: { params: { id: string } }) {
  const { data } = useQuery({
    queryKey: ["get client details", params.id],
    queryFn: () => getStuffTyped<IStaffDetailsData>(`/staffs/${params.id}`),
    refetchOnMount: "always",
  });
  return <EditStaffForm data={data} />;
  // return (
  //   <div>
  //     <GoBack />
  //     <div className="max-w-3xl">
  //       <GridDetailsComponent withHeader data={testdata}>
  //         <div className="pb-12 flex flex-col gap-8 sm:flex-row justify-between">
  //           <div className="flex gap-5 items-center">
  //             <AvatarComponent />
  //             <div className="flex flex-col">
  //               <span className="text-lg font-semibold">Amarachi Okoro</span>
  //               <span className="text-textColor">DIN28372928</span>
  //             </div>
  //           </div>
  //           <div>
  //             <Button className="py-2 w-full sm:w-[9rem] rounded-xl">
  //               Edit Staff
  //             </Button>
  //           </div>
  //         </div>
  //       </GridDetailsComponent>
  //     </div>
  //   </div>
  // );
}
