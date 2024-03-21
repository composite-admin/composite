import React from "react";
import { HiChevronRight } from "react-icons/hi2";

interface Step {
  id: string;
  name: string;
}

interface StepNavigationProps {
  steps: Step[];
  currentStep: number;
  next: () => void;
  prev: () => void;
}

const StepTopNav: React.FC<StepNavigationProps> = ({
  steps,
  currentStep,
  next,
  prev,
}) => {
  return (
    <div className="bg-white justify-between items-center w-full px-10 py-5 rounded-md">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="space-y-4 md:flex md:space-x-8 md:space-y-0  w-full"
        >
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div className={`cursor-pointer flex gap-3 items-center`}>
                {index !== 0 && <HiChevronRight />}
                <div
                  className={`w-[30px] h-[30px] rounded-full ${
                    currentStep === index ? "bg-primaryLight" : "bg-[#959595]"
                  } text-white flex items-center justify-center`}
                >
                  {step.id}
                </div>
                <p
                  className={`${
                    currentStep === index ? "text-primaryLight" : "text-[#959595]"
                  } font-[600] text-[16px]`}
                >
                  {step.name}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default StepTopNav;
