import { useAuthState } from "react-firebase-hooks/auth";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { auth } from "../../firebase";
import { HiOutlineHome } from "react-icons/hi2";
import Map from "../../components/map";

export default function Dashboard() {

  const [user] = useAuthState(auth);
  return (
    <div className="w-full md:px-10 md:pb-10">
      <div className="pr-4 py-4 flex flex-col flex-1 gap-4">
        <div>
          <h2 className="text-[#484848] text-xl font-semibold">
            Welcome back, {user?.displayName}{" "}
          </h2>
          <p className="text-[#6C6B6B] text-sm">
            Track, manage and forecast your properties
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 text-[#484848] ">
          <div className="flex flex-1 justify-between border-2 border-[#EAECF0] rounded-xl p-6 ">
            <div className="flex flex-col gap-3">
              <p>Rent Received</p>
              <p>3,000</p>
            </div>
            <RiMoneyPoundCircleLine size={30} />
          </div>

          <div className="flex flex-1 justify-between border-2 border-[#EAECF0] rounded-xl p-6 ">
            <div className="flex flex-col gap-3">
              <p>Occupied Rooms</p>
              <p>5</p>
            </div>
            <HiOutlineHome size={30} />
          </div>

          <div className="flex flex-1 justify-between border-2 border-[#EAECF0] rounded-xl p-6 ">
            <div className="flex flex-col gap-3">
              <p>Booking Requests</p>
              <p>3 Pending</p>
            </div>
            <MdOutlineNotificationsActive size={30} />
          </div>
        </div>

        {/* MAP */}
        <Map />
      </div>
    </div>
  );
}
