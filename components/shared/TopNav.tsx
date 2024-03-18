import { HiOutlineBell } from "react-icons/hi2";
import { RiSearch2Line } from "react-icons/ri";

const TopNav = () => {
  return (
    <div className="bg-white py-4 px-[50px] grid grid-cols-[1.5fr_1fr]">
      <div className="flex gap-3 px-2 items-center bg-[#F9FAFB] rounded-lg">
        <RiSearch2Line />
        <input
          type="text"
          className="w-full bg-transparent rounded-lg focus:outline-none"
          placeholder="Search any code from project, tenant, request..."
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <div className="flex w-[40px] h-[40px] bg-grey  items-center justify-center rounded-full">
          <HiOutlineBell />
        </div>

        <div className="flex items-center gap-3">
          <img
            className="w-[40px] h-[40px] rounded-full object-cover"
            src="https://variety.com/wp-content/uploads/2023/06/avatar-1.jpg?w=1000&h=563&crop=1&resize=681%2C383"
            alt=""
          />

          <div className="text-sm">
            <p className="text-[#344054]">Adebola Salami</p>
            <p className="font-[400] text-[#667185]">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
