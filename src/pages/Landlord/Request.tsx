import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { bookingRequests } from "../../data/requestData";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export default function Request() {
  return (
    <div className="w-full pr-4 text-[#484848]">
      <div className="flex justify-end py-4 pr-6">
        <div className=" flex items-center gap-2 border-2 border-[#D0D5DD] p-2  rounded-md lg:w-1/5 ">
          <IoSearch size={20} />
          <input placeholder="Search" className="outline-none" />
        </div>
      </div>
      {/* DESKTOP VIEW */}
      <div className="hidden lg:block">
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3 text-left">Room</th>
              <th className="p-3 text-left">Apartment</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Tenants</th>
              <th className="p-3 text-left">Country</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Date Application</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">More</th>
            </tr>
          </thead>

          <tbody className="[&>tr:nth-child(odd)]:bg-[#F9FAFB]">
            {bookingRequests.map((booking) => (
              <tr>
                <td className="flex items-center gap-2 p-3">
                  <img
                    width={30}
                    height={30}
                    src="/images/room1.svg"
                    alt={booking.roomName}
                  />
                  <span>{booking.roomName}</span>
                </td>
                <td className="p-3">{booking.apartment}</td>
                <td className="p-3">{booking.price}</td>
                <td className="flex items-center gap-2 p-3">
                  <img
                    src="/images/room2.svg"
                    alt="tenant img"
                    width={30}
                    height={30}
                  />
                  <span>{booking.tenantName}</span>
                </td>
                <td className="p-3">{booking.countryCode}</td>
                <td className="p-3">{booking.location}</td>
                <td className="p-3">{booking.dateApplication}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-xl text-xs font-medium
                  ${
                    booking.status === "Accepted"
                      ? "bg-[#ECFDF3] text-[#027A48]"
                      : booking.status === "Rejected"
                      ? "bg-[#FEF3F2] text-[#B42318]"
                      : "bg-[#FFFAEB] text-[#B54708]"
                  }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-3">
                  <Menu>
                    <MenuButton
                      transition="all 0.2s"
                      _hover={{ cursor: "pointer" }}
                    >
                      <HiOutlineDotsVertical />
                    </MenuButton>
                    <MenuList>
                      <MenuItem _hover={{ cursor: "pointer" }}>Remove</MenuItem>
                      <MenuItem _hover={{ cursor: "pointer" }}>Put on Approval</MenuItem>
                      <MenuItem _hover={{ cursor: "pointer" }}>Reject</MenuItem>
                    </MenuList>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW */}
      <div className="lg:hidden">
        {bookingRequests.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src="/images/room2.svg"
                alt={booking.roomName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">
                  {booking.roomName}
                </p>
                <p className="text-sm text-gray-500">{booking.apartment}</p>
              </div>
              <span
                className={`ml-auto px-2 py-1 rounded-full text-xs font-medium
                                  ${
                                    booking.status === "Accepted"
                                      ? "bg-green-100 text-green-700"
                                      : booking.status === "Rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">Date:</span>{" "}
                {booking.dateApplication}
              </p>
              <p>
                <span className="font-medium">Price:</span> {booking.price}
              </p>
              <p>
                <span className="font-medium">Location:</span>{" "}
                {booking.location}
              </p>
              <p>
                <span className="font-medium">Tenant: </span>{" "}
                {booking.tenantName}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-3">
              <button className="text-blue-500 hover:text-blue-700">
                <FiEdit2 />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
