import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authentication";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Navbar = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(false);
  const { loading } = useSelector((state) => state.authentication.signOut);

  function handleSignOut() {
    dispatch(logout());
  }

  return (
    <>
      <nav className="w-full h-[70px] bg-gray-900 text-gray-100 flex items-center justify-between">
        {loading && <Loader />}

        {/* Leftmost - Logo with some space */}
        <div className="pl-5 flex-shrink-0">
          <h6 className="text-2xl font-[Dancing Script] text-[#7FA1C3]">
            ERPGo SaaS
          </h6>
        </div>

        {/* Center - Navigation Menu */}
        <ul className="hidden md:flex flex-1 justify-center items-center gap-6">
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/"}><li>Home</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/material"}><li>Materials</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/vendor"}><li>Vendors</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/order"}><li>Orders</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/product"}><li>Products</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/production"}><li>Productions</li></Link>
          <Link className="text-sm hover:text-[#213555] transition-colors duration-300" to={"/sale"}><li>Sales</li></Link>
        </ul>


        {/* Rightmost - Logout Button with space */}
        <div className="pr-5 flex-shrink-0 hidden md:block">
          <button
            onClick={handleSignOut}
            className="bg-[#213555] hover:bg-[#3E5879] w-[140px] flex justify-center items-center h-[35px] rounded-3xl transition-colors duration-300"
            >
            <p><i className="fas fa-sign-out-alt text-xs mr-1"></i> Logout</p>
          </button>
        </div>

        {/* Rightmost - Mobile Menu Button */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="block md:hidden cursor-pointer pr-5"
        >
          <img className="w-[25px]" src="/menu.svg" alt="Menu" />
        </div>
      </nav>

      <ResponsiveNavbar
        loading={loading}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        handleSignOut={handleSignOut}
      />
    </>
  );
};

export default Navbar;
