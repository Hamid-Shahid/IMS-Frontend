import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/authentication";
import Loader from "./Loader";

const Header = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.authentication.signOut);
  const {
    user: { username },
  } = useSelector((state) => state.authentication.signIn);

  function handleSignOut() {
    dispatch(logout());
  }

  return (
    <nav className="w-full mb-6 h-[70px] bg-gray-900 text-gray-100 flex justify-between px-5 items-center">
      {loading && <Loader />}

      {/* Left Section - Logo */}
      <div className="flex">
        <h6 className="text-2xl font-[Dancing Script] text-[#7FA1C3]">
          ERPGo SaaS
        </h6>
      </div>

      {/* Right Section - User Info & Logout */}
      <div className="flex items-center gap-4 text-sm">
        <p>{username.slice(0, 1).toUpperCase() + username.slice(1)}</p>
        <span> | </span>
        <button
          onClick={handleSignOut}
          className="bg-[#213555] hover:bg-[#3E5879] w-[140px] flex justify-center items-center h-[35px] rounded-3xl transition-colors duration-300"
          >
          <p>
            <i className="fas fa-sign-out-alt text-xs mr-1"></i> Logout
          </p>
        </button>
      </div>
    </nav>
  );
};

export default Header;
