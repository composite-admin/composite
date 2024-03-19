import GoBack from "@/components/shared/GoBack";

export default function page() {
  return (
    <div>
      <GoBack />
      <div>
        {/* request details */}
        <div className="grid grid-cols-1 xl:grid-cols-6 gap-8">
          <aside className="bg-white border-borderColor shadow-sm col-span-4 p-8 px-12 ">
            <h2>Request details</h2>
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between pr-8  ">
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
                    This building project is set to redefine the structure of
                    accomodation in the area
                  </span>
                </div>
              </div>

              <div className="flex-1 w-full pb-5 md:w-1/2 flex justify-between pr-8  ">
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
                    This building project is set to redefine the structure of
                    accomodation in the area
                  </span>
                </div>
              </div>
            </div>
          </aside>
          <aside className="bg-white border-borderColor shadow-sm col-span-2">
            no
          </aside>
        </div>

        {/* sevice details */}
        <div></div>
      </div>
    </div>
  );
}
