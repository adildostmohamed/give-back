import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Alert } from "antd";
import { InputField, PasswordField } from "../Form";
import * as Yup from "yup";

const loginFormValidation = Yup.object().shape({
  email: Yup.string().required("Please provide an email"),
  password: Yup.string().required("Please enter your password"),
});

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;

const initialLoginFormState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const history = useHistory();
  const [
    login,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const { token } = data.login;
      handleLoginSuccess(token);
    },
  });

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("token", token);
    history.push("/profile");
  };

  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 6, offset: 9 }}>
        {mutationError &&
          mutationError.graphQLErrors.map((error) => {
            return <Alert message={error.message} type="error" />;
          })}
        <Formik
          initialValues={initialLoginFormState}
          validationSchema={loginFormValidation}
          onSubmit={async (values, actions) => {
            try {
              await login({ variables: { input: values } });
              actions.resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <InputField id="email" label="Email" name="email" type="text" />
              <PasswordField
                id="password"
                label="Password"
                name="password"
                type="password"
              />
              <Button
                type="primary"
                htmlType="submit"
                disabled={mutationLoading}
              >
                Login
              </Button>
            </form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default LoginForm;
