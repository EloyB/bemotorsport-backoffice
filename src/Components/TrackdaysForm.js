import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
import { initialTrackday, addTrackday } from "../Data/TrackdaysData";
import DropdownField from "./DropdownField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import BlueButton from "./BlueButton";
import Message from "./Message";
import TextArea from "./TextArea";
import InputField from "./InputField";

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
      <div className="my-3 space-y-6">
        <DropdownField
          selectOptions={circuits}
          setSelectedOption={(item) => setTrackday({ ...trackday, circuit: item })}
          placeholder="Choose a circuit"
          targetField="name"
        />
        <DatePicker onChange={(value) => setTrackday({ ...trackday, date: value })} />
        <div>
          <TextArea
            placeholder="Opmerking"
            onChange={(value) => setTrackday({ ...trackday, opmerking: value })}
            value={trackday.opmerking}
          />
        </div>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0 mb-5">
          <div>
            <h1 className="font-semibold text-gray-400 text-base mb-3">General</h1>
            <div className="px-2 space-y-3 sm:flex sm:flex-col">
              <Checkbox
                label="Available"
                value={trackday.available}
                onChange={() => setTrackday({ ...trackday, available: !trackday.available })}
              />
              <Checkbox
                label="Racelicentie vereist"
                value={trackday.requirements.raceLicense}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    requirements: {
                      ...trackday.requirements,
                      raceLicense: !trackday.requirements.raceLicense,
                    },
                  })
                }
              />
              <Checkbox
                label="Ervaring vereist"
                value={trackday.requirements.experience}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    requirements: {
                      ...trackday.requirements,
                      experience: !trackday.requirements.experience,
                    },
                  })
                }
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-gray-400 text-base mb-3">Cars</h1>
            <div className="px-2 space-y-3 sm:flex sm:flex-col">
              <Checkbox
                label="Porsche"
                value={trackday.cars.porsche}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    cars: { ...trackday.cars, porsche: !trackday.cars.porsche },
                  })
                }
              />
              <Checkbox
                label="Peugeot"
                value={trackday.cars.peugeot}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    cars: { ...trackday.cars, peugeot: !trackday.cars.peugeot },
                  })
                }
              />
            </div>
          </div>
          <div>
            <h1 className="font-semibold text-gray-400 text-base mb-3">Plans</h1>
            <div className="px-2 space-y-3 sm:flex sm:flex-col">
              <Checkbox
                label="Renting"
                value={trackday.plans.renting}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    plans: { ...trackday.plans, renting: !trackday.plans.renting },
                  })
                }
              />
              <Checkbox
                label="Share a ride"
                value={trackday.plans.share}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    plans: { ...trackday.plans, share: !trackday.plans.share },
                  })
                }
              />
              <Checkbox
                label="VIP"
                value={trackday.plans.vip}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    plans: { ...trackday.plans, vip: !trackday.plans.vip },
                  })
                }
              />
              <Checkbox
                label="Business"
                value={trackday.plans.business}
                onChange={() =>
                  setTrackday({
                    ...trackday,
                    plans: { ...trackday.plans, business: !trackday.plans.business },
                  })
                }
              />
            </div>
          </div>
        </div>
        <BlueButton text={loading ? "Loading..." : "Add Trackday"} onClick={handleAddTrackday} />
        {hasErrors && <Message onClose={() => setHasErrors(false)} />}
      </div>
    </div>
  );
}
