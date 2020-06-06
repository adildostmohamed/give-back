import React from "react";

const FormError = (props: any) => {
  return <pre>{JSON.stringify(props.formError)}</pre>;
};

export default FormError;
