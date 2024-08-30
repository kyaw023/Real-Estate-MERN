import { Input } from "@nextui-org/react";
import { ErrorMessage } from "formik";
import React from "react";

const FormComponent = ({
  value,
  handleChange,
  handleBlur,
  name,
  label,
  placeholder,
  type,
}) => {
  return (
    <div>
      <Input
        className=" "
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        size="sm"
        type={type}
        label={label}
        placeholder={placeholder}
      />
      <ErrorMessage
        className="  text-red-600 text-xs mt-1"
        component={"p"}
        name={name}
      />
    </div>
  );
};

export default FormComponent;
