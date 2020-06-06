import React from "react";
import { useField } from "formik";
import OptionField, { IOptionFieldProps } from "./OptionField";

interface IOptionsGroupFieldProps {
  name: string;
  legend: string;
  type: "radio" | "checkbox";
  options: IOptionFieldProps[];
}

const OptionsGroupField = (props: IOptionsGroupFieldProps) => {
  const { options, name, legend, type } = props;
  const [, meta] = useField(props);
  return (
    <fieldset>
      <legend>{legend}</legend>
      <div>
        {options.map((option) => {
          return (
            <OptionField
              key={option.id}
              id={option.id}
              name={name}
              type={type}
              value={option.value}
              label={option.label}
            />
          );
        })}
      </div>
      {meta.touched && meta.error && <p>{meta.error}</p>}
    </fieldset>
  );
};

export default OptionsGroupField;
