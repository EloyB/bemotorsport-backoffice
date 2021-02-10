import React, { useState } from "react";
import { ReactComponent as Caret } from "../Assets/caret.svg";

export default function DropdownField({
  selectOptions,
  setSelectedOption,
  targetField,
  placeholder,
  value,
}) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative h-auto">
      <div
        className="p-2 bg-gray-50 w-full rounded px-4 flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        {value !== "" ? (
          <p className="text-gray-800">{value}</p>
        ) : selected === null ? (
          <p className="text-gray-400">{placeholder}</p>
        ) : (
          <p className="text-gray-800">{selected}</p>
        )}
        <button className="cursor-pointer focus:outline-none" onClick={() => setOpen(!open)}>
          <Caret />
        </button>
      </div>
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute bg-white py-4 px-2 space-y-2 w-full shadow-sm rounded z-50`}
      >
        {selectOptions.length > 0 ? (
          selectOptions.map((item, index) => (
            <p
              key={index}
              className="hover:bg-gray-100 cursor-pointer px-2 rounded py-1"
              onClick={() => {
                setSelectedOption(item);
                setSelected(targetField ? item[targetField] : item);
                setOpen(false);
              }}
            >
              {targetField ? item[targetField] : item}
            </p>
          ))
        ) : (
          <p
            className="px-2 rounded py-1 text-gray-300"
            onClick={() => {
              setOpen(false);
            }}
          >
            No data found
          </p>
        )}
      </div>
    </div>
  );
}
