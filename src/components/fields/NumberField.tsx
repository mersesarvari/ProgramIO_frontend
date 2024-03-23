import { ErrorMessage, Field } from "formik";

export type NumberFieldProps = {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
};

const NumberField: React.FC<NumberFieldProps> = ({
  name = "",
  id,
  label,
  placeholder,
}) => {
  return (
    <div className="md-5">
      {label ? (
        <label
          htmlFor={id ? id : ""}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      ) : null}
      <Field
        type="number"
        placeholder={placeholder ? placeholder : "null"}
        id={id ? id : ""}
        name={name ? name : ""}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      {name ? (
        <ErrorMessage
          name={name ? name : ""}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      ) : null}
    </div>
  );
};

export default NumberField;
