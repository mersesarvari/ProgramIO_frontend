import * as Yup from "yup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../features/auth/authAPISlice";
import Cookies from "js-cookie";
import { ToggleSwitch } from "flowbite-react";
import TextField from "../../components/fields/TextField";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [isRemember, setRemember] = useState(false);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const user = await login({
        email: values.email,
        password: values.password,
      }).unwrap();
      console.log("User logged in:", user);
      //Remember the user
      if (isRemember) {
        Cookies.set("user", JSON.stringify(user));
      }
      //Dont remember the user
      else {
        console.log("Dispatch called:, ", user);
        dispatch(setCredentials({ ...user }));
      }
      navigate("/home");

      //navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div
        className="pt-40"
        style={{ paddingLeft: "40%", paddingRight: "40%" }}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="mb-5">
              <TextField
                name="email"
                id="email"
                placeholder="email"
                label="Email"
              />
            </div>
            <div className="mb-5">
              <TextField
                name="password"
                id="password"
                placeholder="password"
                label="Password"
                type="password"
              />
            </div>
            <div className="mb-5">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <ToggleSwitch
                    checked={isRemember}
                    label="Remember my account"
                    onChange={() => {
                      setRemember(!isRemember);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mb-5">
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Forgot password
              </label>
            </div>
            <button
              type="submit"
              style={{ width: "100%" }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default LoginPage;
