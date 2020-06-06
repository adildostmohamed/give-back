import React from "react";
import { useField } from "formik";

export interface IOptionFieldProps {
  id: string;
  name: string;
  label: string;
  type: "checkbox" | "radio";
  value: string;
}

const OptionField = (props: IOptionFieldProps) => {
  const { id, name, label, type, value } = props;
  const [field] = useField(props);
  return (
    <div>
      <input
        {...field}
        id={id}
        value={value}
        name={name}
        type={type}
        checked={field.checked}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default OptionField;
