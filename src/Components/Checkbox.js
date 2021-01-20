import React from "react";

export default function Checkbox({ label, onChange, value }) {
  return (
    <div className="flex space-x-2 items-center">
      <input
        type="checkbox"
        className="h-5 w-5 cursor-pointer"
        onChange={onChange}
        checked={value}
      />
      <p>{label}</p>
    </div>
  );
}
