import React, { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import BlueButton from "./BlueButton";
import DocumentInput from "./DocumentInput";
import { useStateValue } from "../StateProvider";
import { addCircuit, updateCircuit } from "../Data/CircuitsData";
import Message from "./Message";
import Geocode from "react-geocode";

const countries = ["Belgium", "Germany", "France", "Netherlands", "Spain", "Portugal"];

export default function CircuitForm() {
  const [{ circuit }, dispatch] = useStateValue();
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState();
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState("");

  Geocode.setApiKey("AIzaSyC4PK60hWqmr0dAxoqvmdLlsAdqRXyfzlo");

  const handleAddCircuit = () => {
    if (circuit.name !== "" && circuit.country !== null && circuit.city !== "") {
      setLoading(true);
      setFileList([]);
      Geocode.fromAddress(circuit.address)
        .then((response) => {
          console.log(response);
          const { lat, lng } = response.results[0].geometry.location;
          return { lat, lng };
        })
        .then((res) => {
          if (circuit.id === undefined || circuit.id === null) {
            addCircuit(circuit, res, fileList).then((res) => {
              dispatch({ type: "ADD_CIRCUIT", item: res });
            });
          } else {
            updateCircuit(circuit, fileList).then((res) => {
              dispatch({
                type: "UPDATE_CIRCUITS",
                circuit: res,
              });
            });
          }
          dispatch({ type: "RESET_CIRCUIT" });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setHasErrors(true);
          setMessage("Address does not exist.");
        });
    } else {
      setHasErrors(true);
      setMessage("Fill in all fields");
    }
  };

  const handleFileSelect = (fileInfo) => {
    const itemIndex = fileList.findIndex(
      (x) => x.car === fileInfo.car && x.plan === fileInfo.plan && x.language === fileInfo.language
    );
    if (itemIndex > -1) {
      fileList[itemIndex] = fileInfo;
      return;
    }
    setFileList([...fileList, fileInfo]);
  };

  const checkHasFile = ({ car, plan, language }) => {
    return (
      fileList.findIndex((x) => x.car === car && x.plan === plan && x.language === language) > -1
    );
  };

  return (
    <div className="bg-white rounded shadow-md flex flex-col p-4 md:w-1/2 md:self-start md:my-4">
      <h1 className="font-semibold text-lg">Circuit aanmaken</h1>
      <div className="my-2 space-y-3">
        <InputField
          placeholder="Circuit name"
          onChange={(value) => dispatch({ type: "UPDATE_CIRCUIT", prop: "name", value })}
          value={circuit.name}
        />
        <DropdownField
          selectOptions={countries}
          setSelectedOption={(item) =>
            dispatch({ type: "UPDATE_CIRCUIT", prop: "country", value: item })
          }
          placeholder="Choose a country"
          value={circuit.country}
        />
        <InputField
          placeholder="City name"
          onChange={(value) => dispatch({ type: "UPDATE_CIRCUIT", prop: "city", value })}
          value={circuit.city}
        />
        <h1 className="font-semibold text-gray-400 text-base mb-3">Address</h1>
        <InputField
          placeholder="Address"
          onChange={(value) => dispatch({ type: "UPDATE_CIRCUIT", prop: "address", value })}
          value={circuit.address}
        />
        <h1 className="font-semibold text-gray-400 text-base mb-3">Porsche</h1>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF (NL)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Porsche",
                language: "nl",
                plan: "Renting",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Porsche", plan: "Renting", language: "nl" })}
          />
          <DocumentInput
            title="Share a ride PDF (NL)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Porsche",
                language: "nl",
                plan: "Share",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Porsche", plan: "Share", language: "nl" })}
          />
        </div>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF (ENG)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Porsche",
                language: "en-US",
                plan: "Renting",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Porsche", plan: "Renting", language: "en-US" })}
          />
          <DocumentInput
            title="Share a ride PDF (ENG)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Porsche",
                language: "en-US",
                plan: "Share",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Porsche", plan: "Share", language: "en-US" })}
          />
        </div>
        <h1 className="font-semibold text-gray-400 text-base mb-3">Peugeot</h1>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF (NL)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "nl",
                plan: "Renting",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Renting", language: "nl" })}
          />
          <DocumentInput
            title="Share a ride PDF (NL)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "nl",
                plan: "Share",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Share", language: "nl" })}
          />
        </div>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF (ENG)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "en-US",
                plan: "Renting",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Renting", language: "en-US" })}
          />
          <DocumentInput
            title="Share a ride PDF (ENG)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "en-US",
                plan: "Share",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Share", language: "en-US" })}
          />
        </div>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Training PDF (NL)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "nl",
                plan: "Training",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Training", language: "nl" })}
          />
          <DocumentInput
            title="Training PDF (ENG)"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({
                val,
                car: "Peugeot",
                language: "en-US",
                plan: "Training",
                path: "offertes",
              })
            }
            hasFile={checkHasFile({ car: "Peugeot", plan: "Training", language: "en-US" })}
          />
        </div>
        <BlueButton text={loading ? "Loading..." : "Add Circuit"} onClick={handleAddCircuit} />
        {hasErrors && <Message onClose={() => setHasErrors(false)} message={message} />}
      </div>
    </div>
  );
}
