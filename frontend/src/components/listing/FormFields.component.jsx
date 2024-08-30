import React from "react";
import FormComponent from "../Form.component";

const FormFieldsComponent = ({ values, handleBlur, handleChange }) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-3">
      <FormComponent
        value={values.title}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="title"
        label="Title"
        placeholder="Enter your title"
      />
      <FormComponent
        value={values.description}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="description"
        label="Description"
        placeholder="Enter your description"
      />
      <FormComponent
        value={values.regularPrice}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        name="regularPrice"
        label="Regular Price"
        placeholder="Enter your regular price"
      />

      <FormComponent
        value={values.discountPrice}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        name="discountPrice"
        label="Discount Price"
        placeholder="Enter your discount price"
      />

      <FormComponent
        value={values.address}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="text"
        name="address"
        label="Address"
        placeholder="Enter your address"
      />

      <FormComponent
        value={values.bathrooms}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        name="bathrooms"
        label="Number of Bathrooms"
        placeholder="Enter your number of bathrooms"
      />

      <FormComponent
        value={values.bedrooms}
        handleBlur={handleBlur}
        handleChange={handleChange}
        type="number"
        min={0}
        name="bedrooms"
        label="Number of Bedrooms"
        placeholder="Enter your number of bedrooms"
      />
    </div>
  );
};

export default FormFieldsComponent;
