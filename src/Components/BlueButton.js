import React from "react";

export default function BlueButton({ text, onClick }) {
  return (
    <div>
      <button className="w-full bg-motorblue p-2 text-white font-medium rounded outline-none focus:outline-none" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}
