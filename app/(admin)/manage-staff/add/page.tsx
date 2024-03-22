"use client";

import BankAccount from "@/components/forms/ManageStaffForms/BankAccount";
import BasicInformation from "@/components/forms/ManageStaffForms/BasicInformation";
import NextOfKin from "@/components/forms/ManageStaffForms/NextOfKin";
import RoleAndPassword from "@/components/forms/ManageStaffForms/RoleAndPassword";
import FormContainer from "@/components/shared/FormContainer";
import GoBack from "@/components/shared/GoBack";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi2";

export default function AddStaffpage() {
  const [index, setIndex] = useState(1);
  return (
    <>
      <GoBack />
      <div>
        <div className=" m-auto my-10">
          <div className="flex bg-white flex-col md:flex-row md:justify-between md: gap-8 md:gap-0 items-center w-full px-10 py-5 rounded-md">
            <div
              className={`cursor-pointer flex gap-3 items-center`}
              onClick={() => setIndex(1)}
            >
              <div
                className={`w-[30px] h-[30px] rounded-full ${
                  index == 1 ? "bg-primaryLight" : "bg-[#959595]"
                } text-white flex items-center justify-center`}
              >
                1
              </div>
              <p
                className={`${
                  index == 1 ? "text-primaryLight" : "text-[#959595]"
                } font-[600] text-[16px]`}
              >
                Basic Information
              </p>
            </div>

            <HiChevronRight />

            <div
              className={`cursor-pointer flex gap-3 items-center`}
              onClick={() => setIndex(2)}
            >
              <div
                className={`w-[30px] h-[30px] rounded-full ${
                  index == 2 ? "bg-primaryLight" : "bg-[#959595]"
                } text-white flex items-center justify-center`}
              >
                2
              </div>
              <p
                className={`${
                  index == 2 ? "text-primaryLight" : "text-[#959595]"
                } font-[600] text-[16px]`}
              >
                {" "}
                Next of kin
              </p>
            </div>

            <HiChevronRight />

            <div
              className={`cursor-pointer flex gap-3 items-center`}
              onClick={() => setIndex(3)}
            >
              <div
                className={`w-[30px] h-[30px] rounded-full ${
                  index == 3 ? "bg-primaryLight" : "bg-[#959595]"
                } text-white flex items-center justify-center`}
              >
                3
              </div>
              <p
                className={`${
                  index == 3 ? "text-primaryLight" : "text-[#959595]"
                } font-[600] text-[16px]`}
              >
                Roles and Passwords
              </p>
            </div>

            <HiChevronRight />

            <div
              className={`cursor-pointer flex gap-3 items-center`}
              onClick={() => setIndex(4)}
            >
              <div
                className={`w-[30px] h-[30px] rounded-full ${
                  index == 4 ? "bg-primaryLight" : "bg-[#959595]"
                } text-white flex items-center justify-center`}
              >
                4
              </div>
              <p
                className={`${
                  index == 4 ? "text-primaryLight" : "text-[#959595]"
                } font-[600] text-[16px]`}
              >
                Bank Account
              </p>
            </div>
          </div>

          <FormContainer title="Add Staff" description="Create a new staff profile" isColumn={false}>
            {index == 1 ? (
              <BasicInformation />
            ) : index == 2 ? (
              <NextOfKin />
            ) : index == 3 ? (
              <RoleAndPassword />
            ) : (
              <BankAccount />
            )}
          </FormContainer>
        </div>
      </div>
    </>
  );
}

// form component names: <BasicInformation />, <NextOfKin />, <RolesAndPasswords />, <BankAccount/>
