import { db, uploadFile } from "../firebase";

const initialCircuit = {
  name: "",
  country: null,
  city: "",
};

const addCircuit = (circuit, pdfFile, imageFile) => {
  var promise = new Promise((resolve, reject) => {
    uploadFile("offertes", circuit.name + "_Offerte", pdfFile[0]).then((url) => {
      uploadFile("vectors", circuit.name + "_Vector", imageFile[0]).then((vectorURL) => {
        db.collection("circuits").add({
          ...circuit,
          offerte: url,
          vector: vectorURL,
        });
        resolve({
          ...circuit,
          offerte: url,
          vector: vectorURL,
        });
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
