import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { auth } from "../../firebase";
import {
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex min-h-screen font-sans text-[#484848]">
      {/* Left Image */}
      <div
        className="flex-1 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: "url('images/login.png')",
        }}
      />
      {/* Right Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-10">
        <div className="mb-6">
          <img src="images/logo.svg" alt="Logo" />
        </div>

        <h2 className="mb-2 text-2xl text-[#25409C] font-semibold">Log in</h2>

        <p className="text-gray-600 mb-6">
          Welcome back! Please enter your details.
        </p>
        {/* Form */}
        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string().required("Required"),
            remember: Yup.boolean(),
          })}
          onSubmit={async (values, { setSubmitting }) => {
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

              alert(`Login successful! Welcome back ${user.email}`);
              navigate("/");
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
                {loading? "loading...": "Sign in"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Social Login */}
        <div className="w-1/2 max-w-xs flex gap-3 mb-5">
          <button className="flex-1 py-2 border border-gray-300 rounded bg-white cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FcGoogle size={24} />
          </button>
          <button className="flex-1 py-2 border border-gray-300 rounded bg-white cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FaFacebook color="blue" size={24} />
          </button>
        </div>
        {/* Don't have an account */}
        <div className="text-sm">
          Don't have an account?{" "}
          
          <Link
            className="text-[#25409C] hover:underline font-medium"
            to="/signup"
          >
            Sign Up
          </Link>
        </div>
        <div className="text-sm mt-8">
          <p>&copy; ErasmusLifeHousing</p>
        </div>
      </div>
    </div>
  );
}
