export type FormContainerProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function FormContainer({
  title,
  description,
  children,
}: FormContainerProps) {
  return (
    <div className="grid lg:min-h-[35rem] grid-cols-1 lg:grid-cols-6 border mt-10 border-[#F0F2F5] shadow-lg rounded-2xl p-7">
      <div className="col-span-2 px-5 pt-3">
        <h3 className="text-responsive font-semibold">{title}</h3>
        <p className="text-[#475367] text-[1rem]">{description}</p>
      </div>
      <div className="col-span-4">{children}</div>
    </div>
  );
}
