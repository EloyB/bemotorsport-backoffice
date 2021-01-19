import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { initialTrackday, addTrackday } from "../Data/TrackdaysData";
import DropdownField from "./DropdownField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import BlueButton from "./BlueButton";
import Message from "./Message";

export default function TrackdaysForm() {
  const [{ circuits }, dispatch] = useStateValue();
  const [trackday, setTrackday] = useState({ ...initialTrackday });
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTrackday = () => {
    if (trackday.circuit !== null && trackday.date !== null) {
      setLoading(true);
      addTrackday(trackday).then((res) => {
        dispatch({ type: "ADD_TRACKDAY", item: res });
        setTrackday({ ...initialTrackday });
        setLoading(false);
      });
    } else {
      setHasErrors(true);
    }
  };

  return (
    <div className="bg-white rounded shadow-md p-4 md:w-1/2 self-start md:my-4">
      <h1 className="font-semibold text-lg">Trackday aanmaken</h1>
      <div className="my-3 space-y-3">
        <DropdownField
          selectOptions={circuits}
          setSelectedOption={(item) => setTrackday({ ...trackday, circuit: item })}
          placeholder="Choose a circuit"
          targetField="name"
        />
        <DatePicker onChange={(value) => setTrackday({ ...trackday, date: value })} />
        <div className="px-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <Checkbox
            label="Available"
            value={trackday.available}
            onChange={() => setTrackday({ ...trackday, available: !trackday.available })}
          />
          <Checkbox
            label="Porsche"
            value={trackday.porsche}
            onChange={() => setTrackday({ ...trackday, porsche: !trackday.porsche })}
          />
          <Checkbox
            label="Peugeot"
            value={trackday.peugeot}
            onChange={() => setTrackday({ ...trackday, peugeot: !trackday.peugeot })}
          />
        </div>
        <hr/>
        <div className="px-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <Checkbox
            label="Racelicentie vereist"
            value={trackday.raceLicention}
            onChange={() =>
              setTrackday({
                ...trackday,
                raceLicention: !trackday.raceLicention,
              })
            }
          />
          <Checkbox
            label="Ervaring vereist"
            value={trackday.experienceRequired}
            onChange={() =>
              setTrackday({
                ...trackday,
                experienceRequired: !trackday.experienceRequired,
              })
            }
          />
        </div>
        <hr/>
        <div className="px-2 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
          <Checkbox
            label="Renting"
            value={trackday.renting}
            onChange={() =>
              setTrackday({ ...trackday, renting: !trackday.renting })
            }
          />
          <Checkbox
            label="VIP"
            value={trackday.VIP}
            onChange={() => setTrackday({ ...trackday, VIP: !trackday.VIP })}
          />
          <Checkbox
            label="Share a ride"
            value={trackday.shareARide}
            onChange={() => setTrackday({ ...trackday, shareARide: !trackday.shareARide })}
          />
                    <Checkbox
            label="Business Experience"
            value={trackday.businessExprecience}
            onChange={() => setTrackday({ ...trackday, businessExprecience: !trackday.businessExprecience })}
          />
        </div>
        <BlueButton text={loading ? "Loading..." : "Add Trackday"} onClick={handleAddTrackday} />
        {hasErrors && <Message onClose={() => setHasErrors(false)} />}

      </div>
    </div>
  );
}
