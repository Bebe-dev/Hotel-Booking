//import type { JSX } from "react";
import { FaBed, FaWifi, FaSmoking, FaDog, FaUserFriends, FaSnowflake } from "react-icons/fa";
import { MdBalcony, MdLocalLaundryService } from "react-icons/md";
import { GiHotSurface } from "react-icons/gi";

export const iconMap: Record<string, React.ElementType> = {
  BedIcon: FaBed,
  WifiIcon: FaWifi,
  SmokingIcon: FaSmoking,
  PetIcon: FaDog,
  GuestIcon: FaUserFriends,
  BalconyIcon: MdBalcony,
  WashingIcon: MdLocalLaundryService,
  HeatingIcon: GiHotSurface,
  ACIcon: FaSnowflake,
};