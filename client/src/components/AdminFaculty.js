import FacultyStrip from "./FacultyStrip";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";

function AdminFaculty() {

  

  return (
    <>
      <SideBar />
      <div className=" ml-56 px-5 ">
        <Outlet/>
      </div>
    </>
  );
}

export default AdminFaculty;
