import React from "react";

const Spinner = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/35 backdrop-blur-md z-50">
      <div className="bg-white flex flex-col gap-4 items-center justify-center w-[400px] h-[250px] rounded-lg">
        <div className="animate-spin h-16 w-16 border-4 border-t-4 border-t-blue-500 border-gray-300 rounded-full"></div>
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
    
  );
};

export default Spinner;
