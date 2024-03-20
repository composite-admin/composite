// import { columns } from "@/app/(admin)/inventory/columns";
import {columns as columnTwo} from "@/app/(admin)/consultants/columns";
import { data as dataTwo } from "@/app/(admin)/consultants/data";
// import { data } from "@/app/(admin)/inventory/data";
import { AvatarComponent } from "@/components/shared/AvatarComponent";
import { DataTable } from "@/components/shared/DataTable";
import GoBack from "@/components/shared/GoBack";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ClientDetailsPage() {
  return (
    <>
      <GoBack />
      <div>
        <div className="pt-1 flex gap-2.5">
          <AvatarComponent height="h-16" width="w-16" />
          <div className="flex flex-col">
            <span className="text-responsive font-semibold">
              Amarachi Okoro
            </span>
            <span className="text-xs text-subtext">DIN28372928</span>
          </div>
        </div>

        <div className="grid md:grid-cols-6 gap-10 pt-10">
          {/* details */}
          <div className="bg-white rounded-lg md:col-span-4 ">
            <h2 className="border-b p-7 text-lg font-semibold">
              Consultant Details
            </h2>
            <div className="p-7 flex flex-col gap-5 md:flex-row pb-28">
              {[1, 1, 1, 1].map((i) => {
                return (
                  <div className="flex flex-col gap-1 md:w-1/4 flex-1 " key={i}>
                    <span>Type</span>
                    <span className="font-semibold text-[calc(.5rem + 1vw)] md:text-lg">
                      Structural Engineer
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white flex-col flex max-w-xs rounded-lg md:col-span-2 auto-rows-min min-h-[20rem] md:max-w-full">
            <h2 className="border-b p-7 text-lg font-semibold">
              Consultant Details
            </h2>

            <div className="flex flex-col">
              <div className="flex gap-5 items-center border-b p-8">
                <div className="flex gap-2 items-center">
                  <AvatarComponent />
                </div>
                <div className="text-primaryLight-500 font-semibold">
                  <span className="text-sm">Edit Consultant Information</span>
                </div>
              </div>
              <div className="flex gap-5 items-center p-8">
                <div className="flex gap-2 items-center">
                  <AvatarComponent />
                </div>
                <div className="text-primaryLight-500 font-semibold">
                  <span className="text-sm">Add to Project</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10">
        <Tabs defaultValue="Project">
          <TabsList>
            <TabsTrigger value="project">Project</TabsTrigger>
            <TabsTrigger value="comment">Comment</TabsTrigger>
          </TabsList>
          <TabsContent value="project">
            {/* <DataTable columns={columns} data={data}/> */}
          </TabsContent>
          {/* <DataTable columns={columnTwo} data={dataTwo}/> */}
        </Tabs>
      </div>
    </>
  );
}