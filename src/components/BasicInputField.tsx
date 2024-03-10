import { Field } from "formik";

type BasicInputFieldProps = {
  label?: string;
  type?: string;
  id?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
};

const BasicInputField: React.FC<BasicInputFieldProps> = ({
  label,
  type,
  id,
  required,
  placeholder,
  name,
}) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your email
      </label>
      <Field
        type={type}
        id={id}
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        required={required}
        name={name}
      />
    </>
  );
};

export default BasicInputField;
