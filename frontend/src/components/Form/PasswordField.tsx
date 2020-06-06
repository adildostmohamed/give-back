import React from "react";
import { Input } from "antd";
import { useField } from "formik";

const PasswordField = (props: any) => {
  const { id, label } = props;
  const [field, meta] = useField(props);

  return (
    <div className="field">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="control">
        <Input.Password {...field} {...props} className="input" />
      </div>

      {meta.touched && meta.error && <p>{meta.error}</p>}
    </div>
  );
};

export default PasswordField;
