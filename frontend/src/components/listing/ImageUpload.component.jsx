import { Button } from "@nextui-org/react";
import { ErrorMessage } from "formik";
import React from "react";

const ImageUploadComponent = ({
  handleDeletePreviousImages,
  handleFileChange,
  previousImages,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
      <label
        htmlFor="uploadFile1"
        className="bg-white col-span-1 dark:bg-black text-gray-500 font-semibold text-base rounded max-w-lg h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mb-3 font-[sans-serif]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 mb-2 fill-gray-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload Image
        <input
          multiple
          min={0}
          max={7}
          onChange={handleFileChange}
          type="file"
          id="uploadFile1"
          className="hidden"
        />
        <p className="text-xs font-medium text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
        <ErrorMessage name="images" component="div" />
      </label>
      <div className="lg:col-span-3  w-full">
        <div className="flex flex-wrap items-center gap-4">
          {previousImages?.map((image, index) => (
            <div className="w-48 h-48 relative" key={index}>
              <img src={image} className="w-full h-full object-cover" />
              <Button
                type="button"
                isIconOnly
                color="warning"
                variant="faded"
                aria-label="Take a photo"
                className="absolute top-2 right-2"
                size="sm"
                onClick={() => handleDeletePreviousImages(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploadComponent;
