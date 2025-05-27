import React, { useState } from "react";
import SignUp from "./Components/SignUp";
import RoutingPages from "./Routing/RoutingPages";
import Navbar from "./Components/Navbar";
import { UserData } from "./ContextAPI/UserData";

export default function App() {

  const [Name,setNameG] = useState("")
  const [Email,setEmailG] = useState("");
  const [Password,setPasswordG] = useState("")
  const [Id,setIdG] = useState("");

  return (
    <>
      <div>
        <UserData.Provider value={{Name,Email,Password,Id,setNameG,setEmailG,setPasswordG,setIdG}}>
          <RoutingPages />
        </UserData.Provider>
      </div>
    </>
  );
}
