import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail } from "tabler-icons-react";

const validationSchema = Yup.object({
  phoneNumber: Yup.string()
    .matches(/^\+?\d{10,15}$/, "Enter a valid phone number")
    .required("Phone number is required"),
  nationality: Yup.string().required("Nationality is required"),
});

const initialValues = {
  phoneNumber: "",
  nationality: "",
};

type Step2 = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: (values:any) => void;
};


export default function StepTwo({ formData, handleChange, onNext }:Step2) {
  
  const handleSubmit = (values: any, {setSubmitting}:any) => {
    onNext(values);
    setSubmitting(false);
    //alert(JSON.stringify(values, null, 2));
  }

  return (
    <div className="flex min-h-screen text-[#344054] ">
      {/* Left Side: Form */}
      <div className="w-full md:w-1/2 flex-1 flex flex-col justify-center px-16">
        <h2 className="text-2xl font-semibold mb-6">Just one more step...</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="flex flex-col gap-4">
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <Field
                  type="tel"
                  placeholder="+1234567890"
                  id="phoneNumber"
                  name="phoneNumber"
                  // value={formData.phone}
                  // onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    touched.phoneNumber && errors.phoneNumber
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="phoneNumber" />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="nationality" className="block mb-2 text-sm">
                  Nationality
                </label>
                <Field
                  type="text"
                  placeholder="Enter your nationality"
                  id="nationality"
                  name="nationality"
                  // value={formData.nationality}
                  // onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                    touched.nationality && errors.nationality
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-300 focus:ring-blue-200"
                  }`}
                />
                <div className="text-red-500 text-sm mt-1">
                  <ErrorMessage name="nationality" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Next Step
              </button>
            </Form>
          )}
        </Formik>
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
      {/* Right Side: Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="images/signup2.svg"
          alt="Sign up image"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
