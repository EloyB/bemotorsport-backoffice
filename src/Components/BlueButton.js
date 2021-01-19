import React from "react";

export default function BlueButton({ text, onClick }) {
  return (
    <button
      className="w-full bg-motorblue p-2 text-white font-medium rounded outline-none hover:bg-darkblue-700 focus:outline-none"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
