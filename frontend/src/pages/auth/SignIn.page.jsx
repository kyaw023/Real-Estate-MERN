import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Button, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import {
  FormComponent,
  GitHubAuthComponent,
  GoogleAuthComponent,
} from "../../components";
import axios from "axios";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";
import {
  setError,
  setLoading,
  setLoginSuccess,
} from "../../slice/userSlice.js";
const SignInPage = () => {
  // initial values
  const initialValues = {
    email: "",
    password: "",
  };

  //   validation for the form
  const validationSchema = yup.object({
    email: yup.string().email("invalid email").required("email is required"),
    password: yup.string().required("password is required").min(8),
  });

  //   navigate
  const navigate = useNavigate();

  //   dispatch
  const dispatch = useDispatch();

  //   selector
  const { isLoading, isError } = useSelector((state) => state.user);

  //   handle submit
  const handleSubmit = async (values) => {
    try {
      // display loading
      dispatch(setLoading());

      // send post data to server
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/sign-in`,
        values,
        {
          withCredentials: true,
        }
      );

      // if res status is 200 and go to login page
      if (res.status === 200) {
        dispatch(setLoginSuccess(res.data?.user));
        navigate("/");
        toast.success(res.data?.msg);
      }

      // if res status is not 200
    } catch (error) {
      // display error
      console.log(error);
      // display error using toast
      toast.error(error?.response?.data?.msg);

      // dispatch error
      dispatch(setError(error?.response?.data?.msg));
    }
  };
  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" border p-4 rounded-lg max-w-sm">
        <h1 className=" text-xl font-semibold mb-4">Login</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, isSubmitting }) => (
            <div className=" ">
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
                  value={values.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                />

                <Button
                  type="submit"
                  className=" bg-primary text-slate-100 w-full"
                >
                  {isSubmitting && isLoading ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Login"
                  )}
                </Button>
                <GoogleAuthComponent />
                <GitHubAuthComponent />
              </Form>
            </div>
          )}
        </Formik>

        <p className=" mt-4 text-center ">
          Don't have an account?
          <Link className=" text-primary ms-1" to={"/sign-up"}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
