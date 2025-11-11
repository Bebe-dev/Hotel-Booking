export default function Testimonials({variant} : {variant: "home" | "about"} ) {
  
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Briar Martin",
      handle: "@neilstellar",
      review:
        "Highly recommended. I came across this platform during my Erasmus program. The customer support was exceptional - they were prompt and helpful in answering all my queries.Thanks to Erasmus Life Housing, I found the perfect accommodation. ",
    },
    {
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
      name: "Serena Johnson",
      handle: "@serena",
      review:
        "Erasmus Life Housing deserves a huge shoutout for making my housing search that comfortable., I was initially worried about finding accommodation in Lisbon, but this Erasmus Life Housing made the process stress-free.  Five stars!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
      name: "Ilias Elfhassi",
      handle: "@jordantalks",
      review:
        "Erasmus Life Housing deserves a huge shoutout for making my housing search that comfortable., I was initially worried about finding accommodation in Lisbon, but this Erasmus Life Housing made the process stress-free.  Five stars!",
    },
    {
      image:
        "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
      name: "Avery Smith",
      handle: "@averywrites",
      review:
        "Highly recommended. I came across this platform during my Erasmus program. The customer support was exceptional - they were prompt and helpful in answering all my queries.Thanks to Erasmus Life Housing, I found the perfect accommodation. ",
    },
  ];

  type Card = {
    image: string;
    name: string;
    handle: string;
    review: string;
  };

  const CreateCard = ({ card }: { card: Card }) => (
    <div className={ variant === "home" ? "p-4 bg-[#25409C] text-white rounded-md mx-4 shadow hover:shadow-lg transition-all duration-200 w-100 shrink-0" : "p-4 bg-white text-[#6C6B6B] rounded-md mx-4 shadow hover:shadow-lg transition-all duration-200 w-100 shrink-0" }>
      <div className="flex gap-2">
        <img
          className="size-11 rounded-full"
          src={card.image}
          alt="User Image"
        />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 text-xl font-semibold">
            <p>{card.name}</p>
          </div>
          <p className="text-sm py-4">{card.review}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <style>{`
            @keyframes marqueeScroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }

            .marquee-inner {
                animation: marqueeScroll 25s linear infinite;
            }
            .marquee-inner:hover {
                animation-play-state: paused;
            }

            .marquee-reverse {
                animation-direction: reverse;
            }
        `}</style>

      <div>
        <div className="text-center mt-10">
          <h1 className="text-[#25409C] font-semibold text-sm text-center">
            Testimonials
          </h1>
          <h2 className="text-2xl font-bold text-center my-2">
            That's What Our Clients Say
          </h2>
        </div>
        {/* marquee */}
        <div className="marquee-row w-full mx-auto max-w-7xl overflow-hidden relative">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r to-transparent"></div>
          <div className="marquee-inner flex transform-gpu min-w-[200%] pt-10 pb-5">
            {[...cardsData, ...cardsData].map((card, index) => (
              <CreateCard key={index} card={card} />
            ))}
          </div>
          <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l to-transparent"></div>
        </div>

        <button className={`${variant=== "about"? "text-[#25409C] bg-[#D6DBEC]" : " bg-white text-[#344054]"} mx-auto mt-4 mb-8 block px-6 py-3 border border-[#D0D5DD] rounded-md font-medium text-sm hover:cursor-pointer hover:text-base transition`}>
          Read More 
        </button>
      </div>
    </>
  );
}
