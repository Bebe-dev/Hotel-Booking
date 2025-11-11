import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
//import { roomsGrid } from "../../../data/roomsGrid";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function ContactInfo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !id) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, "rooms"), where("roomId", "==", Number(id)));
    const unsubscribe = onSnapshot(
      q,
      (snapshot: any) => {
        const roomsData = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(roomsData[0]);
        setRoom(roomsData[0]);
        setLoading(false);
        console.log(loading)
      },
      (error) => {
        console.error(error);
        console.log("Error");
      }
    );
    return () => unsubscribe();
  }, [user]);

  return (
    <div className="py-4">
      <div>
        <Formik
          initialValues={{
            firstName: "",
            Surname: "",
            email: "",
            number: "",
            single: "",
            status: "",
            about: "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            Surname: Yup.string()
              .max(20, "Must be 20 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            number: Yup.number()
              .typeError("That doesn't look like a phone number")
              .positive("A phone number can't start with a minus")
              .required("Required"),
            single: Yup.string().required("Please select one"),
            status: Yup.string().required("Please select one"),
            about: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              //alert(JSON.stringify(values, null, 2));
              navigate("payment", { state: room });
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col gap-4 ">
            <div className="flex gap-4">
              <div className="flex flex-col w-full">
                <label htmlFor="firstName">First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  className="border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm"
                  placeholder="Your  name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col w-full">
                <label htmlFor="Surname">Surname</label>
                <Field
                  name="Surname"
                  type="text"
                  className="border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm"
                  placeholder="Your  Surname"
                />
                <ErrorMessage
                  name="Surname"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email">Email Address</label>
              <Field
                name="email"
                type="email"
                className="border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm "
                placeholder="abcdef@gmail.com"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="number">Telephone number</label>
              <Field
                name="number"
                type="number"
                className="border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm"
                placeholder="+234 80 234 567 34"
              />
              <ErrorMessage
                name="number"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-semibold text-lg">Room Application Form</h1>
              <div className="flex flex-col">
                <label htmlFor="single" className="mb-1">
                  Are you coming alone?
                </label>
                <div className="flex gap-2 items-center">
                  <label htmlFor="yes" className="flex gap-1 items-center">
                    <Field name="single" type="radio" value="yes" />
                    Yes
                  </label>

                  <label htmlFor="no" className="flex gap-1 items-center">
                    <Field name="single" type="radio" value="no" />
                    No
                  </label>
                </div>
                <ErrorMessage
                  name="single"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* STUDY OR WORK */}
              <div>
                <label htmlFor="status" className="mb-1">
                  Do you study or work?
                </label>
                <div className="flex gap-2 items-center">
                  <label htmlFor="status" className="flex gap-1 items-center">
                    <Field name="status" type="radio" value="work" />
                    Work
                  </label>

                  <label htmlFor="status" className="flex gap-1 items-center">
                    <Field name="status" type="radio" value="study" />
                    Study
                  </label>
                </div>
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="about">Tell us about yourself</label>
                <Field
                  name="about"
                  type="text"
                  as="textarea"
                  className="border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm"
                  placeholder="Enter a description..."
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#25409C] rounded-xl text-white p-2 hover:cursor-pointer hover:bg-[#D6DBEC] hover:text-[#25409C] transition"
            >
              Proceed to payment
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
