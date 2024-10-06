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
        className="block text-gray-700 text-sm font-bold mb-2"
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
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default InputType;
