import { useNavigate, useParams } from "react-router";
//import { roomsGrid } from "../../data/roomsGrid";
import ErrorPage from "./ErrorPage";
import BlueButton from "../../components/blueButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import Map from "../../components/map";
import { iconMap } from "../../utils/iconMap";
import { useEffect, useState } from "react";

export default function RoomDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [form, setForm] = useState({ checkIn: "", checkOut: "" });
  const [errors, setErrors] = useState<{ checkIn?: string; checkOut?: string }>(
    {}
  );
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
        console.log(roomsData[0]);
        setRoom(roomsData[0]);
        setLoading(false);
        //console.log(user)
      },
      (error) => {
        console.error(error);
        //console.log("Error");
      }
    );
    return () => unsubscribe();
    
  }, [user]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors({});
  };

  const validation = () => {
    const newErrors: { checkIn?: string; checkOut?: string } = {};
    if (!form.checkIn) newErrors.checkIn = "Required";
    if (!form.checkOut) newErrors.checkOut = "Required";

    return newErrors;
  };

  const handleApply = async () => {
    if (!user) {
      alert("Plese sign in first!");
      return;
    }

    const newErrors = validation();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await addDoc(collection(db, "applications"), {
        userId: user.uid,
        ...room,
        ...form,
        Email: user.email,
        Name: user.displayName,

        appliedAt: new Date().toLocaleDateString("en-GB"),
      });

      console.log(form);
      alert("Applied successfully");
      navigate(`/booking/${room.roomId}`);
    } catch (err) {
      console.error(err);
      alert("Failed to apply");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading room details...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div>
        <ErrorPage />
      </div>
    );
  }

  return (
    <div className="px-2 md:px-20 pb-10">
      <div className="md:flex gap-20">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-2">
          <img
            src="/images/room1.svg"
            alt={room.apartment}
            className="w-full h-96 object-cover"
          />
          <p>OTHER ROOM IMAGES</p>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{room.propertyTitle}{" "}{room.apartment}</h1>
            <p>
              <span className="text-2xl font-bold">${room.pricePerMonth}</span>/
              {true ? (
                <span>Bills included</span>
              ) : (
                <span>No bills included</span>
              )}
            </p>
          </div>
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
            <p className="text-sm text-[#6C6B6B]">{room.location}</p>
          </div>
          {/* <div className="grid grid-cols-3 gap-2 md:flex justify-between items-center mb-2">
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              {room.numberOfRooms} bedroom(s)
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              {room.squareArea}
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              {room.bathrooms} Bathrooms
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              Furnished
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              Cleaning Included
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              Balcony
            </Tag>
            <Tag bgColor="#D6DBEC" textColor="#25409C">
              Bed Linen/Towels
            </Tag>
          </div> */}

          {/* DESCRIPTION */}
          <div className="border border-[#EBEBEB] rounded-xl p-4">
            <h2 className="font-bold text-lg">Description</h2>
            <p>
              {room.description} 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              mollitia esse adipisci aperiam nam accusantium debitis in quam
              soluta magnam tempore id optio eum dolores, nostrum quisquam ipsa
              quod doloribus.
            </p>
            <BlueButton />
          </div>

          {/* FACILITIES */}
          <div className="border border-[#EBEBEB] rounded-xl p-4">
            <h2 className="font-bold text-lg">Facilities</h2>
            <div className="grid grid-cols-3 gap-2 md:flex justify-between items-center my-3">
              {room.amenities?.map((amenity: any) => {
                const IconComponent = iconMap[amenity.icon];
                return (
                  <Tag bg="#F2F4F7" key={amenity}>
                    <TagLeftIcon as={IconComponent} />
                    <TagLabel pl="6px">{amenity}</TagLabel>
                  </Tag>
                );
              })}
            </div>
            <BlueButton />
          </div>

          {/* AVAILABILITY */}
          <div className="border border-[#EBEBEB] rounded-xl p-4">
            <h2 className="font-bold text-lg">Availability</h2>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  Available from:{" "}
                  <span className="font-semibold">26 February 2027</span>
                </p>
                {/* <p>
                  Minimum stay: <span className="font-semibold">3 Months</span>
                </p> */}
                <p>
                  Maximum stay: {" "}
                  <span className="font-semibold">{room.minimumStay}</span>
                </p>
                <p>
                  Calendar Updated:{" "}
                  <span className="font-semibold">1 week ago</span>
                </p>
              </div>
              {/* <div className="grid grid-cols-6 gap-2">
                {room.availability.map((date: any) => (
                  <div
                    key={date.month}
                    className="bg-[#F9FAFB] text-center text-[#484848] text-sm p-4"
                  >
                    <p>{date.month}</p>
                    <p>{date.price}</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>

          {/* LANLORD RULES */}
          <div className="border border-[#EBEBEB] rounded-xl p-4">
            <h2 className="font-bold text-lg">Landlord Rules</h2>
            <div className="grid grid-cols-3 gap-2 md:flex justify-between items-center">
              {room.rules.map((rule: any) => {
                const IconComponent = iconMap[rule.icon];
                return (
                  <Tag bg="#F2F4F7" key={rule.value}>
                    <TagLeftIcon as={IconComponent} />
                    <TagLabel pl="6px">{rule}</TagLabel>
                  </Tag>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1">
          {/* BOOKING REQUEST */}
          <div className="flex flex-col gap-2 border-1 rounded-md p-4 my-2">
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Booking Request</p>
              <div className="flex gap-4 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2.2"
                    d="M5 17v8a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2v-8m-11 3V3.5M22 9l-6-6l-6 6"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 21l-1.45-1.3q-2.525-2.275-4.175-3.925T3.75 12.812T2.388 10.4T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.3 0 2.475.55T12 4.75q.85-1 2.025-1.55t2.475-.55q2.35 0 3.925 1.575T22 8.15q0 1.15-.387 2.25t-1.363 2.412t-2.625 2.963T13.45 19.7zm0-2.7q2.4-2.15 3.95-3.687t2.45-2.675t1.25-2.026T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2.175.662T12.95 7h-1.9q-.375-1.025-1.375-1.687T7.5 4.65q-1.5 0-2.5 1t-1 2.5q0 .875.35 1.763t1.25 2.025t2.45 2.675T12 18.3m0-6.825"
                  />
                </svg>
              </div>
            </div>

            <div className="flex justify-between items-center gap-4">
              <div>
                <label>Check In:</label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="checkIn"
                  className="w-full p-3 rounded-md border border-gray-300"
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm">{errors.checkIn}</p>
                )}
              </div>
              <div>
                <label>Check Out:</label>
                <input
                  onChange={handleChange}
                  type="date"
                  name="checkOut"
                  className="w-full p-3 rounded-md border border-gray-300"
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm">{errors.checkOut}</p>
                )}
              </div>
            </div>
            <button
              onClick={handleApply}
              className="w-full bg-[#25409C] text-white p-3 rounded-md mt-4 hover:cursor-pointer"
            >
              Check Booking
            </button>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col gap-2 border-1 rounded-md p-4 my-2">
            <p className="font-semibold text-lg">Location</p>
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
              <p className="text-sm text-[#6C6B6B]">{room.location}</p>
            </div>
            <div className="h-[200px]">
              <Map location={room.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
