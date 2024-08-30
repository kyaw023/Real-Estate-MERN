import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  FormComponent,
  FormFieldsComponent,
  ImageUploadComponent,
  LoadingComponent,
} from "../../components";
import {
  Button,
  Checkbox,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";

import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import SelectFieldsComponent from "../../components/listing/SelectFields.component";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const CreateListingPage = () => {
  const {
    user: { currentUser },
  } = useSelector((state) => state.user);

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    regularPrice: "",
    discountPrice: "",
    images: [],
    address: "",
    bathrooms: 0,
    bedrooms: 0,
    parking: false,
    furnished: false,
    propertyType: "",
    offer: false,
    listingStatus: "",
    transactionType: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(5, "Title must be at least 5 characters long")
      .max(100, "Title cannot exceed 100 characters")
      .required("Title is required"),
    description: Yup.string()
      .min(20, "Description must be at least 20 characters long")
      .required("Description is required"),
    regularPrice: Yup.number()
      .min(0, "Regular price must be a positive number")
      .required("Regular price is required"),
    discountPrice: Yup.number()
      .min(0, "Discount price must be a positive number")
      .lessThan(
        Yup.ref("regularPrice"),
        "Discount price must be less than regular price"
      )
      .required("Discount price is required"),
    images: Yup.array()
      .min(1, "At least one image is required")
      .max(7, "Cannot upload more than 5 images")
      .required("Images are required"),
    address: Yup.string().required("Address is required"),
    bathrooms: Yup.number()
      .min(0, "Bathrooms must be a positive number or zero")
      .required("Number of bathrooms is required"),
    bedrooms: Yup.number()
      .min(0, "Bedrooms must be a positive number or zero")
      .required("Number of bedrooms is required"),
    propertyType: Yup.string().required("Property type is required"),
    offer: Yup.boolean(),
    listingStatus: Yup.string().required("Listing status is required"),
  });

  const [progress, setProgress] = useState(0);
  const [previousImages, setPreviousImages] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  const id = location?.state?.id;

  useEffect(() => {
    if (id) {
      const getSingleListing = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/listing/read/${id}`,
            {
              withCredentials: true,
            }
          );

          const data = res.data?.data;

          setInitialValues({
            title: data?.title || "",
            description: data?.description || "",
            regularPrice: data?.regularPrice || "",
            discountPrice: data?.discountPrice || "",
            address: data?.address || "",
            bathrooms: data?.bathrooms || 0,
            bedrooms: data?.bedrooms || 0,
            parking: data?.parking || false,
            furnished: data?.furnished || false,
            propertyType: data?.propertyType || "",
            offer: data?.offer || false,
            listingStatus: data?.listingStatus || "",
            transactionType: data?.transactionType || "",
            images: data?.images || [],
          });

          setPreviousImages(data?.images || []);
          setIsLoading(false);
        } catch (error) {
          setIsError(true);
          setIsLoading(false);
          console.log(error);
        }
      };
      getSingleListing();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const newImages = values.images.filter((image) => image instanceof File);
    const imageUploadPromises = newImages.map((image) => {
      const storage = getStorage(app);
      const storageRef = ref(
        storage,
        `images/${image.name || `image_${Date.now()}`}`
      );
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(progress));
          },
          (error) => {
            console.error("Error uploading image:", error);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          }
        );
      });
    });

    try {
      const imageUrls = await Promise.all(imageUploadPromises);

      const allImageUrls = [
        ...values.images.filter((image) => typeof image === "string"), // existing image URLs
        ...imageUrls,
      ];

      if (id) {
        const response = await axios.patch(
          `${import.meta.env.VITE_BASE_URL}/api/listing/update/${id}/${
            currentUser?._id
          }`,
          { ...values, images: allImageUrls, user: currentUser?._id },
          {
            withCredentials: true,
          }
        );
        if (response.data.success === true) {
          navigate("/");
          toast.success("Listing updated successfully");
        }
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/listing/create`,
          { ...values, images: allImageUrls, user: currentUser?._id },
          {
            withCredentials: true,
          }
        );

        if (response.data.success === true) {
          navigate("/");
          toast.success("Listing created successfully");
        }
      }

      resetForm();
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error(error?.response?.data?.msg || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePreviousImages = async (index) => {
    try {
      if (id) {
        const imageToDelete = previousImages[index];

        const storage = getStorage(app);
        const storageRef = ref(storage, imageToDelete);
        await deleteObject(storageRef);

        // Delete the image from the database
        const response = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/listing/delete/image/${id}/${
            currentUser?._id
          }/${index}`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success === true) {
          toast.success("Image deleted successfully");
        }
      }
      // Remove the image from the array
      setPreviousImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error(error?.response?.data?.msg || error.message);
    }
  };
  return (
    <LoadingComponent>
      <div className="">
        <h1 className=" text-lg md:text-2xl font-semibold my-2 ">
          {id ? "Edit Listing" : "Create Listing"}
        </h1>
        <div className="">
          <div className=" border border-dashed border-gray-200 rounded-lg p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({
                values,
                handleBlur,
                handleChange,
                setFieldValue,
                isSubmitting,
              }) => {
                const handleFileChange = (e) => {
                  setFieldValue("images", Array.from(e.target.files));
                  const files = Array.from(e.target.files);
                  setFieldValue("images", files);

                  if (files.length + previousImages.length > 7) {
                    toast.error("You can only upload up to 7 images");
                    return;
                  }

                  setFieldValue("images", files);

                  const previewUrls = files.map((file) =>
                    URL.createObjectURL(file)
                  );

                  setPreviousImages((prevImages) => [
                    ...prevImages,
                    ...previewUrls,
                  ]);
                };

                return (
                  <div className="mt-4">
                    <Form className=" ">
                      <FormFieldsComponent
                        values={values}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                      />

                      <SelectFieldsComponent
                        setFieldValue={setFieldValue}
                        values={values}
                      />

                      <ImageUploadComponent
                        previousImages={previousImages}
                        handleDeletePreviousImages={handleDeletePreviousImages}
                        handleFileChange={handleFileChange}
                      />

                      <div className="flex space-x-3 mt-4">
                        <Button
                          type="button"
                          disabled={isSubmitting}
                          onClick={() => navigate("/")}
                          className="bg-primary text-slate-100 w-96"
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-primary text-slate-100 w-96"
                        >
                          {isSubmitting ? (
                            <div>
                              {id ? "Updating..." : "Creating..."}
                              <Spinner color="white" size="sm" />
                            </div>
                          ) : (
                            <p>{id ? "Update" : "Create"}</p>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </LoadingComponent>
  );
};

export default CreateListingPage;
