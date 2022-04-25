import React, { useRef, useState } from "react";
import { useStateValue } from "../StateProvider";
import { initialTrackday, addTrackday, updateTrackday } from "../Data/TrackdaysData";
import DropdownField from "./DropdownField";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import BlueButton from "./BlueButton";
import Message from "./Message";
import TextArea from "./TextArea";
import InputField from "./InputField";

export default function TrackdaysForm() {
  const [{ circuits, trackday }, dispatch] = useStateValue();
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddTrackday = () => {
    if (trackday.circuit !== null && trackday.date !== null) {
      setLoading(true);
      if (trackday.id === undefined || trackday.id === null) {
        addTrackday(trackday).then((res) => {
          dispatch({ type: "ADD_TRACKDAY", item: res });
        });
      } else {
        updateTrackday(trackday).then((res) => {
          dispatch({ type: "UPDATE_TRACKDAYS", trackday: res });
        });
      }
      dispatch({ type: "RESET_TRACKDAY" });
      setLoading(false);
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
          setSelectedOption={(item) =>
            dispatch({ type: "UPDATE_TRACKDAY", prop: "circuit", value: item })
          }
          placeholder="Choose a circuit"
          targetField="name"
          value={trackday.circuit.name}
        />
        <DatePicker
          onChange={(value) => dispatch({ type: "UPDATE_TRACKDAY", prop: "date", value })}
          value={trackday.date}
        />
        <div>
          <TextArea
            placeholder="Opmerking"
            onChange={(value) => dispatch({ type: "UPDATE_TRACKDAY", prop: "opmerking", value })}
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
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "available",
                    value: !trackday.available,
                  })
                }
              />
              <Checkbox
                label="Racelicentie vereist"
                value={trackday.requirements.raceLicense}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "requirements",
                    value: {
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
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "requirements",
                    value: {
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
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "cars",
                    value: {
                      ...trackday.cars,
                      porsche: !trackday.cars.porsche,
                    },
                  })
                }
              />
              <Checkbox
                label="Peugeot"
                value={trackday.cars.peugeot}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "cars",
                    value: {
                      ...trackday.cars,
                      peugeot: !trackday.cars.peugeot,
                    },
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
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "plans",
                    value: {
                      ...trackday.plans,
                      renting: !trackday.plans.renting,
                    },
                  })
                }
              />
              <Checkbox
                label="Share a ride"
                value={trackday.plans.share}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "plans",
                    value: {
                      ...trackday.plans,
                      share: !trackday.plans.share,
                    },
                  })
                }
              />
              <Checkbox
                label="VIP"
                value={trackday.plans.vip}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "plans",
                    value: {
                      ...trackday.plans,
                      vip: !trackday.plans.vip,
                    },
                  })
                }
              />
              <Checkbox
                label="Business"
                value={trackday.plans.business}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "plans",
                    value: {
                      ...trackday.plans,
                      business: !trackday.plans.business,
                    },
                  })
                }
              />
              <Checkbox
                label="Training"
                value={trackday.plans.training}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TRACKDAY",
                    prop: "plans",
                    value: {
                      ...trackday.plans,
                      training: !trackday.plans.training,
                    },
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
