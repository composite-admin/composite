import clsx from "clsx";
export type FormContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  isColumn: boolean; //make this optional later
};

export default function FormContainer({
  title,
  description,
  children,
  isColumn,
}: FormContainerProps) {
  return (
    <div
      className={clsx(
        "grid lg:min-h-[32rem] w-full mx-auto grid-cols-1 bg-white border mt-10 border-[#F0F2F5] shadow-sm rounded-2xl p-7 pb-12",
        isColumn ? "lg:block max-w-4xl" : "lg:grid-cols-6"
      )}
    >
      <div
        className={clsx("col-span-2 px-5 pt-2", {
          "px-0 py-7 space-y-1.5 ": isColumn,
        })}
      >
        <h3 className="text-responsive font-semibold">{title}</h3>
        {description ? <p className="text-textColor text-xs">{description}</p> : null}
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
