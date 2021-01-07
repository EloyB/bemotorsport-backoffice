import React, { useState } from "react";
import { ReactComponent as DropIcon } from "../Assets/filedrop.svg";
import { ReactComponent as CheckIcon } from "../Assets/check.svg";

export default function DocumentInput({ title, onFileChange, accept }) {
  const [inputTitle, setInputTitle] = useState(title);
  const [file, setFile] = useState();

  const handleOnChange = (e) => {
    setFile(e.target.files);
    onFileChange(e.target.files);
    setInputTitle("File accepted!");
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
        {file ? <CheckIcon className="m-auto" /> : <DropIcon className="m-auto" />}
        <p className="text-gray-400">{inputTitle}</p>
      </div>
    </div>
  );
}
