import { Button, Pagination } from "@nextui-org/react";
import React from "react";

const PaginationComponent = ({ pageNumber, links, handlePageChange }) => {
  return (
    <div className="flex flex-col items-center mt-4 gap-5">
      <p className="text-small text-default-500">Selected Page: {pageNumber}</p>
      <Pagination
        total={links?.totalPages} // Correctly set the total number of pages
        onChange={handlePageChange}
        color="secondary"
        page={pageNumber} // Control the current page with state
      />
    </div>
  );
};

export default PaginationComponent;
