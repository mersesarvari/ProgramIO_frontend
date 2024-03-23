import { Datepicker } from "flowbite-react";
import { ErrorMessage, Field } from "formik";

export type DatePickerFieldProps = {
  name: string;
  id?: string;
  label?: string;
};

const DatePickerField: React.FC<DatePickerFieldProps> = ({
  name,
  id,
  label,
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
        {({ field, form }) => (
          <Datepicker
            {...field}
            selected={field.value || null}
            onSelectedDateChanged={(selectedDate) =>
              form.setFieldValue(
                name ? name : "",
                selectedDate.toLocaleDateString()
              )
            }
          />
        )}
      </Field>
      {name ? (
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      ) : null}
    </div>
  );
};

export default DatePickerField;
