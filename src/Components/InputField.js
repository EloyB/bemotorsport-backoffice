import React from "react";

export default function InputField({ placeholder, onChange, value }) {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 bg-gray-50 w-full rounded pl-4 outline-none"
      />
    </div>
  );
}
