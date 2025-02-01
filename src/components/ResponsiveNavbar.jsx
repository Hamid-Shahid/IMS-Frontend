import { Link } from "react-router-dom";
import Loader from "./Loader";

const navLinks = [
  { name: "Home", link: "/", iconClass: "fa fa-home" },
  { name: "Material Management", link: "/material", iconClass: "fa fa-box" },
  { name: "Vendor Management", link: "/vendor", iconClass: "fa fa-users" },
  {
    name: "Order Management",
    link: "/order",
    iconClass: "fa fa-shopping-cart",
  },
  { name: "Product Management", link: "/product", iconClass: "fa fa-tags" },
  {
    name: "Production Management",
    link: "/production",
    iconClass: "fa fa-industry",
  },
  { name: "Sale Management", link: "/sale", iconClass: "fa fa-chart-line" },
];

function ResponsiveNavbar({
  showSidebar,
  setShowSidebar,
  handleSignOut,
  loading,
}) {
  return (
    <aside
      id="overflow"
      className={`text-white fixed md:hidden text-[0.72rem] top-0 h-screen bg-gray-900 transition-all duration-300 ease-in-out z-50 overflow-y-auto ${
        showSidebar ? "left-0" : "-left-full"
      } lg:left-0 w-full lg:w-[255px]`}
    >
      {loading && <Loader />}
      <div className="p-3 mt-3 sm:mt-5 flex justify-between lg:justify-center items-center space-x-2 px-7 animate-float">
        <div className="flex">
          <h6 className="text-2xl font-[Dancing Script] text-[#7FA1C3]">
            ERPGo SaaS
          </h6>
        </div>
        <div
          onClick={() => setShowSidebar(false)}
          className="lg:hidden w-[30px] h-[30px] bg-gray-600 hover:bg-gray-700 flex justify-center items-center rounded-full cursor-pointer transition-all ease-in-out"
        >
          <i className="fa-solid fa-xmark lg:hidden"></i>
        </div>
      </div>

      <ul className="flex flex-col gap-4 p-4 mt-6 overflow-y-auto">
        {navLinks.map((item, index) => (
          <li
            key={index}
            className="cursor-pointer border-b border-gray-700 py-[6px] hover:bg-[#213555] transition-colors duration-300"
          >
            <div className="flex justify-between items-center">
              <Link
                to={item.link}
                onClick={() => setShowSidebar(false)}
                className="flex items-center hover:text-gray-200"
              >
                <i className={`${item.iconClass} mr-3 text-gray-200`}></i>
                <p>{item.name.toUpperCase()}</p>
              </Link>
            </div>
          </li>
        ))}
        <button
          onClick={handleSignOut}
          className="flex items-center border-b py-[6px] border-[#4d4d4d] hover:text-gray-300"
        >
          <i className="fas fa-sign-out-alt mr-3 text-sm text-gray-300"></i>
          <p>LOGOUT</p>
        </button>
      </ul>
    </aside>
  );
}

export default ResponsiveNavbar;
