import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      id="modal"
      className="fixed bg-gray-900 bg-opacity-40 inset-0 z-50 flex justify-center items-center"
    >
      <div className="w-[75px] h-[75px] rounded-xl bg-white flex justify-center items-center">
        <ClipLoader color={"black"} size={20} />
      </div>
    </div>
  );
};

export default Loader;
