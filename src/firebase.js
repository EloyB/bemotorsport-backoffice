import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAcs3M7FKlfUHyQuRXCnp_HMJtCEVfvEbY",
  authDomain: "bemotorsport-9b713.firebaseapp.com",
  projectId: "bemotorsport-9b713",
  storageBucket: "bemotorsport-9b713.appspot.com",
  messagingSenderId: "632540508158",
  appId: "1:632540508158:web:2fe58b6f800df603bd1aaf",
  measurementId: "G-3NTC5PVQFP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

const uploadFile = async (path, name, file) => {
  const fileRef = storage.ref(`/${path}/${name}`);

  const uploadTaskSnapshot = await fileRef.put(file);

  const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

  return { name, downloadURL };
};

const uploadFileList = async (circuitName, files) => {
  const promises = [];

  files.map((file) => {
    promises.push(uploadFile(file.path, `${circuitName + "_" + file.name}`, file.val[0]));
  });

  return Promise.all(promises);
};

export { db, auth, uploadFile, uploadFileList };
