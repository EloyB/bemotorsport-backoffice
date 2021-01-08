import React from "react";

export default function DatePicker({ onChange }) {
  return (
    <div className="">
      <input
        type="date"
        className="p-2 bg-gray-50 w-full rounded pl-4 outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
