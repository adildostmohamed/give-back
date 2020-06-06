import React from "react";
import { Input } from "antd";
import { useField } from "formik";

interface IInputFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
}

const InputField = (props: IInputFieldProps) => {
  const { id, label } = props;
  const [field, meta] = useField(props);
  return (
    <div className="field">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="control">
        <Input
          {...field}
          {...props}
          className="input"
          type={props.type || "text"}
        />
      </div>
      {meta.touched && meta.error && <p>{meta.error}</p>}
    </div>
  );
};

export default InputField;
