import { db, uploadFileList } from "../firebase";

const initialCircuit = {
  name: "",
  country: "",
  city: "",
  address: "",
  files: []
};

const addCircuit = (circuit, coordinates, files) => {
  var promise = new Promise((resolve, reject) => {
    uploadFileList(circuit.name, files).then((res) => {
      db.collection("circuits").add({
        ...circuit,
        coordinates,
        files: res,
      });
      resolve({
        ...circuit,
        coordinates,
        files: res,
      });
    });
  });

  return promise;
};

const removeCircuit = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.collection("circuits")
      .doc(id)
      .delete()
      .then(() => {
        resolve();
      });
  });
  return promise;
};

export { initialCircuit, addCircuit, removeCircuit };
