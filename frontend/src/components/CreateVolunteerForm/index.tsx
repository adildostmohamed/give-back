import React from "react";
import { Formik } from "formik";
import { Row, Col, Button } from "antd";
import { OptionsGroupField } from "../Form";
import { useMutation, gql } from "@apollo/client";
import FormError from "../FormError";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const createVolunteerFormValidation = Yup.object().shape({
  interests: Yup.array()
    .of(Yup.string())
    .required("Please select some interests"),
});

const CREATE_VOLUNTEER_PROFILE = gql`
  mutation CreateVolunteerForCurrentUser($input: CurrentUserVolunteerInput!) {
    createVolunteerForCurrentUser(input: $input) {
      _id
    }
  }
`;

const initialCreateVolunteerFormState = {
  interests: [],
};

const CreateVolunteerForm = () => {
  const history = useHistory();
  const [createVolunteerForCurrentUser, { loading, error }] = useMutation(
    CREATE_VOLUNTEER_PROFILE,
    {
      onCompleted: () => {
        history.push("/profile");
      },
    }
  );
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 6, offset: 9 }}>
        {error && <FormError formError={error} />}
        <Formik
          initialValues={initialCreateVolunteerFormState}
          validationSchema={createVolunteerFormValidation}
          onSubmit={async (values, actions) => {
            try {
              await createVolunteerForCurrentUser({
                variables: { input: values },
              });
              actions.resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <OptionsGroupField
                name="interests"
                legend="Select the types of listings you'd be interested in"
                type="checkbox"
                options={[
                  {
                    id: "design",
                    name: "design",
                    value: "DESIGN",
                    label: "Design",
                    type: "checkbox",
                  },
                  {
                    id: "data",
                    name: "data",
                    value: "DATA",
                    label: "Data",
                    type: "checkbox",
                  },
                  {
                    id: "technology",
                    name: "technology",
                    value: "TECHNOLOGY",
                    label: "Technology",
                    type: "checkbox",
                  },
                  {
                    id: "consulting",
                    name: "consulting",
                    value: "CONSULTING",
                    label: "Consulting",
                    type: "checkbox",
                  },
                  {
                    id: "admin",
                    name: "admin",
                    value: "ADMIN",
                    label: "Admin",
                    type: "checkbox",
                  },
                ]}
              />
              <Button type="primary" htmlType="submit" disabled={loading}>
                Set up your profile
              </Button>
            </form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default CreateVolunteerForm;
