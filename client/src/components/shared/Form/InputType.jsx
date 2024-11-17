import React from "react";

function InputType({
  value,
  placeholder,
  onChange,
  name,
  inputType,
  labelText,
  labelFor,
}) {
  return (
    <div className="mb-1 w-full">
      <label
        className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
        htmlFor={labelFor}
      >
        {labelText}
      </label>
      <input
        type={inputType}
        id={labelFor}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none block w-full p-2.5 dark:bg-gray-800 dark:placeholder-gray-500 dark:text-gray-100 dark:focus:ring-gray-500"
      />
    </div>
  );
}

export default InputType;
