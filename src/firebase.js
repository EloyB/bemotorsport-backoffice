import firebase from "firebase";

// var firebaseConfig = {
//   apiKey: "AIzaSyAQa46l-hQd3jtHgI3QhYjNvNgoQX7JSMQ",
//   authDomain: "bemotorsport-test.firebaseapp.com",
//   projectId: "bemotorsport-test",
//   storageBucket: "bemotorsport-test.appspot.com",
//   messagingSenderId: "559580747783",
//   appId: "1:559580747783:web:1be3a9a7a5af44ad57f2a2",
// };

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

const uploadFile = async (file, circuitName) => {
  const fileRef = storage.ref(
    `/${file.path}/${file.car + file.plan + file.language + "_" + circuitName}`
  );

  const uploadTaskSnapshot = await fileRef.put(file.val[0]);

  const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();

  return { downloadURL, language: file.language, car: file.car, plan: file.plan };
};

const uploadFileList = async (circuitName, files) => {
  const promises = [];

  files.map((file) => {
    promises.push(uploadFile(file, circuitName));
  });

  return Promise.all(promises);
};

export { db, auth, uploadFile, uploadFileList };
