import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTiktok,
} from "tabler-icons-react";

export default function Footer() {
  return (
    <div className="pb-20">
      {/* upper footer */}
      <div className="bg-[#25409C] text-white p-8 text-center">
        <h1 className="text-xl mb-4">Have questions or doubts</h1>
        <p className="text-sm mb-4">Don't hesitate to contact us</p>
        <div>
          <input className="px-2 py-1 mr-2 bg-white rounded text-gray-600 text-sm" placeholder="Full Name" />
          <input className="px-2 py-1 mr-2 bg-white rounded text-gray-600 text-sm" placeholder="Enter your question..." />
          <button className="px-4 py-1 bg-[#D6DBEC] rounded text-[#25409C] text-sm">Send</button>
        </div>
      </div>

      {/* LOWER FOOTER */}
      <div className="md:flex p-2 justify-around mt-4 text-gray-600">
        <div className="space-y-4">
          <img src="images/logo.svg" alt="Logo" height={40} />
          <p>FInd your dream accommodation</p>
          <div className="flex gap-4">
            <BrandTiktok size={26} strokeWidth={3} color={"black"} />
            <BrandInstagram size={26} strokeWidth={1} color={"black"} />
            <BrandFacebook size={26} strokeWidth={2} color={"black"} />
            <BrandLinkedin size={26} strokeWidth={2} color={"black"} />
          </div>
        </div>
        {/* NAVIGATION */}
        <div>
          <h1 className="text-blue-800">NAVIGATION</h1>
          <ul className="md:space-y-4 mt-2">
            <li>About Us</li>
            <li>FAQ</li>
            <li>Erasmus Lifa Lisboa</li>
            <li>Apply For Internship</li>
          </ul>
        </div>
        {/* TENANTS */}
        <div>
          <h1 className="text-blue-800">TENANTS</h1>
          <ul className="md:space-y-4 mt-2">
            <li>Video Chat</li>
            <li>Housing Guide</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        {/* RESOURCES */}
        <div>
          <h1 className="text-blue-800">RESOURCES</h1>
          <ul className="md:space-y-4 mt-2">
            <li>Travessa da Cara, 14, 1200-089 Lisbon - Portugal</li>
            <li>+351 932 483 834</li>
            <li>hello@erasmuslifehousing.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
