export default function Achievement() {
  return (
    <div  className="px-6 md:mx-20 md:my-30 mx-2 mb-10 text-[#484848 font-semibold] flex gap-14 justify-between items-center py-5 border-2 rounded-md">
      {/* LEFT HALF */}
      <div className="flex-1 hidden md:block">
        <img src="images/achieve.png" alt="achievement" />
      </div>

      {/* RIGHT HALF */}
      <div className="flex flex-1 flex-col gap-8">
        <h1 className="text-[#25409C] font-semibold text-lg">Our Achievements</h1>
        <p>
          Since 2013, our team has helped tons of students discover their ideal
          place. We’ve got a wide selection of student-friendly rooms, all built
          and managed just for you. Explore different neighborhoods, compare
          options, and make the right choice for a safe and inspiring home. Your
          journey is important, and the right housing sets the stage for a
          fantastic experience and personal growth.
        </p>

        <div>
          <div className="flex justify-between mb-8">
            <div>
              <span className="font-semibold text-2xl">4235+</span>
              <div className="text-gray-400">Rooms</div>
            </div>
            <div>
              <span className="font-semibold text-2xl">535+</span>
              <div className="text-gray-400">Reservation</div>
            </div>
            <div>
              <span className="font-semibold text-2xl">19905+</span>
              <div className="text-gray-400">Students</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
