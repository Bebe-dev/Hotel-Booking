//import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router";
//import { db } from "../../firebase";

export default function Cancellation() {

  const navigate = useNavigate();

  return (
    <div className="mt-2">
      <p className="mb-4">
        By selecting the button below, I agree to the Erasmus Life Housing
        rules, booking and refund rules
      </p>
      <p>
        I also agree to the{" "}
        <a href="#" className="text-[#25409C]">
          updated Terms of service,{" "}
        </a>{" "}
        <a href="#" className="text-[#25409C]">
          Payment Terms of Service,{" "}
        </a>{" "}
        and I acknowledge{" "}
        <a href="#" className="text-[#25409C]">
          Privacy Policy
        </a>
      </p>
      <button
        type="submit"
        onClick={() => navigate("/roomApplication")}
        className="bg-[#25409C] rounded-xl text-white p-2 my-3 hover:cursor-pointer hover:bg-[#D6DBEC] hover:text-[#25409C] transition"
      >
        Confirm and Book
      </button>
    </div>
  );
}
