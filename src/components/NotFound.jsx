import React from "react";

const NotFound = ({ message }) => {
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center">
      <i className="fas fa-ban text-2xl text-gray-400"></i>
      <p className="mt-2 text-sm text-gray-500">No {message} found</p>
    </div>
  );
};

export default NotFound;
