import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { auth, db } from "../../firebase";
import { Link, useNavigate } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export default function LandlordLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex gap-10 w-full max-w-8xl mx-auto">
      <div className="hidden md:block h-screen w-1/2 bg-cover bg-center bg-[url(/images/login.png)]" />
      <div className="p-4 md:w-1/2 flex flex-col gap-2 items-center justify-center ">
        <img src="/images/logo.svg" alt="Logo" />
        <h2 className="mb-2 text-2xl text-[#25409C] font-bold">Log in</h2>
        <p className="text-gray-600 mb-6">
          Welcome back! Please enter your details.
        </p>

        {/* FORM */}
        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
            remember: Yup.boolean(),
          })}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            // Handle login logic here
            setLoading(true);
            try {
              await setPersistence(
                auth,
                values.remember
                  ? browserLocalPersistence
                  : browserSessionPersistence
              );

              const userCredential = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
              );

              const user = userCredential.user;

              const userDoc = await getDoc(doc(db, "users", user.uid));

              const userData = userDoc.data();

              if (userData?.role !== "landlord") {
                await signOut(auth);
                throw new Error(
                  "Access denied. This login is for landlords only."
                );
              }

              alert(`Login successful! Welcome back ${user.email}`);
              resetForm();
              navigate("/landlords/dashboard");
            } catch (error) {
              alert("Error logging in: " + (error as Error).message);
            } finally {
              setSubmitting(false);
              setLoading(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="w-full max-w-md">
              <div className="mb-4">
                <label htmlFor="email" className="block mb-1 font-medium">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block mb-1 font-medium">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
              <div className="flex justify-between items-center mb-5">
                <label className="flex items-center text-sm">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="mr-2 accent-blue-600"
                  />
                  Remember me for 30 days
                </label>
                <a href="#" className="text-[#25409C] hover:underline text-sm">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-[#25409C] text-white rounded text-base cursor-pointer mb-4 hover:bg-blue-800 transition"
              >
                {loading ? "loading..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="w-1/2 max-w-xs flex gap-3 mb-5">
          <button className="flex-1 py-2 border border-gray-300 rounded bg-white cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={24} />
          </button>
          <button className="flex-1 py-2 border border-gray-300 rounded bg-white cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FaFacebook color="blue" size={24} />
          </button>
        </div>
      
        <div className="text-sm">
          Don't have an account?{" "}
          <Link
            className="text-[#25409C] hover:underline font-medium"
            to="/landlords/signup"
          >
            Sign up
          </Link>
        </div>
        <div className="text-sm mt-8">
          <p>&copy; ErasmusLifeHousing</p>
        </div>
      </div>
    </div>
  );
}
