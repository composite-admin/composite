import GoBack from "./GoBack";

export function BlockEdiComponent() {
  return (
    <>
      <GoBack />
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-bold">You do not have permission to edit</p>
      </div>
    </>
  );
}
