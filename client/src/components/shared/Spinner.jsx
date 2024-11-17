import React from "react";

const Spinner = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 md:p-0 p-4 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-slate-700 flex flex-col gap-4 items-center justify-center w-[400px] h-[250px] rounded-lg">
        <div className="animate-spin h-16 w-16 border-4 border-t-4 border-t-blue-500 dark:border-t-white border-gray-300 dark:border-gray-500 rounded-full"></div>
        <p className="dark:text-white text-lg font-semibold">{message}</p>
      </div>
    </div>
    
  );
};

export default Spinner;
