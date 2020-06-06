import React from "react";
import { Formik } from "formik";
import { useMutation, gql } from "@apollo/client";
import { Button } from "antd";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { InputField, OptionsGroupField } from "../Form";

const newListingFormValidation = Yup.object().shape({
  title: Yup.string().required("Please provide a title for your listing"),
  description: Yup.string().required(
    "Please provide a description for your listing"
  ),
});

const CREATE_LISTING = gql`
  mutation CreateListing($input: NewListingInput!) {
    createListing(input: $input) {
      _id
    }
  }
`;

const newListingFormInitialState = {
  title: "",
  description: "",
  category: [],
};

const ListingForm = () => {
  const history = useHistory();
  const [createListing, { loading, data, error }] = useMutation(
    CREATE_LISTING,
    {
      onCompleted: () => {
        history.push("/org/listings");
      },
      refetchQueries: ["ListingsForUserOrg"],
    }
  );
  return (
    <Formik
      initialValues={newListingFormInitialState}
      validationSchema={newListingFormValidation}
      onSubmit={async (values, actions) => {
        try {
          await createListing({ variables: { input: values } });
          actions.resetForm();
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <InputField id="title" name="title" label="Title" />
          <InputField id="description" name="description" label="Description" />
          <OptionsGroupField
            name="category"
            legend="Category:"
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
              {
                id: "other",
                name: "other",
                value: "OTHER",
                label: "Other",
                type: "checkbox",
              },
            ]}
          />
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Create listing
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default ListingForm;
