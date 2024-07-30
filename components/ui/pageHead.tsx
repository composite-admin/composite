import React from 'react'
import { HiFilter, HiSearch, HiSortAscending } from "react-icons/hi"
import { Button } from './button'

interface PageHeadProps {
  headText: string;
  buttonText?: string;
  buttonAction?: any;
  subText: string;
  can_create?: boolean;
  leftChild?: any;
}

const PageHead = React.forwardRef<any, PageHeadProps>(
  ({ headText, buttonText, buttonAction, subText, leftChild, can_create }) => {
    return (
      <div className="flex justify-between my-10">
        <div>
          <h2 className="text-md font-[600]">{headText}</h2>
          <p className="text-[#475367] text-[16px]">{subText}</p>

          <div>{leftChild}</div>

          {/* <div className="flex gap-3 my-5 text-[#667185] text-sm">
                        <div className='flex items-center gap-1'>
                            <HiSearch />
                            <p>Search</p>
                        </div>

                        <div className='flex items-center gap-1'>
                            <HiFilter />
                            <p>Filter</p>
                        </div>

                        <div className='flex items-center gap-1'>
                            <HiSortAscending />
                            <p>Sort</p>
                        </div>
                    </div> */}
        </div>

        {buttonText && (
          <Button
            disabled={!can_create}
            onClick={() => buttonAction()}
            className="disabled:cursor-not-allowed"
          >
            {buttonText}
          </Button>
        )}
      </div>
    );
  }
);

PageHead.displayName = 'PageHead';

export default PageHead;