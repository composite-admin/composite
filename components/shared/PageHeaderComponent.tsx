import { Button } from "../ui/button";

export default function PageHeaderComponent() {
  return (
    <div className="pb-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Welcome David</h1>
        <p className="text-[#475367] text-[1rem]">
          This is your dashboard, an overview of everything going on.
        </p>
      </div>
      <div>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
