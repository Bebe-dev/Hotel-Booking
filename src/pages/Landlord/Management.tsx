import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useDisclosure } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import DeleteConfirmation from "../../components/deleteConfirmation";
import RoomModal from "../../components/roomModal";

export default function Management() {
  const { isOpen, onOpen, onClose }: any = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [user] = useAuthState(auth);
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");
  const [mode, setMode] = useState<"add" | "edit">("add");

  const openDeleteModal = (id: string) => {
    setSelectedRoomId(id);
    onDeleteOpen();
  };

  const openAddModal = () => {
    setMode("add");
    setSelectedRoomId("");
    onOpen();
  };

  const openEditModal = (room: any) => {
    setMode("edit");
    setSelectedRoomId(room);
    onOpen();
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (!user) return;
      try {
        const q = query(
          collection(db, "rooms"),
          where("landlordUserId", "==", user.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot: any) => {
          const roomsData = snapshot.docs.map((doc: any) => ({
            id: doc.id,
            //landlordName: user.displayName,
            ...doc.data(),
          }));
          setRooms(roomsData);
        });
        return () => unsubscribe();
      } catch (error) {
        alert("Error fetching data");
      } finally {
      }
    };
    fetchRooms();
  }, [user]);

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete this room?")) {
    //   return;
    // }
    try {
      await deleteDoc(doc(db, "rooms", selectedRoomId));

      setRooms((prev) => prev.filter((room) => room.id !== selectedRoomId));
      //alert("Room deleted successfully");
      onDeleteClose();
    } catch (error) {
      console.error(error);
      alert("Error deleting room");
    } finally {
      setSelectedRoomId("");
    }
  };

  return (
    <div className="w-full md:px-10 md:pt-5 text-[#484848] h-screen overflow-y-auto">
      <div className="flex justify-end items-center gap-4 py-4 pr-6">
        <div>
          <button
            onClick={openAddModal}
            className="bg-[#25409C] text-white text-sm py-3 px-3 rounded-xl hover:cursor-pointer"
          >
            Add Room
          </button>
          <RoomModal
            isOpen={isOpen}
            onClose={onClose}
            user={user}
            existingRoom={selectedRoomId}
            mode={mode}
          />
        </div>

        <div className=" flex items-center gap-2 border-2 border-[#D0D5DD] p-2  rounded-md w-1/2 lg:w-1/5 ">
          <IoSearch size={20} />
          <input placeholder="Search" className="outline-none" />
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Apartment</th>
              <th className="p-3 text-left">Date Published</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Listing ID</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-center"></th>
            </tr>
          </thead>

          <tbody className="[&>tr:nth-child(odd)]:bg-[#F9FAFB]">
            {rooms.length === 0 ? (
              <p className="font-bold text-2xl text-center ">You currently have no property listed</p>
            ) : (
              rooms.map((room) => (
                <tr>
                  <td className="p-3 flex items-center gap-2">
                    <img
                      src="/images/room1.svg"
                      width={30}
                      height={30}
                      alt={room.name}
                    />
                    <span>{room.propertyTitle}</span>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        room.status === "Online"
                          ? "bg-green-100 text-green-700"
                          : room.status === "Offline"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      } `}
                    >
                      Online
                    </span>
                  </td>
                  <td className="p-3">{room.apartment}</td>
                  <td className="p-3">{room.appliedAt}</td>
                  <td className="p-3">{room.pricePerMonth}</td>
                  <td className="p-3">{room.roomId}</td>
                  <td className="p-3">{room.location}</td>
                  <td className="p-3 flex gap-4">
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => openDeleteModal(room.id)}
                    >
                      <RiDeleteBinLine
                        size={24}
                        className="hover:text-red-400"
                        onClick={onDeleteOpen}
                      />
                      <DeleteConfirmation
                        isOpen={isDeleteOpen}
                        onClose={onDeleteClose}
                        onConfirm={handleDelete}
                        itemName={room.propertyTitle}
                      />
                    </button>
                    <button
                      className="hover:cursor-pointer"
                      onClick={() => openEditModal(room)}
                    >
                      <FiEdit2 size={20} className="hover:text-blue-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src="/images/room2.svg"
                alt={room.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {room.propertyTitle}
                </p>
                <p className="text-sm text-gray-500">{room.apartment}</p>
              </div>
              <span
                className={`ml-auto px-2 py-1 rounded-full text-xs font-medium
                  ${
                    room.status === "Online"
                      ? "bg-green-100 text-green-700"
                      : room.status === "Offline"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                Online
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Date:</span> {room.appliedAt}
              </p>
              <p>
                <span className="font-medium">Price:</span> {room.pricePerMonth}
              </p>
              <p>
                <span className="font-medium">Location:</span> {room.location}
              </p>
              <p>
                <span className="font-medium">Listing ID:</span> {room.roomId}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-3">
              <button className="text-blue-500 hover:text-blue-700">
                <FiEdit2 />
                <RoomModal
                  isOpen={isOpen}
                  onClose={onClose}
                  user={user}
                  existingRoom={selectedRoomId}
                  mode={mode}
                />
              </button>
              <button
                className="hover:cursor-pointer"
                onClick={() => openDeleteModal(room.id)}
              >
                <RiDeleteBinLine
                  size={20}
                  className="hover:text-red-400"
                  onClick={onDeleteOpen}
                />
                <DeleteConfirmation
                  isOpen={isDeleteOpen}
                  onClose={onDeleteClose}
                  onConfirm={handleDelete}
                  itemName={room.propertyTitle}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
