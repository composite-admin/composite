import GoBack from "./GoBack";

export function BlockEdiComponent() {
  return (
    <>
      <GoBack />
      <div className="flex justify-center items-center flex-col h-screen">
        <p className="text-2xl font-bold">
          You do not have permission to carry out this action
        </p>
        <em>Contact your administrator</em>
      </div>
    </>
  );
}
