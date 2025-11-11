import { Formik, Form, Field, ErrorMessage } from "formik";
import { Mail } from "tabler-icons-react";
import * as Yup from "yup";


interface FormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

type Step1 = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (values: FormValues) => void;
};


const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
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
});

export default function StepOne({ onNext }: Step1) {
  const handleSubmit = async (values: FormValues, { setSubmitting }: any) => {
    // try {

    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     values.email,
    //     values.password
    //   );
      
    //   if (auth.currentUser) {
    //     await updateProfile(auth.currentUser, {
    //       displayName: values.name
    //     })
        
    //   }
    //   const user = userCredential.user;
    //   //alert("Creating user successful");

    //   await sendEmailVerification(user, {
    //     url: 'http://localhost:5173/' // Redirect URL after email verification
    //   });
    //   // alert(
    //   //   `Verification email sent to ${user.email}. Please check your inbox.`
    //   // );

    //   // Store user in Firestore
    //   await setDoc(doc(db, "users", user.uid), {
    //     email: values.email,
    //     uid: user.uid,
    //     createdAt: serverTimestamp(),
    //   }).catch((err) => {
    //     console.error("Firestore error:", err);
    //     throw err; // rethrow so catch block handles it
    //   });

    //   //alert(`Sign-up successful! Welcome ${user.email}`);

    //   // You can handle user or call onNext here if needed
    // } catch (error) {
    //   // Handle error if needed
    //   alert("Error signing up: " + (error as Error).message);
    // } finally {
      onNext(values);
      setSubmitting(false);
    //}
  };

  return (
    <div className="flex min-h-screen text-[#344054] items-start">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center mt-12">
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl text-[#25409C] font-semibold mb-6">Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-8">
                <div>
                  <label htmlFor="name" className="block mb-2 text-[#344054]">
                    Name*
                  </label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    // value={formData.name}
                    // onChange={handleChange}
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
                    // value={formData.email}
                    // onChange={handleChange}
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
                  <label
                    htmlFor="password"
                    className="block mb-2 text-[#344054]"
                  >
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-3 bg-[#25409C] text-white rounded font-semibold hover:bg-blue-700 transition-colors mt-2 disabled:opacity-50"
                >
                  Create Account
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
            <a
              href="/login"
              className="text-[#25409C] font-bold hover:underline"
            >
              Log in
            </a>
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
      </div>
      {/* Right: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="images/signup1.svg"
          alt="Sign up image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
