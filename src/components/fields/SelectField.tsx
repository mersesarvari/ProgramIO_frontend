import { ErrorMessage, Field } from "formik";

export type SelectFieldProps = {
  name: string;
  id?: string;
  placeholder?: string;
  label?: string;
  options: string[];
};

const SelectField: React.FC<SelectFieldProps> = ({
  name = "",
  id,
  placeholder,
  label,
  options,
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
        placeholder={placeholder ? placeholder : ""}
        as="select"
        id={id ? id : ""}
        name={name ? name : ""}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option}>{option.toString()}</option>
        ))}
      </Field>
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

export default SelectField;
