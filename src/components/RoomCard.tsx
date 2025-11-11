import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BuildingIcon from "../assets/icons/buildingIcon";
import CheckIcon from "../assets/icons/checkIcon";

type Room = {
  id: number;
  name: string;
  price: number;
  address: string;
  image: string;
  billsIncluded: boolean;
  ellVerified: boolean;
};

export default function RoomCard(room: Room) {
  return (
    <div>
      <Link to={`/listing/${room.id}`}>
        <div className="border rounded-lg overflow-hidden shadow">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{room.name}</h3>
            <p className="text-gray-600">{room.address}</p>
            <p className="text-blue-600 font-bold mt-2">${room.price}/month</p>
            <div className="flex gap-2 mt-2">
              {room.billsIncluded && (
                <Tag size="md">
                  <TagLeftIcon as={BuildingIcon} />
                  <TagLabel paddingLeft="6px" >Bills included</TagLabel>
                </Tag>
                
              )}
              {room.ellVerified && <Tag size="md">
                  <TagLeftIcon as={CheckIcon} />
                  <TagLabel paddingLeft="6px" >ELL Verified</TagLabel>
                </Tag>}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
