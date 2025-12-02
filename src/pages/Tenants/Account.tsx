import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useEffect, useMemo, useState } from "react";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import {
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { Switch } from "@chakra-ui/react";

export default function Account() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [accountForm, setAccountForm] = useState<any>({});
  const options = useMemo(() => countryList().getData(), []);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const toggleEdit = (section: string) => {
    setEditSection((prev) => (prev === section ? null : section));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return alert("No user logged in");

    const password = prompt(
      "Please confirm your password to delete your account"
    );
    if (!password) return;

    const credential = EmailAuthProvider.credential(user.email!, password);

    try {
      await reauthenticateWithCredential(user, credential);

      await deleteUser(user);
      await deleteDoc(doc(db, "users", user.uid));
      navigate("/login");
      alert("Account deleted successfully");
    } catch (error) {
      console.error("Error deleting account", error);
      alert("Failed to delete account");
    }
  };

  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const unsubscribe = onSnapshot(
      userRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setAccountForm(docSnap.data());
        }
        setLoading(false);
      },
      (error) => {
        console.log("Error fetching user data", error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountForm((prev: any) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;

  const occupations = ["Study", "Work"];

  return (
    <div className="relative px-2 md:px-20 md:py-15 pb-6 flex justify-between max-w-8xl mx-auto">
      <div>
        <div className="relative w-full text-center flex flex-col gap-3">
          <div
            className={`relative h-52 ${
              image ? "border-blue-500" : "border-[#D0D5DD]"
            }`}
          >
            {preview ? (
              <img
                src={preview}
                width="40%"
                alt="profle-picture"
                className="absolute w-full h-full rounded-lg"
              />
            ) : (
              <img
                src="images/profile-pic.png"
                width="60%"
                alt="profle-picture"
                className="absolute w-full h-full rounded-full"
              />
            )}
          </div>

          <p className="font-bold">{user?.displayName}</p>
          <p className="text-[#6C6C6C] ">{user?.email}</p>
          <button className="relative bg-[#25409C] w-full h-full p-2 text-white rounded-md cursor-pointer">
            Upload Picture
            <input
              type="file"
              onChange={handleImageUpload}
              className="absolute w-full h-full opacity-0 left-0 cursor-pointer"
            />
          </button>
          <div className="flex flex-col gap-2 ">
            <p className="font-bold">Notifications Center</p>
            <div className="pl-[25%] space-y-2">
              <div className="flex gap-2">
                <Switch color="#25409C" />
                <p>SMS</p>
              </div>
              <div className="flex gap-2">
                <Switch style={{ color: "#25409C" }} />
                <p>Email</p>
              </div>
              <div className="flex gap-2">
                <Switch color="#25409C" />
                <p>Phone</p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleDeleteAccount}
          className="absolute bottom-4 bg-[#AA2117] p-2 text-white rounded-md"
        >
          Delete Account
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-3/5">
        <Formik
          enableReinitialize
          initialValues={{
            firstName: accountForm.firstName || "",
            Surname: accountForm.Surname || "",
            gender: accountForm.gender || "",
            email: accountForm.email || "",
            number: accountForm.number || "",
            nationality: accountForm.nationality || "",
            address: accountForm.address || "",
            description: accountForm.description || "",
            occupation: accountForm.occupation || "",
            school: accountForm.school || "",
            funding: accountForm.funding || "",
            about: accountForm.about || "",
            documents1: accountForm.documents1 || "",
            documents2: accountForm.documents2 || "",
          }}
          validationSchema={Yup.object({
            firstName: Yup.string().max(15, "Must be 15 characters or less"),
            //.required("Required"),
            Surname: Yup.string().max(20, "Must be 20 characters or less"),
            //.required("Required"),
            //gender: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address"),
            //.required("Required"),
            number: Yup.number()
              .typeError("That doesn't look like a phone number")
              .positive("A phone number can't start with a minus"),
            //.required("Required"),
            //nationality: Yup.string().required("Select your nationality"),
            //address: Yup.string().required("Required"),
            // single: Yup.string().required("Please select one"),
            // status: Yup.string().required("Please select one"),
            // about: Yup.string().required("Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            if (!user) {
              alert("Please sign in first");
              return;
            }
            try {
              setSaving(true);
              const userRef = doc(db, "users", user.uid);
              await updateDoc(userRef, {
                ...values,
                updatedAt: new Date().toLocaleDateString("en-GB"),
              });
              alert("User details updated");
              setEditSection(null);
            } catch (error) {
              console.error(error);
              alert("Failed to update");
            } finally {
              setSubmitting(false);
              setSaving(false);
            }
          }}

          // {(values, { setSubmitting }) => {
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2));
          //     navigate(`/listings`);
          //     setSubmitting(false);
          //   }, 400);
          // }}
        >
          <Form className="flex flex-col gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-lg">Basic Info</h1>
                <button
                  type="button"
                  onClick={() => toggleEdit("basic")}
                  className={`p-2 px-4  text-white rounded-md ${
                    editSection === "basic" ? "bg-gray-400" : "bg-[#25409C]"
                  }`}
                >
                  {editSection === "basic" ? "Cancel" : "Edit"}
                </button>
              </div>
              <div className="flex justify-between gap-6">
                <div className="flex flex-1 flex-col gap-2 w-1/2">
                  <label htmlFor="firstName">First Name</label>
                  <Field
                    name="firstName"
                    type="text"
                    disabled={editSection !== "basic"}
                    value={accountForm.firstName || ""}
                    onChange={handleChange}
                    className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                      editSection !== "basic"
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder="Your  name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-1 gap-2 flex-col w-1/2">
                  <label htmlFor="Surname">Surname</label>
                  <Field
                    name="Surname"
                    type="text"
                    disabled={editSection !== "basic"}
                    //value={accountForm.name || ""}
                    onChange={handleChange}
                    className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                      editSection !== "basic"
                        ? "bg-gray-100 cursor-not-allowed"
                        : ""
                    }`}
                    placeholder="Your  Surname"
                  />
                  <ErrorMessage
                    name="Surname"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="gender">Gender</label>
                <Field
                  name="gender"
                  type="text"
                  disabled={editSection !== "basic"}
                  value={accountForm.gender || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "basic"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder=""
                />
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  disabled={editSection !== "basic"}
                  value={accountForm.email || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "basic"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="abcdef@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="number">Telephone number</label>
                <Field
                  name="number"
                  type="tel"
                  disabled={editSection !== "basic"}
                  value={accountForm.number || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "basic"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="+234 80 234 567 34"
                />
                <ErrorMessage
                  name="number"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label>Nationality</label>
                <Select
                  options={options}
                  placeholder="Select your country"
                  isDisabled={editSection !== "basic"}
                  //value={accountForm.nationality || ""}
                  value={options.find(
                    (option) => option.label === accountForm.nationality
                  )}
                  onChange={(option) =>
                    setAccountForm((prev: any) => ({
                      ...prev,
                      nationality: option?.label || "",
                    }))
                  }
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "basic"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="address">Current Address</label>
                <Field
                  name="address"
                  type="text"
                  disabled={editSection !== "basic"}
                  value={accountForm.address || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "basic"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Enter your current address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            {/* BOOKING REQUEST MESSAGE */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-lg">Booking Request Message</h1>
                <button
                  type="button"
                  onClick={() => toggleEdit("request")}
                  className={`p-2 px-4 text-white rounded-md ${
                    editSection === "request" ? "bg-gray-400" : "bg-[#25409C]"
                  }`}
                >
                  {editSection === "request" ? "Cancel" : "Edit"}
                </button>
              </div>
              <Field
                name="description"
                as="textarea"
                type="text"
                disabled={editSection !== "request"}
                value={accountForm.description || ""}
                onChange={handleChange}
                className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm w-full ${
                  editSection !== "request"
                    ? "bg-gray-100 cursor-not-allowed"
                    : ""
                }`}
                placeholder="Enter a decription..."
              />
            </div>

            {/* ADDITIONAL DETAILS & DOCUMENTS */}
            <div className=" flex flex-col gap-6">
              <div className="flex justify-between items-center mb-2">
                <h1 className="font-bold text-lg">
                  Additional Details & Documents
                </h1>
                <button
                  type="button"
                  onClick={() => toggleEdit("additional")}
                  className={`p-2 px-4 text-white rounded-md ${
                    editSection === "additional"
                      ? "bg-gray-400"
                      : "bg-[#25409C]"
                  }`}
                >
                  {editSection === "additional" ? "Cancel" : "Edit"}
                </button>
              </div>

              <div className="flex flex-col gap-2">
                <label>Do You Study or Work</label>
                <Field
                  as="select"
                  name="occupation"
                  className={`border-2 w-full border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  value={accountForm.occupation}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setAccountForm((prev: any) => ({
                      ...prev,
                      occupation: e.target.value,
                    }))
                  }
                >
                  <option value="">Study or Work</option>
                  {occupations.map((occupation) => (
                    <option key={occupation} value={occupation}>
                      {occupation}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="school">Where are you Studying?</label>
                <Field
                  name="school"
                  type="text"
                  disabled={editSection !== "additional"}
                  value={accountForm.school || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder=""
                />
                <ErrorMessage
                  name="school"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="funding">How will you fund your stay</label>
                <Field
                  name="funding"
                  type="text"
                  disabled={editSection !== "additional"}
                  value={accountForm.funding || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder=""
                />
                <ErrorMessage
                  name="funding"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="about">Tell Us About Yourself</label>
                <Field
                  name="about"
                  type="text"
                  as="textarea"
                  disabled={editSection !== "additional"}
                  value={accountForm.about || ""}
                  onChange={handleChange}
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                  placeholder="Tell us about yourself"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="documents">Documents (Password/ID Card</label>
                <Field
                  name="documents1"
                  type="file"
                  disabled={editSection !== "additional"}
                  value={accountForm.documents1 || ""}
                  onChange={handleChange}
                  placeholder="Upload File"
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
                <Field
                  name="documents2"
                  type="file"
                  disabled={editSection !== "additional"}
                  value={accountForm.documents2 || ""}
                  onChange={handleChange}
                  placeholder="Upload File"
                  className={`border-2 border-[#D0D5DD] rounded-md p-2 placeholder-[#667085] text-sm ${
                    editSection !== "additional"
                      ? "bg-gray-100 cursor-not-allowed"
                      : ""
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!editSection}
              className={`bg-[#25409C] rounded-xl text-white p-2 transition ${
                !editSection
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-[#D6DBEC] hover:text-[#25409C]"
              }`}
            >
              {saving ? "Saving..." : "Update"}
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
