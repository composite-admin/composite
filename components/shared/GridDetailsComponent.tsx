import { GridDetailsType } from "@/utils/types";

export default function GridDetailsComponent ({
    data,
    withHeader,
    children,
  }: GridDetailsType) {
    // Divide data into two columns
    const midpoint = Math.ceil(data.length / 2);
    const leftData = data.slice(0, midpoint);
    const rightData = data.slice(midpoint);
  
    return (
      <div className="bg-white border-borderColor border p-6 my-8 rounded-lg shadow-sm">
        {withHeader ? <div className='pr-4 s'>{children}</div> : null}
        <div className="flex flex-col md:flex-row md:grid md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-10 w-full ">
            {leftData.map((item) => (
              <div key={item.key} className="flex">
                <span className="w-1/2 text-sm text-">{item.key}</span>
                <span className="w-1/2 text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-10 w-full ">
            {rightData.map((item) => (
              <div key={item.key} className="flex">
                <span className="w-1/2 text-sm text-">{item.key}</span>
                <span className="w-1/2 text-sm font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  