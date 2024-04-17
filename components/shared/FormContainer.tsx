import clsx from "clsx";
export interface FormContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children: React.ReactNode;
  isColumn: boolean; //make this optional later
  withIcon?: boolean;
  icon?: React.ReactNode;
}

export default function FormContainer({
  title,
  icon,
  withIcon,
  description,
  children,
  isColumn,
  ...props
}: FormContainerProps) {
  return (
    <div
      className={clsx(
        "grid lg:min-h-[32rem] w-full mx-auto grid-cols-6 bg-white border mt-10 border-[#F0F2F5] shadow-sm rounded-2xl p-7 pb-12",
        isColumn ? "lg:block max-w-4xl" : "",
        `${props.className}`
      )}
    >
      <div
        className={clsx("col-span-2 pt-2", {
          "px-0 py-7 space-y-1.5 ": isColumn,
        })}
      >
        {withIcon ? (
          <div className="flex items-center gap-5">
            <span className="rounded-full bg-primaryLight-100/50 p-2">
              {icon}
            </span>
            <h3 className="text-responsive font-semibold">{title}</h3>
          </div>
        ) : (
          <h3 className="text-responsive font-semibold">{title}</h3>
        )}
        {description ? (
          <p className="text-textColor text-sm">{description}</p>
        ) : null}
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
