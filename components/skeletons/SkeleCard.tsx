import { Skeleton } from "@/components/ui/skeleton";

export function SkeleCard() {
  return (
    <Skeleton className="shadow-sm bg-white border border-[#E4E7EC] rounded-2xl w-full max-w-sm p-3.5 min-h-[270px] flex flex-col justify-start">
      <Skeleton>
        <Skeleton className="flex justify-between items-center  pb-3.5">
          <Skeleton className="flex items-center gap-1.5 p-1 xl:w-max w-max">
            <Skeleton className="text-xs lg:text-sm capitalize font-semibold w-max " />
            <Skeleton className="w-5 lg:w-7  text-center text-white" />
          </Skeleton>
          <Skeleton className=" w-1/2 justify-end text-right text-xs underline font-semibold" />
        </Skeleton>
      </Skeleton>
      <div className="space-y-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Skeleton>
  );
}

export function ReportPageSkeleton() {
  return (
    <div className="my-5 rounded-lg  bg-white p-[29px] w-full min-h-[42rem]">
      <div className="grid md:grid-cols-6 gap-x-20">
        <div className="col-span-1 space-y-2">
          <Skeleton className="w-2/3 h-5" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-2/3 h-6" />
        </div>
        <div className="col-span-5 md:flex gap-5 ">
          <div className="grid grid-cols-2 gap-10  w-1/2">
            {Array.from({ length: 20 }).map((_, id) => (
              <Skeleton className="h-4 w-44" key={id} />
            ))}
          </div>
          <div className="grid grid-cols-2   w-1/2">
            {Array.from({ length: 20 }).map((_, id) => (
              <Skeleton className="h-4 w-52" key={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
