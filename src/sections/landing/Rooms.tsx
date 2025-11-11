import React from "react";
import { FaHeart, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";

type Room = {
  id: number;
  name: string;
  image: string;
  location: string;
  price: string;
  verified: boolean;
};

const rooms: Room[] = [
  {
    id: 1,
    name: "Deluxe Suite",
    image: "images/room1.svg",
    location: "123 Main St, Cityville",
    price: "$120/night",
    verified: true,
  },
  {
    id: 2,
    name: "Executive Room",
    image: "images/room2.svg",
    location: "456 Oak Ave, Townsville",
    price: "$150/night",
    verified: true,
  },
  {
    id: 3,
    name: "Standard Room",
    image: "images/room3.svg",
    location: "789 Pine Rd, Villagetown",
    price: "$90/night",
    verified: true,
  },
  {
    id: 4,
    name: "Family Suite",
    image: "images/room4.svg",
    location: "321 Maple St, Cityville",
    price: "$180/night",
    verified: true,
  },
  {
    id: 5,
    name: "Single Room",
    image: "images/room5.svg",
    location: "654 Elm Ave, Townsville",
    price: "$70/night",
    verified: true,
  },
  {
    id: 6,
    name: "Presidential Suite",
    image: "images/room6.svg",
    location: "987 Cedar Rd, Villagetown",
    price: "$300/night",
    verified: true,
  },
];

const RoomCard: React.FC<{ room: Room }> = ({ room }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white w-[300px] mx-auto flex flex-col">
    <img
      src={room.image}
      alt={room.name}
      className="w-full h-[170px] object-cover"
    />
    <div className="p-4">
      <div className="flex items-center mb-2">
        <span className="font-semibold text-lg flex-1">{room.name}</span>
        <button
          className="bg-none border-none cursor-pointer text-red-500 text-xl"
          aria-label="Add to favorites"
          type="button"
        >
          <FaHeart color="#344054" />
        </button>
      </div>
      <div className="flex items-center text-gray-500 text-sm mb-2">
        <FaMapMarkerAlt className="mr-1.5" />
        {room.location}
      </div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-base">{room.price}</span>
        {room.verified && (
          <span className="inline-flex items-center bg-[#F2F4F7] text-[#344054] rounded-full px-2 py-0.5 text-xs font-medium">
            <FaCheckCircle className="mr-1" />
            ELL Verified
          </span>
        )}
      </div>
    </div>
  </div>
);

export default function Rooms() {
  return (
    <section className="py-10">
      <div className=" mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Reserve The Finest Rooms{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
