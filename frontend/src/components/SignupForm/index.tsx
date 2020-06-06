import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "antd";
import { InputField, PasswordField } from "../Form";
import * as Yup from "yup";
import FormError from "../FormError";

const signupFormValidation = Yup.object().shape({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your second name"),
  email: Yup.string().required("Please provide an email"),
  password: Yup.string().required("Please enter your password"),
});

const SIGNUP = gql`
  mutation Signup($input: SignupInput!) {
    signup(input: $input) {
      user {
        profileType
      }
      token
    }
  }
`;

const initialSignUpFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const SignupForm = () => {
  const history = useHistory();
  const [
    signup,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(SIGNUP, {
    onCompleted: (data) => {
      const { token, user } = data.signup;
      handleSignupSuccess(token, user.profileType);
    },
  });

  const handleSignupSuccess = (token: string, profileType: string) => {
    localStorage.setItem("token", token);
    switch (profileType) {
      case "ORGANISATION":
        history.push("/org/onboarding");
        break;
      case "VOLUNTEER":
        history.push("/profile/onboarding");
        break;
      case "ADMIN":
        history.push("/admin");
        break;
    }
  };

  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 6, offset: 9 }}>
        {mutationError && <FormError formError={mutationError} />}
        <Formik
          initialValues={initialSignUpFormState}
          validationSchema={signupFormValidation}
          onSubmit={async (values, actions) => {
            const input = { ...values, profileType: "ORGANISATION" };
            try {
              await signup({ variables: { input } });
              actions.resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <InputField id="firstName" name="firstName" label="First Name" />
              <InputField id="lastName" name="lastName" label="Last Name" />
              <InputField id="email" name="email" label="Email" />
              <PasswordField id="password" name="password" label="Password" />
              <Button
                type="primary"
                htmlType="submit"
                disabled={mutationLoading}
              >
                Sign up
              </Button>
            </form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default SignupForm;
