import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import BedIcon from "../../assets/icons/bedIcon";
import ExpandIcon from "../../assets/icons/expandIcon";
import ShowerIcon from "../../assets/icons/showerIcon";
import SearchIcon from "../../assets/icons/searchIcon";
import {
  Search,
  Bed,
  ArrowsMaximize,
  Droplet,
  ChevronDown,
  ChevronUp,
  X,
} from "tabler-icons-react";

// interface BookingData {
//   fid: string;
//   id: string;
//   contactInfo: {
//     firstName: string;
//     surname: string;
//     gender: string;
//     email: string;
//     number: string;
//     nationality: string;
//     address?: string;
//     about?: string;
//   };
//   payment: {
//     paymentMethod: string;
//     cardNumber: string;
//   };
//   createdAt?: any;
// }

export default function RoomApplication() {
  const [bookings, setBookings] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, "applications"),
          where("userId", "==", user.uid)
        );
        console.log("Fetching bookings for user:", user.uid);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const bookingList = snapshot.docs.map((doc) => ({
            fid: doc.id,
            ...doc.data(),
          }));
          setBookings(bookingList);
          console.log(bookingList);
        });

        // const snapshot = await getDocs(q);
        return () => unsubscribe();
      } catch (error) {
        alert("Error fetching bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  // useEffect(() => {
  //   console.log("Bookings updated:", bookings);
  // }, [bookings]);

  const handleCancel = async (fid: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      console.log("Deleting", fid);
      await deleteDoc(doc(db, "applications", fid));
      console.log("Deleted", fid);
      setBookings((prev: any) =>
        prev.filter((booking: any) => booking.id !== fid)
      );
      //alert("booking ancelled successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel");
    }
  };

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id: any) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // const filteredBookings = bookings.filter(
  //   (booking) =>
  //     booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     booking.roomNumber.includes(searchTerm)
  // );

  if (loading) return <p>Loading Bookings...</p>;
  if (!user) return <p className="text-2xl font-semibold text-center">KINDLY LOGIN TO SEE YOUR APPLICATIONS</p>;

  return (
    <div>
      {/* DESKTOP VIEW */}
      <div className="hidden md:block px-30 text-center">
        <h1 className="font-bold text-xl">Room Applications</h1>

        {bookings.length === 0 ? (
          <p>No bookings have been made</p>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <p>{bookings.length} requests</p>
              <InputGroup width="auto">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input type="tel" placeholder="Search" />
              </InputGroup>
            </div>
            {bookings.map((booking: any) => (
              <div key={booking.roomId}>
                <Accordion allowToggle>
                  <AccordionItem>
                    <h2>
                      <AccordionButton bg="#EAECF0">
                        <Box
                          display="flex"
                          as="span"
                          flex="1"
                          alignItems="center"
                          gap="2"
                        >
                          <img
                            src="/images/room1.svg"
                            alt="room-image"
                            width={50}
                            height={50}
                          />
                          Room {booking.propertyTitle}
                        </Box>

                        <Box as="span" flex="1">
                          {booking.apartment}
                        </Box>

                        <Box as="span" flex="1">
                          {booking.pricePerMonth}£
                        </Box>

                        <Box as="span" flex="1">
                          {booking.landlordName}
                        </Box>

                        <Box as="span" flex="1">
                          {booking.appliedAt}
                        </Box>

                        <Box as="span" flex="1">
                          Waiting Approval
                        </Box>

                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel
                      pb={4}
                      display="flex"
                      backgroundColor="#F2F4F7"
                    >
                      <Box flex={1} borderRadius={4}>
                        <img
                          src="/images/room1.svg"
                          alt="room-image"
                          width={200}
                          height={200}
                        />
                      </Box>

                      <Box flex={1}>
                        <div>
                          <p className="font-semibold text-lg">
                            {booking.roomNumber} - {booking.propertyTitle}
                          </p>
                          <p className="text-[#A1A7B0] text-sm">
                            {booking.apartment}
                          </p>
                        </div>
                        <div>
                          <HStack spacing={4}>
                            <Tag size="sm" variant="subtle" colorScheme="cyan">
                              <TagLeftIcon boxSize="12px" as={BedIcon} />
                              <TagLabel className="font-semibold ">
                                {booking.roomNumber}
                              </TagLabel>
                            </Tag>

                            <Tag size="sm" variant="subtle" colorScheme="cyan">
                              <TagLeftIcon boxSize="12px" as={ExpandIcon} />
                              <TagLabel className="font-semibold">
                                {booking.squareArea}
                              </TagLabel>
                            </Tag>

                            <Tag size="sm" variant="subtle" colorScheme="cyan">
                              <TagLeftIcon boxSize="12px" as={ShowerIcon} />
                              <TagLabel className="font-semibold">
                                {booking.bathroomNumber}
                              </TagLabel>
                            </Tag>
                          </HStack>
                        </div>
                      </Box>

                      <Box flex={1} textAlign="center">
                        <div>
                          <p>Joined the platform:</p>
                          <span className="font-semibold text-lg">2023</span>
                        </div>
                        <div>
                          <p>Tenants hosted:</p>
                          <span className="font-semibold text-lg">
                            "Tenant hosted"
                          </span>
                        </div>
                      </Box>

                      {/* as="span" flex="1" textAlign="left" */}

                      <Box flex={1} textAlign="center">
                        <p className="font-semibold text-lg">Tenant Message:</p>
                        <p>
                          I hope this letter finds you well. My name is Andreas,
                          and I am reaching out to express my interest in
                          renting STANDARD Room 3 for a 9-month period. I
                          believe that I would be an excellent tenant for your
                          property, and I am excited about the prospect of...
                          READ MORE
                        </p>
                        <button
                          onClick={() => handleCancel(booking.fid)}
                          className="bg-white font-semibold border-2 p-2 rounded-xl my-2"
                        >
                          Cancel Request
                        </button>
                      </Box>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MOBILE VIEW */}
      <div className="min-h-screen bg-gray-50 pb-6 md:hidden">
        {/* Header */}
        <div className="bg-white px-4 py-6 shadow-sm sticky top-0 z-10">
          <h1 className="font-bold text-xl text-center mb-4">
            Room Applications
          </h1>

          {bookings.length > 0 && (
            <>
              <p className="text-sm text-gray-600 mb-3">
                {bookings.length} requests
              </p>

              {/* Search Bar */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search by room or name..."
                  // value={searchTerm}
                  // onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pt-4">
          {bookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <div
                  key={booking.roomId}
                  className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200"
                >
                  {/* Card Header - Always Visible */}
                  <div
                    onClick={() => toggleExpand(booking.roomId)}
                    className="p-4 cursor-pointer active:bg-gray-50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <img
                        src="/images/room1.svg"
                        alt={booking.propertyTitle}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-base truncate pr-2">
                            Room {booking.roomNumber}
                          </h3>
                          <span className="text-lg font-bold text-blue-600 flex-shrink-0">
                            £{booking.pricePerMonth}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 truncate mb-2">
                          {booking.apartment}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Bed size={14} />
                            {booking.roomNumber}
                          </span>
                          <span className="flex items-center gap-1">
                            <ArrowsMaximize size={14} />
                            {booking.squareArea}
                          </span>
                          <span className="flex items-center gap-1">
                            <Droplet size={14} />
                            {booking.bathroomNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                        " status"
                      </span>

                      {expandedId === booking.roomId ? (
                        <ChevronUp className="text-gray-400" size={20} />
                      ) : (
                        <ChevronDown className="text-gray-400" size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === booking.roomId && (
                    <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-4">
                      {/* Property Image */}
                      <div className="w-full">
                        <img
                          src="/images/room1.svg"
                          alt={booking.propertyTitle}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>

                      {/* Property Details */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Landlord</p>
                          <p className="font-semibold">"Landlord"</p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-1">
                            Applied Date
                          </p>
                          <p className="font-semibold">{booking.appliedAt}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">
                              Platform Join
                            </p>
                            <p className="font-bold text-lg">2023</p>
                          </div>
                          <div className="bg-white p-3 rounded-lg text-center">
                            <p className="text-xs text-gray-500 mb-1">
                              Tenants Hosted
                            </p>
                            {/* <p className="font-bold text-lg">
                              {booking.tenantsHosted}
                            </p> */}
                          </div>
                        </div>
                      </div>

                      {/* Tenant Message */}
                      <div className="bg-white p-4 rounded-lg">
                        <p className="font-semibold text-sm mb-2">
                          Tenant Message:
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          I hope this letter finds you well. My name is Andreas,
                          and I am reaching out to express my interest in
                          renting STANDARD Room 3 for a 9-month period. I
                          believe that I would be an excellent tenant for your
                          property, and I am excited about the prospect of...
                          <span className="text-blue-600 font-medium ml-1">
                            READ MORE
                          </span>
                        </p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => handleCancel(booking.fid)}
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 active:bg-gray-100 transition-colors"
                      >
                        <X size={18} />
                        Cancel Request
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
