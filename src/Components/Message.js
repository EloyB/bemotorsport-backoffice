import React from "react";
import { ReactComponent as CloseIcon } from "../Assets/close.svg";

export default function Message({ onClose, message }) {
  return (
    <div className="w-full rounded-lg bg-red-100 py-3 px-6 border-2 border-red-500 flex items-center">
      <p className=" text-red-500 font-semibold text-sm sm:text-lg text-center flex-1">{message}</p>
      <div onClick={onClose} className="cursor-pointer">
        <CloseIcon />
      </div>
    </div>
  );
}
