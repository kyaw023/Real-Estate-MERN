import React, { useEffect, useState } from "react";
import ListingCardComponent from "./ListingCard.component";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import PaginationComponent from "../Pagination.component";
import LoadingComponent from "../Loading/Loading.component";

const FeaturedListingsComponent = () => {
  const [listings, setListings] = useState([]);
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the page number from URL query params, default to 1 if not present
  const pageFromQuery = parseInt(searchParams.get("page") || "1", 10);
  const [pageNumber, setPageNumber] = useState(pageFromQuery);

  // Update page number state whenever URL query changes
  useEffect(() => {
    setPageNumber(pageFromQuery);
  }, [pageFromQuery]);

  const jwt = Cookies.get("jwt");

  // Fetch listings whenever pageNumber changes
  useEffect(() => {
    const fetchListings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/listing/read?page=${pageNumber}`,
          {
            withCredentials: true,
          }
        );

        setListings(response?.data?.data);
        setLinks(response?.data?.pagination);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListings();
  }, [pageNumber]);

  // Handle page changes
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    navigate(`?page=${newPage}`); // Update URL query parameter
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className=" max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold my-4">Featured Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {listings.map((listing) => (
            <ListingCardComponent key={listing._id} listing={listing} />
          ))}
        </div>
      </div>
      <div>
        <PaginationComponent
          pageNumber={pageNumber}
          links={links}
          handlePageChange={handlePageChange}
        />
      </div>
    </LoadingComponent>
  );
};

export default FeaturedListingsComponent;
