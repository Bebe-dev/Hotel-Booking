import { Field, Form, Formik } from "formik";
import { useLocation } from "react-router";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Tooltip,
} from "@chakra-ui/react";
import Map from "../../components/map";
import RoomCard from "../../components/RoomCard";
import { useEffect, useState, useMemo } from "react";
import { LayoutGrid, Menu2 } from "tabler-icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const sortOptions = [
  { value: "", label: "Sort By" },
  { value: "priceLowHigh", label: "Price: Low → High" },
  { value: "priceHighLow", label: "Price: High → Low" },
  { value: "nameAZ", label: "Name: A → Z" },
  { value: "nameZA", label: "Name: Z → A" },
];

export default function Listings() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [user] = useAuthState(auth);

  const [sortBy, setSortBy] = useState("");
  const [rooms, setRooms] = useState<any>([]);
  const [sliderValue, setSliderValue] = useState([0, 1000]);
  const [gridView, setGridView] = useState(true);

  const [filterValues, setFilterValues] = useState({
    location: queryParams.get("location") || "",
    checkIn: queryParams.get("checkIn") || "",
    checkOut: queryParams.get("checkOut") || "",
    budget: queryParams.get("budget") || "",
    amenities: [] as string[],
  });

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "rooms"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const roomsData = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomsData);
        //alert(roomsData.length + " rooms fetched");
        //console.log("Rooms data:", roomsData);
      },
      (error) => {
        console.error(error);
        alert("Error fetching data:");
      }
    );
    return () => unsubscribe();
  }, [user]);

  const filteredRooms = useMemo(() => {
    //console.log("useMemo", rooms);
    let filtered = [...rooms];

    // BY LOCATION
    if (filterValues.location) {
      filtered = filtered.filter((room: any) =>
        room.location
          ?.toLowerCase()
          .includes(filterValues.location.toLowerCase())
      );
    }

    // BY BUDGET
    const [min, max] = sliderValue;
    filtered = filtered.filter(
      (room: any) => room.pricePerMonth >= min && room.pricePerMonth <= max
    );

    //BY AMENITIES
    if (filterValues.amenities.length > 0) {
      filtered = filtered.filter((room: any) =>
        filterValues.amenities.every((amenity: any) =>
          room.facilities
            ?.map((a: any) => a.value.toLowerCase())
            .includes(amenity)
        )
      );
    }

    // SORTING
    return filtered.sort((a: any, b: any) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      if (sortBy === "nameAZ") return a.name.localeCompare(b.name);
      if (sortBy === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });
  }, [rooms, filterValues, sliderValue, sortBy]);

  return (
    <div>
      <div className="md:flex">
        <aside className="md:w-64 p-4">
          <Formik
            initialValues={filterValues}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ values }) => {
              // Update filter state whenever form values change
              useEffect(() => {
                setFilterValues(values);
              }, [values]);

              return (
                <Form className="grid grid-cols-2 md:flex md:flex-col md:gap-6">
                  <div>
                    <label htmlFor="location" className="font-bold">
                      Location
                    </label>
                    <Field name="location" placeholder="Location" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-2 mb-4">
                      <label htmlFor="budget" className="font-bold">
                        Budget
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="border-2 border-[#667085] text-[#A1A7B0] p-2 rounded-md w-2/5"
                        >
                          Min
                        </button>
                        <button
                          type="button"
                          className="border-2 border-[#667085] text-[#A1A7B0] p-2 rounded-md w-2/5"
                        >
                          Max
                        </button>
                      </div>
                      <RangeSlider
                        aria-label={["min", "max"]}
                        defaultValue={sliderValue}
                        min={0}
                        max={1000}
                        step={50}
                        width={200}
                        name="budget"
                        onChange={(value) => setSliderValue(value)}
                      >
                        <RangeSliderTrack>
                          <RangeSliderFilledTrack />
                        </RangeSliderTrack>
                        <Tooltip
                          label={sliderValue[0]}
                          bg="white"
                          textColor={"black"}
                          placement="bottom"
                          hasArrow
                          isOpen
                        >
                          <RangeSliderThumb index={0} />
                        </Tooltip>
                        <Tooltip
                          label={sliderValue[1]}
                          bg="white"
                          textColor={"black"}
                          placement="bottom"
                          hasArrow
                          isOpen
                        >
                          <RangeSliderThumb index={1} />
                        </Tooltip>
                      </RangeSlider>
                    </div>
                  </div>

                  {/* DATES */}
                  <div>
                    <label htmlFor="dates" className="font-bold">
                      Dates
                    </label>
                    <div className="flex gap-2">
                      <Field
                        className="border-2 border-[#667085] text-[#A1A7B0] p-2 rounded-md w-2/5"
                        name="checkIn"
                        type="date"
                        placeholder="From"
                      />
                      <Field
                        className="border-2 border-[#667085] text-[#A1A7B0] p-2 rounded-md w-2/5"
                        name="checkOut"
                        type="date"
                        placeholder="To"
                      />
                    </div>
                  </div>

                  {/* NEIGHBOURHOOD */}
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Neighborhood</p>
                    <label>
                      <Field type="checkbox" name="area" value="almada" />
                      Almada
                    </label>
                    <label>
                      <Field type="checkbox" name="area" value="amadoa" />
                      Amadora
                    </label>
                    <label>
                      <Field type="checkbox" name="area" value="anjos" />
                      Anjos
                    </label>
                    <button
                      type="button"
                      className="w-25 text-[#25409C] bg-[#D6DBEC] rounded-3xl"
                    >
                      Show more
                    </button>
                  </div>

                  {/* ROOM TYPE */}
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Room Type</p>
                    <label>
                      <Field type="checkbox" name="roomType" value="studio" />
                      Studio
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="roomType"
                        value="apartment"
                      />
                      Apartment
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="roomType"
                        value="private room"
                      />
                      Private Room
                    </label>
                    <button
                      type="button"
                      className="w-25 text-[#25409C] bg-[#D6DBEC] rounded-3xl"
                    >
                      Show more
                    </button>
                  </div>

                  {/* AMENITIES */}
                  <div className="flex flex-col gap-2">
                    <p className="font-bold">Amenities</p>
                    <label>
                      <Field type="checkbox" name="amenities" value="heating" />
                      Heating
                    </label>
                    <label>
                      <Field type="checkbox" name="amenities" value="dryer" />
                      Dryer
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="amenities"
                        value="air conditioner"
                      />
                      Air conditioning
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="amenities"
                        value="washing machine"
                      />
                      Washing Machine
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="amenities"
                        value="dishwasher"
                      />
                      Dishwasher
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="amenities"
                        value="private bathroom"
                      />
                      Private bathroom
                    </label>
                    <button
                      type="button"
                      className="w-25 text-[#25409C] bg-[#D6DBEC] rounded-3xl"
                    >
                      Show more
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </aside>

        <main className="flex-1">
          <Map />

          <div>
            <div className="flex justify-between items-center mt-4 px-4">
              <p>{filteredRooms.length} Rentals</p>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-2 rounded-md"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex">
                  <LayoutGrid
                    size={30}
                    onClick={() => setGridView(true)}
                    className={`${
                      gridView ? "bg-[#E5E9EB]" : "bg-[#F6F8F9]"
                    } px-1 rounded-l-md hover:cursor-pointer`}
                  />
                  <Menu2
                    size={30}
                    onClick={() => setGridView(false)}
                    className={`${
                      gridView ? "bg-[#F6F8F9]" : "bg-[#E5E9EB]"
                    } px-1 rounded-r-md hover:cursor-pointer`}
                  />
                </div>
              </div>
            </div>
            <div
              className={`${
                gridView
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex flex-col"
              } gap-6 mt-4`}
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room: any) => (
                  <RoomCard
                    key={room.id}
                    id={room.roomId}
                    name={room.apartment}
                    price={room.pricePerMonth}
                    address={room.location}
                    image="/images/room1.svg"
                    billsIncluded={room.billsIncluded}
                    ellVerified={room.ellVerified}
                    
                  />
                ))
              ) : (
                <p>No rooms found.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
