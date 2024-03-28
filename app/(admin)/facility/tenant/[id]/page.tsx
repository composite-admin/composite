/* eslint-disable react/no-unescaped-entities */
import DashboardCard from "@/components/Dashboard/DashboardCard";
import SideCards from "@/components/Dashboard/SideCards";
import GoBack from "@/components/shared/GoBack";

export default function TenantPage() {
  return (
    <div>
      <GoBack />
      <div>
        <div>
          <h1 className="font-semibold">Jennifer Johnson</h1>
          <span className="text-textColor">RHDGJSJN</span>
        </div>
        <div className="flex flex-col lg:grid gap-8 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="pb-12 flex gap-5 py-3 md:overflow-x-visible overflow-x-auto hide">
              <DashboardCard />
              <DashboardCard />
              <DashboardCard />
            </div>
            <div>
              <aside className="bg-white border-borderColor rounded-md shadow-sm col-span-4 p-3 lg:p-8 lg:px-12 ">
                <h2>Request details</h2>
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between lg:pr-8 gap-3 ">
                    <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                      <span>Request code:</span>
                      <span>Staff Name:</span>

                      <span>Project Name:</span>

                      <span>Supervisor's Comment:</span>
                    </div>

                    <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm">
                      <span>RCPD119548</span>

                      <span>Bode Peters</span>

                      <span>GRA Office Renovation</span>

                      <span>
                        This building project is set to redefine the structure
                        of accomodation in the area
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 w-full pb-5 md:w-1/2 flex gap-3 justify-between lg:pr-8  ">
                    <div className="flex flex-col gap-10 w-1/2 flex-1 text-textColor text-sm">
                      <span>Request code:</span>
                      <span>Staff Name:</span>
                      <span>Project Name:</span>
                      <span>Supervisor's Comment:</span>
                    </div>

                    <div className="flex flex-col gap-10 w-1/2 flex-1 text-sm">
                      <span>RCPD119548</span>
                      <span>Bode Peters</span>
                      <span>GRA Office Renovation</span>
                      <span>
                        This building project is set to redefine the structure
                        of accomodation in the area
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
          <div className="col-span-2">
            <div>
              <SideCards />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
