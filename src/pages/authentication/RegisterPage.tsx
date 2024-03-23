import { Form, Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import TextField from "../../components/fields/TextField";

interface RegisterFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();

  const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be at least 6 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords must match")
      .required("Required"),
    username: Yup.string().required("Required"),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    // Your form submission logic goes here
    console.log("Form values:", values);
    try {
      // Make a POST request using Axios
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        values
      );

      // Handle the response as needed
      console.log("Response:", response.data);
      navigate("/login");
    } catch (error) {
      // Check if the error has a response from the server
      console.log("Error:", error);
    }
  };
  return (
    <div className="pt-40" style={{ paddingLeft: "40%", paddingRight: "40%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <div className="mb-5">
            <TextField
              type="text"
              name="username"
              id="username"
              label="username"
              placeholder="John Smith"
            />
          </div>
          <div className="mb-5">
            <TextField
              type="email"
              name="email"
              id="email"
              label="Email"
              placeholder="johnsmith@example.com"
            />
          </div>
          <div className="mb-5">
            <TextField
              type="password"
              name="password"
              id="password"
              label="Password"
            />
          </div>
          <div className="mb-5">
            <TextField
              type="confirmPassword"
              name="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
            />
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
    </div>
  );
};

export default RegisterPage;
