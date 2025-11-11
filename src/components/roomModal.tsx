import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdOutlineFileUpload } from "react-icons/md";
import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import PriceSection from "./PriceSection";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const amenities = [
  "Single Bed",
  "Balcony",
  "Desk",
  "Furnished",
  "Unfurnished",
  "Lock",
  "Wardrobe",
  "Double bed",
  "Mirror",
  "Twin bed",
  "Window",
  "Heating",
];

const suitableForOptions = [
  "Males",
  "Professionals",
  "Students",
  "Pets",
  "Females",
  "Smokers",
  "Overnight Guests",
  "Couples",
];

const landlordRules = [
  "No Smoking",
  "No Pets",
  "No Overnight Guests",
  "No Parties",
  "Maintain Cleanliness",
  "Respect Quiet Hours",
];

interface RoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  existingRoom?: any;
  mode: "add" | "edit";
}

export default function RoomModal({
  isOpen,
  onClose,
  user,
  existingRoom,
  mode,
}: RoomModalProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const uploadImage = async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const fileName = `rooms/${user.uid}/${timestamp}_${file.name}`;

    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  async function generateUniqueId() {
    let unique = false;
    let roomId;

    while (!unique) {
      roomId = Math.floor(1000 + Math.random() * 9000);
      const q = query(collection(db, "rooms"), where("roomId", "==", roomId));
      const snapshot = await getDocs(q);
      if (snapshot.empty) unique = true;
    }

    return roomId;
  }

  const initialValues = existingRoom || {
    title: "",
    propertyTitle: "",
    pricingMode: "fixed",
    pricePerMonth: "",
    monthlyPrices: [
      { month: "Jan", price: "" },
      { month: "Feb", price: "" },
      { month: "Mar", price: "" },
      { month: "Apr", price: "" },
      { month: "May", price: "" },
      { month: "Jun", price: "" },
      { month: "Jul", price: "" },
      { month: "Aug", price: "" },
      { month: "Sep", price: "" },
      { month: "Oct", price: "" },
      { month: "Nov", price: "" },
      { month: "Dec", price: "" },
    ],
    deposit: "",
    apartment: "",
    location: "",
    description: "",
    minimumStay: "",
    amenities: [],
    suitableFor: [],
    rules: [],
    image: null,
  };

  const validationSchema = Yup.object({
    propertyTitle: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    deposit: Yup.number().required("Required"),
    apartment: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    minimumStay: Yup.string().required("Required"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!user) {
            alert("Please sign in first");
            return;
          }
          try {
            if (mode === "add") {
              const roomId = await generateUniqueId();

              let imageUrl = "";
              if (image) {
                imageUrl = await uploadImage(image);
              }

              await addDoc(collection(db, "rooms"), {
                landlordUserId: user?.uid,
                landlordName: user?.displayName,
                roomId,
                ...values,
                image: imageUrl,
                amenities: values.amenities,
                rules: values.rules,
                appliedAt: new Date().toLocaleDateString("en-GB"),
              });
              console.log(user)

              //alert("Room added successfully");
            } else if (mode === "edit" && existingRoom.id) {
              await updateDoc(doc(db, "rooms", existingRoom.id), {
                ...values,
                updatedAt: new Date().toLocaleDateString("en-GB"),
              });
              alert("Room updated successfully");
            }
            resetForm();
            onClose();
          } catch (error) {
            console.error(error);
            alert("Error adding room");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div>
          <Modal
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            size={"5xl"}
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader textColor="#25409C" fontSize="2xl" fontWeight="bold">
                {mode === "add" ? "Add Room" : "Edit Room"}
              </ModalHeader>
              <ModalBody>
                <Form className="flex justify-between gap-6">
                  {/* LEFT SIDE */}
                  <div className="flex flex-col justify-between pb-10">
                    <div>
                      <p>Upload Room Photos</p>
                      <div
                        className={`relative border-2 border-dashed rounded-lg h-32 flex flex-col justify-center items-center cursor-pointer ${
                          image ? "border-blue-500" : "border-[#D0D5DD]"
                        }`}
                      >
                        {preview ? (
                          <img
                            src={preview}
                            alt="preview"
                            className="absolute w-full h-full rounded-lg"
                          />
                        ) : (
                          <>
                            <MdOutlineFileUpload size={24} />
                            <p className="text-sm">Drag and Drop here</p>
                            <p className="text-sm text-[#9E9E9E]">or</p>
                            <p className="text-sm text-[#25409C] font-semibold">
                              Browse Files
                            </p>
                          </>
                        )}

                        <input
                          type="file"
                          onChange={handleFileChange}
                          className="absolute w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <PriceSection />
                    </div>
                  </div>
                  {/* RIGHT SIDE */}
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="propertyTitle">Property Title</label>
                      <Field
                        name="propertyTitle"
                        type="text"
                        className="border border-2 border-[#D0D5DD] rounded-md  "
                      />
                      <ErrorMessage
                        name="propertyTitle"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="apartment">Apartment</label>
                      <Field
                        name="apartment"
                        type="text"
                        className="border border-2 border-[#D0D5DD] rounded-md  "
                      />
                      <ErrorMessage
                        name="apartment"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="location">Location</label>
                      <Field
                        name="location"
                        type="text"
                        className="border border-2 border-[#D0D5DD] rounded-md  "
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="minimumStay">Minimum Stay</label>
                      <Field
                        name="minimumStay"
                        type="text"
                        className="border border-2 border-[#D0D5DD] rounded-md  "
                      />
                      <ErrorMessage
                        name="minimumStay"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="description">Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        type="text"
                        className="border border-2 border-[#D0D5DD] rounded-md  "
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>

                    <div className="flex gap-2">
                      <div>
                        <label htmlFor="roomNumber">Number of Rooms</label>
                        <Field
                          name="roomNumber"
                          type="number"
                          className="border border-2 border-[#D0D5DD] rounded-md  "
                        />
                        <ErrorMessage
                          name="roomNumber"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label htmlFor="bathroomNumber">Number of bathrooms</label>
                        <Field
                          name="bathroomNumber"
                          type="number"
                          className="border border-2 border-[#D0D5DD] rounded-md  "
                        />
                        <ErrorMessage
                          name="bathroomNumber"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>

                      <div>
                        <label htmlFor="squareArea">Square Area</label>
                        <Field
                      
                          name="squareArea"
                          type="number"
                          className="border border-2 border-[#D0D5DD] rounded-md  "
                        />
                        <ErrorMessage
                          name="squareArea"
                          component="div"
                          className="text-red-500 text-xs mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold" htmlFor="amenities">
                        Amenities
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenities.map((amenity) => (
                          <div key={amenity}>
                            <label htmlFor={amenity}>
                              <Field
                                name="amenities"
                                type="checkbox"
                                value={amenity}
                              />{" "}
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold" htmlFor="suitableFor">
                        Suitable For
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {suitableForOptions.map((option) => (
                          <div key={option}>
                            <label htmlFor={option}>
                              <Field
                                name={option}
                                type="checkbox"
                                value={option}
                              />{" "}
                              {option}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="font-semibold" htmlFor="rules">
                        Landlord Rules
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {landlordRules.map((rule) => (
                          <div key={rule}>
                            <label htmlFor={rule}>
                              <Field
                                name="rules"
                                type="checkbox"
                                value={rule}
                              />{" "}
                              {rule}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        //disabled={isSubmitting}
                        className=" bg-[#25409C] text-white text-sm py-2 px-6 rounded-xl hover:cursor-pointer"
                      >
                        {mode === "add" ? "Add" : "Update"}
                      </button>
                    </div>
                  </div>
                </Form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </Formik>
    </div>
  );
}
