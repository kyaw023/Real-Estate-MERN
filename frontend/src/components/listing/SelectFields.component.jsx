import { Checkbox, Select, SelectItem } from "@nextui-org/react";
import { ErrorMessage } from "formik";
import React from "react";

const SelectFieldsComponent = ({ setFieldValue, values }) => {
  console.log(values);
  return (
    <div className="grid  grid-cols-1 md:grid-cols-3 gap-3 mb-3">
      <div>
        <Select
          label="Property Type"
          placeholder="Select a property type"
          value={values.propertyType}
          defaultSelectedKeys={values.propertyType}
          name="propertyType"
          onChange={(e) => {
            setFieldValue("propertyType", e.target.value);
          }}
        >
          <SelectItem value={"House"} key="House">
            House
          </SelectItem>
          <SelectItem value={"Apartment"} key="Apartment">
            Apartment
          </SelectItem>
          <SelectItem value={"Condo"} key="Condo">
            Condo
          </SelectItem>
          <SelectItem value={"Townhouse"} key="Townhouse">
            Townhouse
          </SelectItem>
          <SelectItem value={"Land"} key="Land">
            Land
          </SelectItem>
          <SelectItem value={"Commercial"} key="Commercial">
            Commercial
          </SelectItem>
        </Select>
        <ErrorMessage
          name="propertyType"
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      <div>
        <Select
          label="Listing Status"
          placeholder="Select your listing status"
          value={values.listingStatus}
          onChange={(e) => setFieldValue("listingStatus", e.target.value)}
        >
          <SelectItem key="Active">Active</SelectItem>
          <SelectItem key="Pending">Pending</SelectItem>
          <SelectItem key="Sold">Sold</SelectItem>
        </Select>

        <ErrorMessage
          name="listingStatus"
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      <div>
        <Select
          label="Transaction Type"
          placeholder="Select your transaction type"
          value={values.transactionType}
          onChange={(e) => setFieldValue("transactionType", e.target.value)}
        >
          <SelectItem key="Rent">Rent</SelectItem>
          <SelectItem key="Sell">Sell</SelectItem>
        </Select>

        <ErrorMessage
          name="listingStatus"
          component="div"
          className="text-red-500 text-xs"
        />
      </div>

      <div className="border p-4 rounded-xl border-slate-700 flex items-center gap-4 md:col-span-2">
        <div>
          <Checkbox
            isSelected={values.offer}
            onChange={(e) => setFieldValue("offer", e.target.checked)}
          >
            Offer
          </Checkbox>

          <ErrorMessage name="offer" component="div" className="text-red-500" />
        </div>
        <Checkbox
          isSelected={values.parking}
          onChange={(e) => setFieldValue("parking", e.target.checked)}
        >
          Parking
        </Checkbox>

        <ErrorMessage name="parking" component="div" className="text-red-500" />
        <Checkbox
          isSelected={values.furnished}
          onChange={(e) => setFieldValue("furnished", e.target.checked)}
        >
          Furnished
        </Checkbox>

        <ErrorMessage
          name="furnished"
          component="div"
          className="text-red-500"
        />
      </div>
    </div>
  );
};

export default SelectFieldsComponent;
