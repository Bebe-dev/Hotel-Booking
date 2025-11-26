import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default function Availability() {
  const [groupedData, setGroupedData] = useState<any[]>([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    async function fetchApplications() {
      const snapshot = await getDocs(collection(db, "applications"));
      const applications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const grouped: any = {};

      applications.forEach((application: any) => {
        const { roomNumber, Name, checkIn, checkOut, name } = application;

        if (!grouped[roomNumber]) {
          grouped[roomNumber] = {
            roomNumber: roomNumber,
            name: name,
            tenantsHosted: 0,
            availability: "Available",
            nextAvailableDate: null,
            tenants: [],
          };
        }

        grouped[roomNumber].tenants.push({Name, checkIn, checkOut, name});
        grouped[roomNumber].tenantsHosted += 1;

        //console.log("CheckIn:", checkIn, "CheckOut:", checkOut);
        console.log(grouped)
        console.log(Object.values(grouped))
        

        const now = new Date();
        const start = new Date(checkIn);
        const end = new Date(checkOut);

        if (now >= start && now <= end) {
          grouped[roomNumber].availability = "Occupied";
          grouped[roomNumber].nextAvailableDate = end.toDateString();
        }
      });

      setGroupedData(Object.values(grouped));
    }

    fetchApplications();
  }, []);

  return (
    <div className="h-screen p-6 md:px-10">
      <h2 className="text-2xl font-semibold mb-4">Room Availability</h2>

      <div className="grid grid-cols-[200px_repeat(12,1fr)] items-center gap-1 pb-2">
        <div></div>
        {months.map((month) => (
          <div className="bg-[#D9D9D9] p-2 md:px-7" key={month}>{month}</div>
        ))}
      </div>
      <div>
        {groupedData.map((room: any) => (
          <div
            key={room.roomNumber}
            className="grid grid-cols-[200px_repeat(12,1fr)] gap-2 items-center mb-4"
          >
            <div className="bg-[#484848] text-white rounded-md p-2 ">
              <p>Room {room.roomNumber}</p>
              <p className="text-sm">{room.name}</p>
            </div>

            <div className="relative col-span-12 h-10">
              {room.tenants.map((tenant: any, index: number) => {
                const start = new Date(tenant.checkIn).getMonth() + 1;
                const end = new Date(tenant.checkOut).getMonth() + 1;
                return (
                  <div
                    key={index}
                    className={`absolute top-0 h-10 bg-gray-400 rounded-xl flex items-center text-white text-sm px-3`}
                    style={{
                      left: `${(start - 1) * (100 / 12)}%`,
                      width: `${(end - start + 1) * (100 / 12)}%`,
                    }}
                  >
                    <span>{tenant?.Name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
