import React from "react";

export default function TextArea({ onChange, placeholder, value }) {
  return (
    <div>
      <textarea
        placeholder={placeholder}
        cols="30"
        rows="5"
        className="p-2 bg-gray-50 w-full rounded pl-4 outline-none resize-none"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      ></textarea>
    </div>
  );
}
