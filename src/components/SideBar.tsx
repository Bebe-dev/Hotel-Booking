import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlineChair } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {

  const [active, setActive] = useState("dashboard")
  return (
    <div className="hidden p-6 bg-[#FAFAFA] w-1/5 h-min-screen text-[#475467] md:flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <Link to="/landlords/dashboard" onClick={()=> setActive("dashboard")} className={`${active === "dashboard" ? "bg-[#25409C] text-white p-2" : ""} rounded-lg flex gap-2 items-center `}>
          <HiOutlineHome />
          Dashboard
        </Link>
        <Link to="/landlords/management" onClick={()=> setActive("management")} className={`${active === "management" ? "bg-[#25409C] text-white p-1 py-2" : ""} rounded-lg flex gap-2 items-center `}>
          <MdOutlineChair />
          Property Management
        </Link>
        <Link to="/landlords/availability" onClick={()=> setActive("availability")} className={`${active === "availability" ? "bg-[#25409C] text-white p-2" : ""} rounded-lg flex gap-2 items-center `}>
          <GoBell />
          Room Availabilty
        </Link>
        <Link to="/landlords/request" onClick={()=> setActive("request")} className={`${active === "request" ? "bg-[#25409C] text-white p-2" : ""} rounded-lg flex gap-2 items-center `}>
          <HiOutlineInboxStack />
          Booking Requests
        </Link>
      </div>

      {/* LOWER */}
      <div className="flex flex-col gap-3">
        <Link to="/landlords/settings" className="flex gap-2 items-center">
          <IoSettingsOutline />
          Settings
        </Link>
        <Link to="/landlords/login" className="flex gap-2 items-center">
          <SlLogout />
          Logout
        </Link>
      </div>
    </div>
  );
}
