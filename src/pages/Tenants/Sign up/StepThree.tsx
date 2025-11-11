import { Icon } from "@iconify/react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Mail } from "tabler-icons-react";
import { auth, db } from "../../../firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

type StepThreeProps = {
  formData: {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    nationality: string;
  };
};

export default function StepThree({ formData }: StepThreeProps) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Form data in StepThree:", formData);
  }, [formData]);

  useEffect(() => {
    const createUser = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        if (auth.currentUser) {
          await updateProfile(auth.currentUser, {
            displayName: formData.name,
          });
        }

        await sendEmailVerification(user, {
          url: "https://hotel-booking-jet-six.vercel.app/",
        });
        //alert("Email sent successfully");

        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          email: formData.email,
          name: formData.name,
          phoneNumber: formData.phoneNumber,
          nationality: formData.nationality,
          createdAt: serverTimestamp(),
        });
        alert("SUCCESS");

        console.log("User created successfully", user.email);
      } catch (error) {
        console.log("Error creating user", error);
      }
    };
    createUser();
  }, [formData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      await auth.currentUser?.reload();
      if (auth.currentUser?.emailVerified) {
        clearInterval(interval);
        navigate("/");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="flex min-h-screen text-[#344054]">
      <div className="w-1/2 flex flex-col items-center justify-center text-center py-10">
        <div>
          <p className="text-gray-600">
            Waiting for your email confirmation...
          </p>
          {/* <pre className="bg-gray-100 p-2 rounded mb-4">
            {JSON.stringify(formData, null, 2)}
          </pre> */}
          <Icon
            icon="eos-icons:loading"
            className="w-12 h-12 animate-spin text-[#344054] mb-4"
          />
        </div>
        <div className="flex gap-6 justify-around items-center text-sm mt-2">
          <p>&copy; ErasmusLifeHousing</p>
          <a
            href="mailto:help@erasmuslifeousing.com"
            className="flex items-center gap-2  hover:underline mt-2"
          >
            <Mail size={22} strokeWidth={1.5} color={"black"} />
            help@erasmuslifeousing.com
          </a>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2">
        <img
          src="images/signup3.svg"
          alt="Sign up image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
