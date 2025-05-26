import { Routes, Route, Outlet } from "react-router";
import SignUp from "../Components/SignUp";
import Login from "../Components/Login";
import HomePage from "../Components/HomePage";
import Feedback from "../Components/Feedback";
import UploadMaterial from "../Components/UploadMaterial";
import Navbar from "../Components/Navbar";

export default function RoutingPages() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/" element={<Login />} />
          <Route element={<Navbar />}>
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/Feedback" element={<Feedback />} />
            <Route path="/UploadMaterial" element={<UploadMaterial />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}
