import { AvatarComponent } from "@/components/shared/AvatarComponent";
import GoBack from "@/components/shared/GoBack";

export default function page() {
  return (
    <>
      <GoBack />
      <div>
        <div className="pt-10 flex gap-2.5">
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

            <div className='flex flex-col'>
              <div className="flex gap-5 items-center border-b p-8">
                <div className="flex gap-2 items-center">
                  <AvatarComponent />
                </div>
                <div className="text-primaryLight-500 font-semibold">
                    <span className="text-sm">Edit Consultant  Information</span>                
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
    </>
  );
}
