import { db } from "../firebase";

const initialTrackday = {
  circuit: null,
  date: null,
  cars: { porsche: false, peugeot: false },
  plans: { renting: false, share: false, vip: false, business: false },
  requirements: { raceLicense: false, experience: false },
  available: true,
  opmerking: "",
};

const addTrackday = (trackday) => {
  const promise = new Promise((resolve, reject) => {
    db.collection("trackdays")
      .add({ ...trackday })
      .then(() => resolve(trackday));
  });

  return promise;
};

const getTrackdays = () => {
  const promise = new Promise((resolve, reject) => {
    db.collection("trackdays")
      .get()
      .then((snapshot) => {
        let trackdaysList = [];
        snapshot.forEach((doc) => {
          trackdaysList.push({ id: doc.id, ...doc.data() });
        });
        resolve(trackdaysList);
      });
  });
  return promise;
};

const removeTrackday = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.collection("trackdays")
      .doc(id)
      .delete()
      .then(() => resolve());
  });

  return promise;
};

export { initialTrackday, addTrackday, getTrackdays, removeTrackday };
