const Sidebar = ({ active = 0 }) => {
  const nav = [
    {
      title: "Dashboard",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Reports",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Inventory",
      icon: "./home.png",
      link: "/",
      sub: ["", ""],
    },
    {
      title: "Project",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Suppliers",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Contractors",
      icon: "./home.png",
      link: "/",
      sub: ["", ""],
    },
    {
      title: "Stakeholders",
      icon: "./home.png",
      link: "/",
      sub: ["", ""],
    },
    {
      title: "Workers",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Request",
      icon: "./home.png",
      link: "/",
      update: "10",
    },
    {
      title: "Cash Advance",
      icon: "./home.png",
      link: "/",
      update: "10",
    },
    {
      title: "Manage Staff",
      icon: "./home.png",
      link: "/",
      sub: ["", ""],
    },
    {
      title: "Manage Client",
      icon: "./home.png",
      link: "/",
    },
  ];

  const footItem = [
    {
      title: "Support",
      icon: "./home.png",
      link: "/",
    },
    {
      title: "Settings",
      icon: "./home.png",
      link: "/",
    },
  ];

  return (
    <aside className="py-4 px-8 bg-primaryDark h-full">
      {/* <div className=" min-h-[100vh] p-3 overflow-y-auto"> */}
      <div className="flex gap-2 items-center justify-center">
        <img src="./logo.png" alt="" />
        <h1 className="text-white text-[26px] font-[600]">composite</h1>
      </div>

      <div className="my-4">
        {nav.map((item: any, i: number) => {
          return (
            <div
              key={i}
              className={`flex gap-2 p-[12px_16px] rounded-md ${
                active == i && "bg-layer"
              }`}
            >
              <img src={item.icon} alt="" />
              <p className="text-white text-sm">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="">
        {footItem.map((item: any, i: number) => {
          return (
            <div key={i} className={`flex gap-2 p-[12px_16px] rounded-md`}>
              <img src={item.icon} alt="" />
              <p className="text-white text-sm">{item.title}</p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
