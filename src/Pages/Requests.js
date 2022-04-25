import { ListItemSecondaryAction } from "@material-ui/core";
import moment from "moment";
import React, { useEffect } from "react";
import { getRequests } from "../Data/RequestsData";
import { useStateValue } from "../StateProvider";

export default function Requests() {
  const [{ requests, selectedRequest }, dispatch] = useStateValue();
  useEffect(() => {
    getRequests().then((res) => {
      res.sort((a, b) => b.creationDate.toDate() - a.creationDate.toDate());
      dispatch({ type: "SET_REQUESTS", list: res });
    });
  }, []);

  return (
    <div className="m-4 space-y-7 divide-y-2 md:flex md:w-full md:divide-y-0 md:divide-x-2 md:space-y-0 md:space-x-4">
      <div className="py-4 md:w-1/2 md:px-4 space-y-4">
        {requests.map((item, index) => (
          <div
            key={index}
            className="shadow-md rounded-md p-4 cursor-pointer flex justify-between items-center"
            onClick={() => {
              dispatch({ type: "SET_SELECTED_REQUEST", request: item });
            }}
          >
            <div>
              <p className="font-semibold text-xl">
                {item.firstName} {item.lastName}
              </p>
              <p className="text-sm">Selected Trackdays: {item.selectedTrackdays.length}</p>
              <p className="text-sm">
                Request date:{" "}
                {moment(item.creationDate.toDate().toISOString()).format("DD-MM-YYYY")}
              </p>
            </div>
            <div>
              <svg
                className="w-6 h-6 text-motorblue"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      {selectedRequest !== null ? (
        <div className="py-4 md:w-1/2 md:px-4 space-y-4">
          <div>
            <p className="text-xl font-semibold">Personal Information:</p>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2">
              <p className="py-2">
                <span className="font-medium">First Name: </span>
                {selectedRequest.firstName}
              </p>
              <p className="py-2">
                <span className="font-medium">Last Name: </span>
                {selectedRequest.lastName}
              </p>
              <p className="py-2">
                <span className="font-medium">Email: </span>
                {selectedRequest.email}
              </p>
              <p className="py-2">
                <span className="font-medium">Phone: </span>
                {selectedRequest.phone}
              </p>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">Drivers:</p>
            <div className="mt-2">
              {selectedRequest.drivers.map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded-md p-4 border-l-4 border-motorblue divide-y-2"
                >
                  <div className="pb-2">
                    <p className="text-xl font-semibold">
                      {item.firstName} {item.lastName}
                    </p>
                    <p>{item.age}</p>
                  </div>
                  <div className="pt-2">
                    <p>
                      <span className="font-medium">Has experience: </span>{" "}
                      {item.hasExperience ? "YES" : "NO"}
                    </p>
                    <p>
                      <span className="font-medium">needs instructor: </span>{" "}
                      {item.instuctorNeeded ? "YES" : "NO"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold">Selected Trackdays:</p>
            <div className="mt-2">
              {selectedRequest.selectedTrackdays.map((item, index) => (
                <div
                  key={index}
                  className="shadow-sm rounded-md p-4 border-l-4 border-motorblue divide-y-2"
                >
                  <div className="pb-2 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xl font-semibold">{item.circuit.name}</p>
                      <p>{item.circuit.country}</p>
                    </div>
                    <p>{item.date}</p>
                  </div>
                  <div className="pt-2">
                    <p>
                      <span className="font-medium">Selected car: </span> {item.selectedCar}
                    </p>
                    <p>
                      <span className="font-medium">Selected plan: </span> {item.selectedPlan}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="py-4 md:w-1/2 md:px-4">
          <p className="text-xl font-semibold">Select a request to see the details</p>
        </div>
      )}
    </div>
  );
}
