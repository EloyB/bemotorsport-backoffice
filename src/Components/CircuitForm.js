import React, { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import BlueButton from "./BlueButton";
import DocumentInput from "./DocumentInput";
import { useStateValue } from "../StateProvider";
import { initialCircuit, addCircuit } from "../Data/CircuitsData";
import Message from "./Message";

const countries = ["Belgium", "Germany", "France", "Netherlands", "Spain", "Portugal"];

export default function CircuitForm() {
  const [{ circuits }, dispatch] = useStateValue();
  const [circuit, setCircuit] = useState({ ...initialCircuit });
  const [pdfFile, setPdfFile] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [hasErrors, setHasErrors] = useState(false);
  const [loading, setLoading] = useState();
  const [fileList, setFileList] = useState([]);

  const handleAddCircuit = () => {
    if (circuit.name !== "" && circuit.country !== null && circuit.city !== "") {
      setLoading(true);
      setFileList([]);
      addCircuit(circuit, fileList).then((res) => {
        dispatch({ type: "ADD_CIRCUIT", item: res });
        setCircuit({ ...initialCircuit });
        setLoading(false);
      });
    } else {
      setHasErrors(true);
    }
  };

  const handleFileSelect = (file) => {
    const itemIndex = fileList.findIndex((x) => x.name === file.name);
    if (itemIndex > -1) {
      console.log("file already exists");
      return;
    }
    setFileList([...fileList, file]);
  };

  const checkHasFile = (name) => {
    return fileList.findIndex((x) => x.name === name) > -1;
  };

  return (
    <div className="bg-white rounded shadow-md flex flex-col p-4 md:w-1/2 md:self-start md:my-4">
      <h1 className="font-semibold text-lg">Circuit aanmaken</h1>
      <div className="my-2 space-y-3">
        <InputField
          placeholder="Circuit name"
          onChange={(value) => setCircuit({ ...circuit, name: value })}
          value={circuit.name}
        />
        <DropdownField
          selectOptions={countries}
          setSelectedOption={(item) => setCircuit({ ...circuit, country: item })}
          placeholder="Choose a country"
        />
        <InputField
          placeholder="City name"
          onChange={(value) => setCircuit({ ...circuit, city: value })}
          value={circuit.city}
        />
        <h1 className="font-semibold text-gray-400 text-base mb-3">Porsche</h1>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({ val, name: "Porsche Renting", path: "offertes" })
            }
            hasFile={checkHasFile("Porsche Renting")}
          />
          <DocumentInput
            title="Share a ride PDF"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({ val, name: "Porsche Share a ride", path: "offertes" })
            }
            hasFile={checkHasFile("Porsche Share a ride")}
          />
        </div>
        <h1 className="font-semibold text-gray-400 text-base mb-3">Peugeot</h1>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Renting PDF"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({ val, name: "Peugeot Renting", path: "offertes" })
            }
            hasFile={checkHasFile("Peugeot Renting")}
          />
          <DocumentInput
            title="Share a ride PDF"
            accept=".pdf"
            onFileChange={(val) =>
              handleFileSelect({ val, name: "Peugeot Share a ride", path: "offertes" })
            }
            hasFile={checkHasFile("Peugeot Share a ride")}
          />
        </div>
        <h1 className="font-semibold text-gray-400 text-base mb-3">Others</h1>
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Beginner PDF"
            accept=".pdf"
            onFileChange={(val) => handleFileSelect({ val, name: "Beginner", path: "offertes" })}
            hasFile={checkHasFile("Beginner")}
          />
          <DocumentInput
            title="Circuit Image"
            accept="image/*"
            onFileChange={(val) =>
              handleFileSelect({ val, name: "Circuit Vector", path: "vectors" })
            }
            hasFile={checkHasFile("Circuit Vector")}
          />
        </div>
        <BlueButton text={loading ? "Loading..." : "Add Circuit"} onClick={handleAddCircuit} />
        {hasErrors && <Message onClose={() => setHasErrors(false)} />}
      </div>
    </div>
  );
}
