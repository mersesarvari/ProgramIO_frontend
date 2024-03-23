import { ErrorMessage, Field } from "formik";

export type TextFieldProps = {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  size?: number;
};

const DatePickerField: React.FC<TextFieldProps> = ({
  name,
  id,
  label,
  size,
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
      <Field name={name ? name : ""} id={id ? id : ""}>
        {/* @ts-expect-error this is a common type error*/}
        {({ field }) => (
          <div>
            <textarea
              {...field}
              rows={size ? size : 4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
              placeholder={placeholder ? placeholder : ""}
            ></textarea>
          </div>
        )}
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

export default DatePickerField;
