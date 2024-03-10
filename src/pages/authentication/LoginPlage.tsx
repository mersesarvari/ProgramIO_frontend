import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
//import axios from "axios";
import api from "../../api";

import Cookies from "js-cookie";

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  //Login method
  const onSubmit = async (values: LoginFormValues) => {
    // Your form submission logic goes here
    console.log("Form values:", values);
    try {
      // Make a POST request using Axios
      const response = await api.post(
        "http://localhost:5000/auth/login",
        values
      );

      // Handle the response as needed
      console.log("Response:", response.data);
    } catch (error) {
      // Check if the error has a response from the server
      if (error.response) {
        // The server responded with a non-2xx status code
        console.error("Error status:", error.response.status);
        console.error("Error message:", error.response.data.message);

        // Display the server's error message or handle it as needed
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
      }
    }
  };

  const TestRefreshToken = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");

      if (!refreshToken) {
        console.error("Refresh token not found.");
        return;
      }

      const response = await api.post(
        "http://localhost:5000/auth/token",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );

      console.log("TestRefreshToken response:", response);
    } catch (error) {
      console.log("TestRefreshToken error:", error);
    }
  };

  const TestAccessToken = async () => {
    try {
      const accessToken = Cookies.get("accessToken");

      if (!accessToken) {
        console.error("Refresh token not found.");
        return;
      }

      const response = await api.post("http://localhost:5000/auth/protected");

      console.log("TestAccessToken response:", response);
    } catch (error) {
      console.log("TestAccessToken error:", error);
    }
  };

  return (
    <>
      <div>Login Page</div>
      <div className="grid grid-cols-12">
        <div className="col-span-4"></div>
        <div className="col-span-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <Field
                  type="email"
                  id="email"
                  placeholder="email@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  name="email" // Add the 'name' attribute
                />
                <ErrorMessage name="email" component="div" />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password" // Add the 'name' attribute
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                <ErrorMessage name="password" component="div" />
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-6">
                  <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <div className="col-span-6">
                  <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Forgot password
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                style={{ width: "100%" }}
              >
                Submit
              </button>
            </Form>
          </Formik>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => TestRefreshToken()}
          >
            TestRefreshToken
          </button>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            style={{ width: "100%", marginTop: "20px" }}
            onClick={() => TestAccessToken()}
          >
            TestAccessToken
          </button>
        </div>
        <div className="col-span-4"></div>
      </div>
    </>
  );
};

export default LoginPage;
