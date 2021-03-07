import { db, uploadFileList } from "../firebase";

const initialCircuit = {
  name: "",
  country: "",
  city: "",
  address: "",
};

const addCircuit = (circuit, coordinates, files) => {
  var promise = new Promise((resolve, reject) => {
    uploadFileList(circuit.name, files).then((res) => {
      db.collection("circuits")
        .add({
          ...circuit,
          coordinates,
          files: res,
        })
        .then((res) => {
          resolve({
            ...circuit,
            id: res.id,
            coordinates,
            files: res,
          });
        });
    });
  });

  return promise;
};

const updateCircuit = (circuit, files) => {
  var promise = new Promise((resolve, reject) => {
    uploadFileList(circuit.name, files).then((res) => {
      if (circuit.files.length > 0) {
        for (let i = 0; i < res.length; i++) {
          const index = circuit.files.findIndex(
            (x) => x.car === res[i].car && x.plan === res[i].plan && x.language === res[i].language
          );

          if (index > -1) {
            circuit.files[index] = { ...res[i] };
          } else {
            circuit.files.push(res[i]);
          }
        }
      } else {
        circuit.files = res;
      }

      db.collection("circuits")
        .doc(circuit.id)
        .update({
          ...circuit,
        })
        .then(() => {
          resolve({ ...circuit });
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

export { initialCircuit, addCircuit, removeCircuit, updateCircuit };
