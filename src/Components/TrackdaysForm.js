import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { initialTrackday, addTrackday } from "../Data/TrackdaysData";
import DropdownField from "./DropdownField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import BlueButton from "./BlueButton";

export default function TrackdaysForm() {
  const [{ circuits }, dispatch] = useStateValue();
  const [trackday, setTrackday] = useState({ ...initialTrackday });
  const [hasErrors, setHasErrors] = useState();

  const handleAddTrackday = () => {
    if (trackday.circuit !== null && trackday.date !== null) {
      addTrackday(trackday).then((res) =>
        dispatch({ type: "ADD_TRACKDAY", item: res })
      );
      setTrackday({ ...initialTrackday });
      setHasErrors(false);
    } else {
      setHasErrors(true);
    }
  };

  return (
    <div className="bg-white rounded shadow-md p-4 md:w-1/2 md:my-4">
      <h1 className="font-semibold text-lg">Trackday aanmaken</h1>
      <div className="my-3 space-y-3">
        <DropdownField
          selectOptions={circuits}
          setSelectedOption={(item) =>
            setTrackday({ ...trackday, circuit: item })
          }
          placeholder="Choose a circuit"
          targetField="name"
        />
        <DatePicker
          onChange={(value) => setTrackday({ ...trackday, date: value })}
        />
        <div className="px-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <Checkbox
            label="Available"
            value={trackday.available}
            onChange={() =>
              setTrackday({ ...trackday, available: !trackday.available })
            }
          />
          <Checkbox
            label="Porsche"
            value={trackday.porsche}
            onChange={() =>
              setTrackday({ ...trackday, porsche: !trackday.porsche })
            }
          />
          <Checkbox
            label="Peugeot"
            value={trackday.peugeot}
            onChange={() =>
              setTrackday({ ...trackday, peugeot: !trackday.peugeot })
            }
          />
        </div>
        <BlueButton text="Add Trackday" onClick={handleAddTrackday} />
        {hasErrors ? (
          <div className="rounded">
            <p className="rounded-full py-3 px-6 text-red-500 font-semibold text-lg text-center border-2 rounded">
              Make sure that all fields are filled in!
            </p>
          </div>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}
