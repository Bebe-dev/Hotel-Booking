export default function Process() {
  return (
    <section>
      <div className="text-center mb-4 pt-10">
        <h1 className="text-[#25409C] text-base font-bold">Reservation Process</h1>
        <h2 className="text-[#1D2939 font-bold text-xl py-2">
          Fast, Intuitive and Absolutely Safe !
        </h2>
      </div>

      <div className="flex justify-between gap-6 px-4 md:px-20 py-10">
        {/* 1 */}
        <div className="text-[#484848] w-1/4 ">
          <h3 className="text-4xl font-bold pb-4">1</h3>
          <h4 className="font-semibold text-md py-2">Pick a few spaces</h4>
          <p className="text-sm">
            Explore hundreds of high-quality rooms, studios, and apartments.
            Save favorites and book it. Finding your dream home could not be
            easier!
          </p>
        </div>

        {/* 2 */}
        <div className="text-[#484848] w-1/4 ">
          <h3 className="text-4xl font-bold pb-4">2</h3>
          <h4 className="font-semibold text-md py-2">
            Accepting a reservation
          </h4>
          <p className="text-sm">
            You will receive the acceptance of the reservation from the owner in
            just a couple of hours. You will not have to wait long for an answer
            and torment yourself with guesses.
          </p>
        </div>

        {/* 3 */}
        <div className="text-[#484848] w-1/4 ">
          <h3 className="text-4xl font-bold pb-4">3</h3>
          <h4 className="font-semibold text-md py-2">Payment</h4>
          <p className="text-sm">
            All that is necessary after receiving a response, is to send the
            payment and you are almost at the finish line!
          </p>
        </div>

        {/* 4 */}
        <div className="text-[#484848] w-1/4 ">
          <h3 className="text-4xl font-bold pb-4">4</h3>
          <h4 className="font-semibold text-md py-2">Get your keys!</h4>
          <p className="text-sm">
            Your accommodation is reserved, get ready to move as soon as
            possible and check in on your chosen date.
          </p>
        </div>
      </div>
    </section>
  );
}
