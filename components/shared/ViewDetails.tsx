import { formatCurrency } from "@/utils/formatCurrency";
import {
  convertDateFormat,
  convertDateFormatToAllString,
  formatDateToString,
} from "@/utils/formatDate";
import { usePathname } from "next/navigation";
import React from "react";

export interface Keys {
  key: string;
  text: string;
}

interface KeysInterface {
  title?: string;
  dateSubmitted?: string;
  editAction?: any;
  keys: Keys[];
  children?: any;
  overideHeader?: boolean;
  headerChildren?: any;
  data?: any;
  can_edit?: boolean;
}

const ViewDetails = React.forwardRef<any, KeysInterface>(
  ({
    title,
    dateSubmitted,
    can_edit = true,
    editAction,
    keys,
    children,
    overideHeader,
    headerChildren,
    data,
  }) => {
    const pathname = usePathname();
    return (
      <div className="my-5 rounded-lg  bg-white p-[29px] w-full">
        <div className="grid sm:grid-cols-[1fr_3fr] gap-6 sm:gap-2  pb-10">
          <div className="flex gap-3 flex-col">
            {overideHeader ? (
              headerChildren
            ) : (
              <div className="space-y-1">
                <h2 className="text-textColor2 text-[16px] font-[600]">
                  {title}
                </h2>
                <p className="text-sm text-textColor">
                  Submitted on {formatDateToString(data?.createdAt)}
                </p>
                {can_edit ? (
                  <button
                    className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit"
                    onClick={editAction}
                  >
                    Edit {title}
                  </button>
                ) : null}
              </div>
            )}
          </div>

          {data && (
            <>
              <div
                className={`grid gap-10 info ${
                  pathname.includes("/inventory/")
                    ? "sm:grid-cols-2 md:grid-cols-3 "
                    : "sm:grid-cols-2 "
                }`}
              >
                {keys.map((key: Keys, i: number) => {
                  let date;
                  let formatted;
                  if (key.key == "createdAt" || key.key == "updatedAt") {
                    date = formatDateToString(data?.[key.key]);
                  }

                  if (key.key == "unit_price" || key.key == "total_price") {
                    formatted = formatCurrency(data[key.key]);
                  }
                  if (
                    key.key == "report_code" ||
                    key.key == "project_code" ||
                    key.key == "inventory_code"
                  ) {
                    // make uppercase
                    formatted = data[key.key]?.toUpperCase();
                  }

                  return (
                    <div key={i} className="flex flex-col gap-0.5">
                      <p className="text-black/80 font-semibold">{key.text}</p>
                      <p className="font-normal text-textColor">
                        {!date && !formatted
                          ? data[key.key]
                          : formatted || date}
                      </p>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div>
          {pathname.includes("/inventory/") && (
            <div className="grid grid-cols-8 w-full">
              <p className="col-span-2"></p>
              <p className="flex flex-col font-normal text-textColor col-span-6 w-full">
                <span className="text-textColor font-semibold">Comments:</span>{" "}
                <span className="capitalize">{data?.comment}</span>
              </p>
            </div>
          )}
          {children}
        </div>
      </div>
    );
  }
);

ViewDetails.displayName = "ViewDetails";
export default ViewDetails;
