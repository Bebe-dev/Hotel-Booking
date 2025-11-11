import { HiOutlineHome } from "react-icons/hi2";
import { MdOutlineChair } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { HiOutlineInboxStack } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="p-6 bg-[#FAFAFA] h-min-screen text-[#475467] flex flex-col justify-between">
      <div className="flex flex-col gap-3">
        <Link to="/landlords/dashboard" className="flex gap-2 items-center">
          <HiOutlineHome />
          Dashboard
        </Link>
        <Link to="/landlords/management" className="flex gap-2 items-center">
          <MdOutlineChair />
          Property Management
        </Link>
        <Link to="/landlords/availability" className="flex gap-2 items-center">
          <GoBell />
          Room Availabilty
        </Link>
        <Link to="/landlords/request" className="flex gap-2 items-center">
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
