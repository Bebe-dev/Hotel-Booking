const highlights = [
    { label: "Professional Team" },
    { label: "Always in touch" },
    { label: "Verified Rooms" },
    { label: "Fast and Secure Booking" },
];

export default function Hero2() {
    return (
        <section className="flex gap-14 min-h-[70vh] mx-2 md:mx-20 md:mt-20 md:mb-18">
            {/* Left Half - Image */}
            <div className="hidden md:block flex-1 min-h-[400px]">
                <img
                    src="images/hero2-image.png"
                    alt="Hotel"
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Right Half - Content */}
            <div className="flex-1 py-12 flex flex-col justify-center">
                <h1 className="text-4xl font-bold mb-4">
                    We Help Students Find Their Perfect Home
                </h1>
                <h3 className="text-[#25409C] mb-6 text-xl font-semibold">About Us</h3>
                <p className="mb-4 text-gray-700">
                    Erasmus Life Housing is your go-to hub for finding the perfect home for students, by students. Since 2013, our team has helped tons of students discover their ideal place. We’ve got a wide selection of student-friendly rooms, all built and managed just for you.
                </p>
                <p className="mb-8 text-gray-700">
                    Our ultimate goal is to make Lisbon the number one destination for International Students and Young Workers, and we most surely don’t want that your experience finding accommodation to be a negative point of that experience!
                </p>
                <div className="flex gap-4 flex-wrap">
                    {highlights.map((item) => (
                        <div
                            key={item.label}
                            className="flex items-center bg-[#8DA0E2]/23 text-[#3951A5] rounded-full px-5 py-2 font-medium text-base shadow-sm"
                        >
                            <span className="inline-flex items-center justify-center w-3 h-3 bg-[#25409C] rounded-full text-white mr-2 text-base">
                                {/* Check Icon SVG */}
                                <svg width="10" height="10" fill="none" viewBox="0 0 16 16">
                                    <path
                                        d="M4 8.5l3 3 5-5"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                            {item.label}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
