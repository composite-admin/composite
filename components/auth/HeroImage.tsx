export default function HeroImage() {
  return (
    <div className="w-full h-[92.5vh] login relative">
      <div className="flex gap-2 p-[24px]">
        <img src="./logo.png" alt="" className="w-[35px] object-cover" />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="loginFoot bg-primaryLight-500 absolute bottom-0 left-0 right-0 w-full text-white p-[30px]">
        <h1 className="text-[50px] font-[600]">
          Manage and monitor all project from idea to execution
        </h1>
        <p className="text-[20px]">
          Oversee and track all phases of construction projects, from conception
          to completion, ensuring efficient management and successful execution
        </p>
      </div>
    </div>
  );
}
