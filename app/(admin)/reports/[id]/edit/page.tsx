"use client";
import { TestModal } from "@/components/Modals/TestModal";
import GoBack from "@/components/shared/GoBack";
import { useTestModalStore } from "@/hooks/UseTestModal";
import React, { useState } from "react";





export default function ReportEditPage() {
    const [showOverlay, setOverlay] = useState<Boolean>(false);
  return (
    <div>page</div>
  )
}

// export default function page() {
//   const [showOverlay, setOverlay] = useState<Boolean>(false);
//   return (
//     <>
//       <GoBack />
//       <div className="my-5 rounded-lg border border-outline bg-white p-[29px]">
//         <div className="grid grid-cols-[1fr_3fr]  gap-10 pb-10">
//           <div className="flex gap-3 flex-col">
//             <div className="">
//               <h2 className="text-textColor2 text-[16px] font-[600]">
//                 Edit Report
//               </h2>
//               <p className="text-sm text-textColor">
//                 Update report details here.
//               </p>
//             </div>

//             <button className="bg-primaryLight text-sm text-white rounded-md py-2 px-5 w-fit">
//               Submit Changes
//             </button>
//           </div>

//           <div className="flex flex-col gap-3">
//             <div>
//               <p className="value">Report Type</p>
//               <div className="flex items-center gap-5 radio my-2">
//                 <div>
//                   <input type="radio" name="type" id="Daily" value={"daily"} />
//                   <p>Daily</p>
//                 </div>

//                 <div>
//                   <input type="radio" name="type" id="Daily" value={"weekly"} />
//                   <p>Weekly</p>
//                 </div>

//                 <div>
//                   <input
//                     type="radio"
//                     name="type"
//                     id="Daily"
//                     value={"monthly"}
//                   />
//                   <p>Monthly</p>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-5 edit">
//               <div className="flex flex-col">
//                 <p className="value">Project</p>

//                 <select name="" id="">
//                   <option value="Bode Peters">Bode Peters</option>
//                 </select>
//               </div>

//               <div className="flex flex-col">
//                 <p className="value">Project Summary</p>

//                 <select name="" id="">
//                   <option value="Bode Peters">Bode Peters</option>
//                 </select>
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               <p className="value">Project Supervisor</p>
//               <select name="" id="" className="w-full">
//                 <option value="">Abayomi Salomi</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-2 gap-5 edit-info">
//               <div className="flex flex-col gap-2">
//                 <p className="value">Challenges Encountered</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Proffered Solution</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Future Recommendation</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Proffered Solution</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Equipment on Site / Status</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Visitors to Site</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Weather Report</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <div className="flex flex-col gap-2">
//                 <p className="value">Progress Photograph</p>
//                 <textarea name="" id=""></textarea>
//               </div>

//               <button className="bg-[#EBEBEB] text-textColor rounded-md">
//                 Cancel
//               </button>
//               <button className="bg-primaryLight text-white  p-4 rounded-md">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* {showOverlay && <TestModal />} */}
//     </>
//   );
// }
