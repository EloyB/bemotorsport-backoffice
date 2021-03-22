import { db } from "../firebase";

const getRequests = () => {
  const promise = new Promise((resolve, reject) => {
    db.collection("bookings")
      .get()
      .then((snapshot) => {
        let requestsList = [];
        snapshot.forEach((doc) => {
          requestsList.push({ id: doc.id, ...doc.data() });
        });
        resolve(requestsList);
      });
  });
  return promise;
};

export { getRequests };
