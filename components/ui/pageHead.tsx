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
  disabled?: boolean;
}

const PageHead = React.forwardRef<any, PageHeadProps>(
  ({
    headText,
    buttonText,
    buttonAction,
    disabled,
    subText,
    leftChild,
    can_create,
  }) => {
    return (
      <div className="flex justify-between my-10">
        <div>
          <h2 className="text-md font-[600]">{headText}</h2>
          <p className="text-[#475367] text-[16px]">{subText}</p>

          <div>{leftChild}</div>
        </div>

        {buttonText && (
          <Button
            onClick={() => buttonAction()}
            disabled={disabled}
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