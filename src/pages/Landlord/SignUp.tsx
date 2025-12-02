import {
  createUserWithEmailAndPassword,
  //sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import { serverTimestamp } from "firebase/database";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
//import { Mail } from "tabler-icons-react";

interface Values {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  nif: string;
  iban: string;
}

export default function LandlordSIgnUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    nif: "",
    iban: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be at least 8 characters"),
    repeatPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .min(8, "Must be at least 8 characters"),
    nif: Yup.string().required("Required"),
    iban: Yup.string().required("Required"),
  });

  const handleSubmit = async (values: Values, { setSubmitting }: any) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: values.name,
        });
      }

      const user = userCredential.user;
      alert("Creating user successful");

      //   await sendEmailVerification(user, {
      //     url: "http://localhost:5173/",
      //   });

      await setDoc(doc(db, "users", user.uid), {
        email: values.email,
        role: "landlord",
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      navigate("/landlords/dashboard");
    } catch (error) {
      alert("Error signing up: " + (error as Error).message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen max-w-8xl mx-auto">
      <div className="md:w-1/2 flex flex-col ml-8 pb-4 ">
        <h2 className="text-2xl text-[#25409C] font-bold my-6 text-center">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-[#344054]">
                  Name*
                </label>
                <Field
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 text-[#344054]">
                  Email*
                </label>
                <Field
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-[#344054]">
                  Password*
                </label>
                <Field
                  id="password"
                  type="password"
                  name="password"
                  // value={formData.password}
                  // onChange={handleChange}
                  placeholder="Create a password"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label
                  htmlFor="repeatPassword"
                  className="block mb-2 text-[#344054]"
                >
                  Repeat Password*
                </label>
                <Field
                  id="repeatPassword"
                  type="password"
                  name="repeatPassword"
                  placeholder="Repeat Password"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="repeatPassword"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label htmlFor="nif" className="block mb-2 text-[#344054]">
                  NIF*
                </label>
                <Field
                  id="nif"
                  type="text"
                  name="nif"
                  placeholder="XXXXXXXXXX"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="nif"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <div>
                <label htmlFor="iban" className="block mb-2 text-[#344054]">
                  IBAN*
                </label>
                <Field
                  id="iban"
                  type="text"
                  name="iban"
                  placeholder="XXXXXXXXXX"
                  className="p-2 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="iban"
                  component="div"
                  className="text-red-500 text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 bg-[#25409C] text-white rounded font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
              >
                {loading ? "loading..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center my-6">
          <button className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 transition-colors">
            <img src="images/google.svg" alt="Google" className="w-5 h-5" />
            Sign up with Google
          </button>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          {/* <a href="/landlords/login" className="text-[#25409C] font-bold hover:underline">
            Log in
          </a> */}
          <Link to="/landlords/login" className="text-[#25409C] hover:underline">Log in</Link>
        </div>
        {/* <div className="flex gap-6 justify-around items-center text-sm mt-2">
          <p>&copy; ErasmusLifeHousing</p>
          <a
            href="mailto:help@erasmuslifehousing.com"
            className="flex items-center gap-2  hover:underline mt-2"
          >
            <Mail size={22} strokeWidth={1.5} color={"black"} />
            help@erasmuslifeousing.com
          </a>
        </div> */}
      </div>
      <div className="hidden md:block md:w-1/2 bg-cover bg-center bg-[url(/images/signup1.png)]" />
    </div>
  );
}
