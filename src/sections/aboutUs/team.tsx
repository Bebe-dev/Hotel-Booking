const teamMembers = [
  {
    name: "Olivia Rhye",
    role: "Founder & CEO",
    photo: "images/team1.svg",
  },
  {
    name: "Phoenix Baker",
    role: "Engineering Manager",
    photo: "images/team2.svg",
  },
  {
    name: "Lana Steiner",
    role: "Product Manager",
    photo: "images/team3.svg",
  },
  {
    name: "Demi Wilkinson",
    role: "Frontend Developer",
    photo: "images/team4.svg",
  },
  {
    name: "Candice Wu",
    role: "Backend Developer",
    photo: "images/team5.svg",
  },
  {
    name: "Natali Craig",
    role: "Product Designer",
    photo: "images/team6.svg",
  },
  {
    name: "Drew Cano",
    role: "UX Researcher",
    photo: "images/team7.svg",
  },
  {
    name: "Orlando Diggs",
    role: "Customer Success",
    photo: "images/team8.svg",
  },
]
  

export default function Team() {
  return (
    <div className="mx-6 md:mx-20 text-center mb-20">
      <h1 className="text-[#484848] font-bold text-xl">Meet out team</h1>
      <p className="md:w-1/2 mx-auto text-[#A1A7B0] mb-10">
        Our philosophy is simple — hire a team of diverse, passionate people and
        foster a culture that empowers you to do you best work.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:my-20">
        {teamMembers.map((member) => (
            <div className="flex flex-col gap-2 items-center text-center" key={member.name}>
                <img src={member.photo} alt={member.name} />
                <h2 className="font-semibold">{member.name}</h2>
                <p className="text-[#25409C]">{member.role}</p>
            </div>
        ))}
      </div>
    </div>
  );
}
