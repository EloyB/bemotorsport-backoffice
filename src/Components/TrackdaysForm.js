import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import { db } from "../firebase";

export default function TrackdaysForm() {
  const [{ circuits }, dispatch] = useStateValue();
  const [circuit, setCircuit] = useState();
  const [date, setDate] = useState();
  const [porsche, setPorsche] = useState();
  const [peugot, setPeugot] = useState();
  const [available, setAvailable] = useState(true);
  useEffect(() => {
    console.log(circuits);
  }, []);

  return (
    <div className="bg-white rounded shadow-md p-4 md:w-1/2 md:my-4">
      <h1 className="font-semibold text-lg">Trackday aanmaken</h1>
      <div className="my-3 space-y-3">
        <DropdownField
          selectOptions={circuits}
          setSelectedOption={(item) => setCircuit({ ...circuit })}
          placeholder="Choose a circuit"
        />
        <div className="w-full flex space-x-4">
          <div className="radio">
            <label>
              <input type="checkbox" value="porsche" />
              Porsche
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="checkbox" value="peugot" />
              Peugot
            </label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                value="available"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              Available
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input type="date" id="date" name="date" />
        </div>
      </div>
    </div>
  );
}
