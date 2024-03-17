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
  isColumn = false,
}: FormContainerProps) {
  return (
    <div
      className={clsx(
        "grid lg:min-h-[32rem] grid-cols-1 lg:grid-cols-6 border mt-10 border-[#F0F2F5] shadow-lg rounded-2xl p-7 pb-12",
        { "lg:grid-cols-1 max-w-4xl mx-auto": isColumn }
      )}
    >
      <div
        className={clsx("col-span-2 px-5 pt-2", {
          "px-0 py-7 space-y-1.5": isColumn,
        })}
      >
        <h3 className="text-responsive font-semibold">{title}</h3>
        <p className="text-[#475367] text-[1rem]">{description}</p>
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
