import React, { useState } from "react";
import DropdownField from "./DropdownField";
import InputField from "./InputField";
import BlueButton from "./BlueButton";
import DocumentInput from "./DocumentInput";
import { db, uploadFile } from "../firebase";
import { useStateValue } from "../StateProvider";
import { initialCircuit, addCircuit } from "../Data/CircuitsData";

const countries = ["Belgium", "Germany", "France", "Netherlands", "Spain", "Portugal"];

export default function CircuitForm() {
  const [{ circuits }, dispatch] = useStateValue();
  const [circuit, setCircuit] = useState({ ...initialCircuit });
  const [pdfFile, setPdfFile] = useState();
  const [imageFile, setImageFile] = useState();

  const handleAddCircuit = () => {
    addCircuit(circuit, pdfFile, imageFile).then((res) =>
      dispatch({ type: "ADD_CIRCUIT", item: res })
    );
    setCircuit({ ...initialCircuit });
  };

  return (
    <div className="bg-white rounded shadow-md p-4 md:w-1/2 md:self-start md:my-4">
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
        />
        <InputField
          placeholder="City name"
          onChange={(value) => setCircuit({ ...circuit, city: value })}
          value={circuit.city}
        />
        <div className="w-full flex space-x-4 rounded">
          <DocumentInput
            title="Choose PDF"
            accept=".pdf"
            onFileChange={(val) => setPdfFile(val)}
            hasFile={pdfFile ? true : false}
          />
          <DocumentInput
            title="Choose Image"
            accept="image/*"
            onFileChange={(val) => setImageFile(val)}
          />
        </div>
        <BlueButton text="Add Circuit" onClick={handleAddCircuit} />
      </div>
    </div>
  );
}
