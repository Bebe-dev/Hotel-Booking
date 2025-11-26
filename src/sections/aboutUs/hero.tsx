//import { ArrowNarrowDown } from "tabler-icons-react";

export default function Hero() {
  return (
    <div className="mx-2 md:mx-20 md:my-30 mt-20 mb-6 text-[#484848 font-semibold] md:flex justify-between py-8">
      {/* LEFT HALF */}
      <div className="flex-1">
        <h1 className="text-[#25409C]">About Us</h1>
        <h2 className="text-[#484848] font-bold text-3xl w-2/3 leading-10">
          Erasmus Life Housing - your go-to hub for finding the perfect home for
          students, by students
        </h2>
      </div>

      {/* RIGHT HALF */}
      <div className="flex flex-1 flex-col gap-4">
        <p>
          Whether you are coming to Lisbon for Erasmus, Exchange, Traineeship,
          Full Masters or Work we definitely have a Room, Studio or Apartment
          that suits your needs!
        </p>
        <p>
          Our ultimate goal is to make Lisbon the number one destination for
          International Students and Young Workers, and we most surely don’t
          want that your experience finding accommodation to be a negative point
          of that experience!
        </p>
        {/* <button className="rounded-3xl bg-[#EFF8FF] text-[#175CD3] w-fit flex gap-1 p-2 items-center hover:border transition">
          Show more <ArrowNarrowDown color="#175CD3" />
        </button> */}
      </div>
    </div>
  );
}
