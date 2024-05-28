import { formatCurrency } from "@/utils/formatCurrency";
import {
  convertDateFormat,
  convertDateFormatToAllString,
  formatDateToString,
} from "@/utils/formatDate";
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
}

const ViewDetails = React.forwardRef<any, KeysInterface>(
  ({
    title,
    dateSubmitted,
    editAction,
    keys,
    children,
    overideHeader,
    headerChildren,
    data,
  }) => {
    return (
      <div className="my-5 rounded-lg  bg-white p-[29px] w-full">
        <div className="grid sm:grid-cols-[1fr_3fr] gap-6 sm:gap-2 border-b border-b-outline pb-10">
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
                <button
                  className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit"
                  onClick={editAction}
                >
                  Edit {title}
                </button>
              </div>
            )}
          </div>

          {data && (
            <div className="grid sm:grid-cols-2 gap-10 info">
              {keys.map((key: Keys, i: number) => {
                let date;
                let formatted;
                if (key.key == "createdAt" || key.key == "updatedAt") {
                  date = formatDateToString(data?.[key.key]);
                }

                if (key.key == "unit_price" || key.key == "total_price") {
                  formatted = formatCurrency(data[key.key]);
                }
                if (key.key == "report_code" || key.key == "project_code") {
                  // make uppercase
                  formatted = data[key.key]?.toUpperCase();
                }

                return (
                  <div key={i} className="flex flex-col gap-0.5">
                    <p className="text-black/80 font-semibold">{key.text}</p>
                    <p className="font-normal text-textColor">
                      {!date && !formatted ? data[key.key] : formatted || date}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div>{children}</div>
      </div>
    );
  }
);

ViewDetails.displayName = "ViewDetails";
export default ViewDetails;
