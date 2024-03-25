import React from "react";

export interface Keys {
  key: string;
  text: string;
}

interface KeysInterface{
    title?: string;
    dateSubmitted?: string;
    editAction?: any,
    keys: Keys[],
    children?: any,
    overideHeader?: boolean,
    headerChildren?: any
}

const ViewDetails = React.forwardRef<any, KeysInterface>(
  ({ title, dateSubmitted, editAction, keys, children, overideHeader, headerChildren }) => {
    return (
      <div className="my-5 rounded-lg  bg-white w-full">
        <div className="grid grid-cols-[1fr_3fr]  gap-10 border-b border-b-outline pb-10">
          <div className="flex gap-3 flex-col">

            {
              overideHeader ?
              headerChildren
              :
              <div className="">
              <h2 className="text-textColor2 text-[16px] font-[600]">
                {title}
              </h2>
              <p className="text-sm text-textColor">
                Submitted on {dateSubmitted}
              </p>
              <button
              className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit"
              onClick={editAction}
            >
              Edit Report
            </button>
            </div>
            }

            
          </div>

          <div className="grid grid-cols-2 gap-10 info">
            {keys.map((key: Keys, i: number) => {
              return (
                <div key={i}>
                  <p className="key">{key.text}</p>
                  <p className="value">RCPD155</p>
                </div>
              );
            })}
          </div>
        </div>

        <div>{children}</div>
      </div>
    );
  }
);

ViewDetails.displayName = "ViewDetails";
export default ViewDetails;
