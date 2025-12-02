import { Outlet, useLocation } from "react-router";
//import { roomsGrid } from "../../../data/roomsGrid";
import { useParams } from "react-router";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../firebase";

export default function Booking() {
  const location = useLocation();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "rooms"), where("roomId", "==", Number(id)));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const roomsData = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //console.log(roomsData[0]);
        setRoom(roomsData[0]);
        setLoading(false);
        console.log(loading)
      },
      (error) => {
        console.error(error);
        console.log("Error");
      }
    );
    return () => unsubscribe();
  }, [user]);

  const steps = [
    { label: "Contact Information", path: "" },
    { label: "Payment", path: "payment" },
    { label: "Cancellation Policy", path: "cancellation" },
  ];

  return (
    <div className="px-16 flex justify-between max-w-8xl mx-auto">
      <div className="w-full pr-6 ">
        {steps.map((step, index) => {
          const active =
            step.path === ""
              ? /^\/booking\/[^/]+$/.test(location.pathname)
              : location.pathname.endsWith(step.path);

          return (
            <div key={index} className="border-2 my-2 p-4 rounded-xl">
              <h2 className="font-bold text-xl text-bl">
                {index + 1}.{step.label}
              </h2>

              {active && <Outlet />}
            </div>
          );
        })}
      </div>

      {/* RIGHT  SIDE */}

      <div className="hidden w-full md:flex flex-col gap-2">
        <img
          src="/images/room1.svg"
          alt={room?.propertyTitle}
          className="w-full h-70 object-cover"
        />
        <p className="font-bold text-lg">{room?.propertyTitle}{' '}{room?.apartment} </p>
        <div className="flex gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="#6C6B6B"
              d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
            />
          </svg>
          <p className="text-sm text-[#6C6B6B]">{room?.location}</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <div>
            <label>Check In:</label>
            <input
              type="date"
              name="checkIn"
              className="w-full p-3 rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label>Check Out:</label>
            <input
              type="date"
              name="checkOut"
              className="w-full p-3 rounded-md border border-gray-300"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-bold">Price Details</h2>
          <p className="flex justify-between items-center">
            <span>Monthly</span>
            <span>{room?.pricePerRoom}£</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Bills(Gas Media, Cleaning)</span>
            <span>30-40£</span>
          </p>
          <p className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>{room?.deposit}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
