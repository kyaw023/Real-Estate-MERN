import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Button, Divider, Spinner } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { FormComponent } from "../../components";
import axios from "axios";
import { toast } from "sonner";

const SignUpPage = () => {
  // initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  //   validation for the form
  const validationSchema = yup.object({
    username: yup.string().required("username is required"),
    email: yup.string().email("invalid email").required("email is required"),
    password: yup.string().required("password is required").min(8),
  });

  //   navigate
  const navigate = useNavigate();

  //   handle submit
  const handleSubmit = async (values) => {
    try {
      // send post data to server
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/sign-up`,
        values,
        {
          withCredentials: true,
        }
      );

      // if res status is 200 and go to login page
      if (res.status === 200) {
        navigate("/sign-in");
        toast.success(res.data?.msg);
      }

      // if res status is not 200
    } catch (error) {
      // display error
      console.log(error);

      // display error using toast
      toast.error(error.response.data?.msg);
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen">
      <div className=" border p-4 rounded-lg max-w-">
        <h1 className=" text-xl font-semibold mb-4">Sign Up</h1>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, isSubmitting }) => (
            <div className=" ">
              <Form className=" space-y-3">
                <FormComponent
                  value={values.username}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  type="text"
                  name="username"
                  label="Username"
                  placeholder="Enter your username"
                />
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
                  className=" bg-primary text-slate-100 w-[350px]"
                >
                  {isSubmitting ? (
                    <Spinner color="white" size="sm" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </Form>
            </div>
          )}
        </Formik>

        <p className=" mt-4 text-center ">
          Already have an account?
          <Link className=" text-primary ms-1" to={"/sign-in"}>
            Login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
