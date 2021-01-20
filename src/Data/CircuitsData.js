import { db, uploadFileList } from "../firebase";

const initialCircuit = {
  name: "",
  country: null,
  city: "",
};

const addCircuit = (circuit, files) => {
  var promise = new Promise((resolve, reject) => {
    uploadFileList(circuit.name, files).then((res) => {
      db.collection("circuits").add({
        ...circuit,
        files: res,
      });
      resolve({
        ...circuit,
        files: res,
      });
    });
  });

  return promise;
};

const removeCircuit = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.collection("circuits").doc(id).delete();
    resolve();
  });
  return promise;
};

export { initialCircuit, addCircuit, removeCircuit };
