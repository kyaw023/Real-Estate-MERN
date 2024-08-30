import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Avatar, Button, Input, Progress, Spinner } from "@nextui-org/react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import { toast } from "sonner";
import { FormComponent } from "../../components";
import { CameraIcon } from "../../components/ui/CameraIcon";
import axios from "axios";
import { setError, setUpdateSuccess } from "../../slice/userSlice";
import { useNavigate } from "react-router-dom";

const EditProfilePage = () => {
  const {
    user: { currentUser, isLoading, isError },
  } = useSelector((state) => state.user);

  const inputRef = useRef(null);
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload();
    }
  }, [file]);

  const initialValues = {
    username: currentUser?.username || "",
    email: currentUser?.email || "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    username: yup.string().required("Username is required"),
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    const storage = getStorage(app);
    const storageRef = ref(storage, `${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.round(progress));
      },
      (error) => {
        setUploadError(error.message);
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setAvatar(url);
          toast.success("Photo uploaded successfully");
          setProgress(0);
        } catch (error) {
          setUploadError(error.message);
        }
      }
    );
  };

  const handleSubmit = async (values) => {
    try {
      // dispatch(updateUserLoading());

      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/update/${currentUser?._id}`,
        {
          ...values,
          avatar,
        },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setUpdateSuccess(res.data?.user));
        toast.success(res.data?.msg);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error.response.data?.message));
      toast.error(error.response.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-950 border dark:border-slate-700 p-6 rounded-lg">
        <div className="mb-4 flex items-center space-x-2 relative">
          <div>
            <Avatar isBordered color="primary" src={avatar} size="lg" />
            {progress > 0 && (
              <Progress
                radius="full"
                aria-label="Uploading..."
                size="sm"
                value={progress}
                color="success"
                showValueLabel={true}
                className=" w-[200px] mt-4"
              />
            )}
            {uploadError && <p className="text-red-500 mt-2">{uploadError}</p>}
          </div>
          <div className="">
            <Input
              accept="image/*"
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              isIconOnly
              size="sm"
              color="warning"
              variant="faded"
              aria-label="Take a photo"
              className="absolute -top-3 left-10"
              onClick={() => inputRef.current && inputRef.current.click()}
            >
              <CameraIcon />
            </Button>
          </div>
        </div>
        <p className="text-sm my-3 dark:text-slate-300">
          The photo will be used for your profile and will be visible to other
          users of the platform.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, isSubmitting }) => (
            <Form className=" space-y-3">
              <FormComponent
                value={values.email}
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="email"
                name="email"
                label="Email"
                placeholder="Enter your email"
              />
              <FormComponent
                value={values.username}
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="text"
                name="username"
                label="Username"
                placeholder="Enter your username"
              />
              <div className="flex items-center space-x-3 col-span-2">
                <Button
                  onClick={() => navigate("/profile")}
                  type="button"
                  color="primary"
                  variant="bordered"
                  className="w-full"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-slate-100 w-full"
                >
                  {isSubmitting ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfilePage;
