import { Outlet } from "react-router";
import LandNavbar from "../components/LandNavbar";
import SideBar from "../components/SideBar";

export default function LandlordLayout() {
  return (
    <>
      <LandNavbar />
      <main className="flex gap-6">
        <SideBar />
        <Outlet />
      </main>
    </>
  );
}
