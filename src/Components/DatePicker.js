import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

export default function DatePicker({ onChange }) {
  const [isDate, setIsDate] = useState(true);

  useEffect(() => {
    const input = document.getElementById("input");
    setIsDate(input.type === "date" ? true : false);
  }, []);

  return (
    <div className="">
      {isDate ? (
        <input
          id="input"
          type="date"
          className="p-2 bg-gray-50 w-full rounded pl-4 outline-none"
          onChange={(e) => onChange(e.target.value)}
          placeholder="Date (dd-mm-yyyy)"
        />
      ) : (
        <NumberFormat
          format="####-##-##"
          placeholder="yyyy-mm-dd"
          mask={["y", "y", "y", "y", "m", "m", "d", "d"]}
          className="p-2 bg-gray-50 w-full rounded pl-4 outline-none"
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
