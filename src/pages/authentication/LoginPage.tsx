import * as Yup from "yup";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useLoginMutation } from "../../app/api/authApi";
import { Checkbox, Label, ToggleSwitch } from "flowbite-react";
import TextField from "../../components/fields/TextField";
import { Link } from "react-router-dom";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { mutateAsync: login } = useLoginMutation();
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
      await login({
        email: values.email,
        password: values.password,
        remember: isRemember,
      });

      //
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
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="agree"
                      onChange={() => setRemember(!isRemember)}
                    />
                    <Label htmlFor="agree" className="flex">
                      Remember me
                    </Label>
                  </div>
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
