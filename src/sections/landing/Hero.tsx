import { Formik, Form, Field } from "formik";
import { StackPush } from "tabler-icons-react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const locations = [
  { value: "", label: "Location" },
  { value: "lagos", label: "Lagos" },
  { value: "abuja", label: "Abuja" },
  { value: "ibadan", label: "Ibadan" },
];

const budgets = [
  { value: "", label: "Budget" },
  { value: "100-300", label: "$100 - $300" },
  { value: "301-600", label: "$301 - $600" },
  { value: "601-1000", label: "$601 - $1000" },
];

const HeroSchema = Yup.object().shape({
  location: Yup.string().required("Location is required"),
  budget: Yup.string().required("Budget is required"),
  checkIn: Yup.date().required("Check-in date is required"),
});

export default function Hero() {

  const navigate = useNavigate();
  return (
    <section className="relative md:flex min-h-[80vh] items-stretch">
      {/* Left Half */}
      <div className="flex-1 px-8 pl-16 pt-12 pb-28 flex flex-col justify-center">
        <h1 className="text-4xl text-[#25409C] md:text-5xl font-bold mb-4">
          Find your future
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          dream accommodation
        </h1>
        <p className="text-base text-gray-600 mb-8 w-3/4">
          Want to find an accommodation? We are ready to help you find one that
          suits your lifestyle and needs.
        </p>
        <div className="flex justify-between mb-8">
          <div>
            <span className="font-semibold text-2xl">4235+</span>
            <div className="text-gray-400">Rooms</div>
          </div>
          <div>
            <span className="font-semibold text-2xl">535+</span>
            <div className="text-gray-400">Reservation</div>
          </div>
          <div>
            <span className="font-semibold text-2xl">19905+</span>
            <div className="text-gray-400">Students</div>
          </div>
        </div>
      </div>

      {/* Right Half */}
      <div className="flex-1 relative flex items-center justify-center">
        <img
          src="images/hero-image.svg"
          alt="Dream Accommodation"
          className="w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </div>

      {/* Search Form */}
      <div className="md:absolute md:left-1/2 md:bottom-8 md:-translate-x-1/2 w-[80%] bg-white rounded-2xl shadow-xl px-4 py-4 z-10 rounded-md border border-gray-300">
        <div className="flex items-center justify-between">
          <p className="font-semibold">Search for available rooms</p>
          <StackPush />
        </div>

        <Formik
          initialValues={{
            location: "",
            budget: "",
            checkIn: "",
          }}
          validationSchema={HeroSchema}
          onSubmit={(values) => {
            const query = new URLSearchParams(values).toString();
            navigate(`/listings?${query}`)
            //alert(JSON.stringify(values, null, 2));
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex gap-6 items-center flex-wrap ">
              {/* Location */}
              <div className="flex-1 min-w-[180px]">
                <Field
                  as="select"
                  name="location"
                  className="w-full p-3 rounded-md border border-gray-300"
                >
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </Field>
                {errors.location && touched.location && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.location}
                  </div>
                )}
              </div>
              {/* Budget */}
              <div className="flex-1 min-w-[180px]">
                <Field
                  as="select"
                  name="budget"
                  className="w-full p-3 rounded-md border border-gray-300"
                >
                  {budgets.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </Field>
                {errors.budget && touched.budget && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.budget}
                  </div>
                )}
              </div>
              {/* Check-in */}
              <div className="flex-1 min-w-[180px]">
                <Field
                  name="checkIn"
                  type="date"
                  className="w-full p-3 rounded-md border border-gray-300"
                />
                {errors.checkIn && touched.checkIn && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.checkIn}
                  </div>
                )}
              </div>
              {/* Search Button */}
              <button
                type="submit"
                className="px-8 py-3 bg-blue-600 text-white rounded-md font-semibold min-w-[120px] hover:bg-blue-700 transition"
              >
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}
