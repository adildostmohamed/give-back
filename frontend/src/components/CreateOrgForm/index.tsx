import React from "react";
import { Formik } from "formik";
import { Row, Col, Button } from "antd";
import { useMutation, gql } from "@apollo/client";
import { InputField } from "../Form";
import FormError from "../FormError";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const createOrgFormValidation = Yup.object().shape({
  name: Yup.string().required("Please provide your organisation name"),
  contactEmail: Yup.string().required("Please enter your organisation email"),
});

const CREATE_ORG = gql`
  mutation CreateOrganisation($input: NewOrganisationInput!) {
    createOrganisation(input: $input) {
      _id
    }
  }
`;

const ADD_USER_TO_ORG = gql`
  mutation AddCurrentUserToOrganisation($organisationId: ID!) {
    addCurrentUserToOrganisation(organisationId: $organisationId) {
      _id
      organisation {
        _id
        name
      }
    }
  }
`;

const initialOrgFormState = {
  name: "",
  contactEmail: "",
};

const CreateOrgForm = () => {
  const history = useHistory();
  const [
    addCurrentUserToOrganisation,
    { loading: addToOrgLoading, error: addToOrgError },
  ] = useMutation(ADD_USER_TO_ORG, {
    onCompleted: () => {
      history.push("/profile");
    },
  });
  const [
    createOrganisation,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_ORG, {
    onCompleted: async (data) => {
      try {
        const organisationId = data.createOrganisation._id;
        await addCurrentUserToOrganisation({ variables: { organisationId } });
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 6, offset: 9 }}>
        {mutationError && <FormError formError={mutationError} />}
        {addToOrgError && <FormError formError={addToOrgError} />}
        <Formik
          initialValues={initialOrgFormState}
          validationSchema={createOrgFormValidation}
          onSubmit={async (values, actions) => {
            try {
              await createOrganisation({ variables: { input: values } });
              actions.resetForm();
            } catch (error) {
              console.error(error);
            }
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <InputField
                id="name"
                label="Organisation Name"
                name="name"
                type="text"
              />
              <InputField
                id="contactEmail"
                label="Organisation Email"
                name="contactEmail"
                type="text"
              />
              <Button
                type="primary"
                htmlType="submit"
                disabled={mutationLoading || addToOrgLoading}
              >
                Create your organisation
              </Button>
            </form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default CreateOrgForm;
