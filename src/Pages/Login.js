import React, { useState } from "react";
import BlueButton from "../Components/BlueButton";
import InputField from "../Components/InputField";
import { ReactComponent as Logo } from "../Assets/logo.svg";
import { auth } from "../firebase";
import Message from "../Components/Message";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const loginUser = () => {
    if (email !== undefined && password !== undefined) {
      auth.signInWithEmailAndPassword(email, password).catch((err) => setErrorMessage(err.message));
    } else {
      setErrorMessage("Please fill in all fields.");
    }
  };

  return (
    <div className="h-screen w-full px-4 bg-motorblue flex items-center justify-center">
      <div className="w-full bg-white sm:w-2/3 px-10 pb-10 rounded shadow-md space-y-4 flex flex-col items-center max-w-screen-sm m-auto">
        <Logo className=" w-3/4 pt-4 sm:w-1/2 h-auto" />
        <div className="space-y-2 w-full">
          <InputField placeholder="Email" onChange={(val) => setEmail(val)} />
          <InputField placeholder="Password" password onChange={(val) => setPassword(val)} />
        </div>
        <BlueButton text="Login" onClick={loginUser} />
        {errorMessage && <Message message={errorMessage} onClose={() => setErrorMessage()} />}
      </div>
    </div>
  );
}
