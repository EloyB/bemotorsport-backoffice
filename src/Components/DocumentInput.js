import React, { useState } from "react";
import { ReactComponent as DropIcon } from "../Assets/filedrop.svg";
import { ReactComponent as CheckIcon } from "../Assets/check.svg";

export default function DocumentInput({ title, onFileChange, accept, hasFile }) {
  const handleOnChange = (e) => {
    onFileChange(e.target.files);
  };

  return (
    <div className="w-1/2 bg-gray-100 rounded relative py-8">
      <input
        type="file"
        className="w-full h-full absolute bottom-0 opacity-0 cursor-pointer"
        onChange={handleOnChange}
        accept={accept}
      />
      <div className="w-full text-center">
        {hasFile ? <CheckIcon className="m-auto" /> : <DropIcon className="m-auto" />}
        <p className="text-gray-400">{hasFile ? "File Accepted!" : title}</p>
      </div>
    </div>
  );
}
