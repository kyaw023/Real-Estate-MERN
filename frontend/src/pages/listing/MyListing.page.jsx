import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bath, Bed, PencilIcon, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingComponent, NoDataComponent } from "../../components";
import { Button, Image } from "@nextui-org/react";
import Swal from "sweetalert2";

const MyListingPage = () => {
  const {
    user: { currentUser },
  } = useSelector((state) => state.user);

  const [myListing, setMyListing] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/listing/read/username/${
            currentUser?._id
          }`,
          {
            withCredentials: true,
          }
        );
        setMyListing(res.data?.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    fetchMyListing();
  }, [currentUser?._id]);

  const listingDeleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your data will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      background: "#f9f9f9", // Light background
      backdrop: `rgba(0,0,123,0.4) url("https://sweetalert2.github.io/images/nyan-cat.gif") left top no-repeat`, // Adds a custom backdrop with animation
      customClass: {
        popup: "rounded-lg shadow-lg", // Rounded corners and shadow
        confirmButton: "rounded-lg", // Rounded confirm button
        cancelButton: "rounded-lg", // Rounded cancel button
      },
      buttonsStyling: true,
      animation: true,
      showClass: {
        popup: "animated fadeInDown faster", // Add animation when showing
      },
      hideClass: {
        popup: "animated fadeOutUp faster", // Add animation when hiding
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          confirmButtonColor: "#4CAF50",
          background: "#f9f9f9",
          customClass: {
            popup: "rounded-lg shadow-lg",
            confirmButton: "rounded-lg",
          },
          showClass: {
            popup: "animated zoomIn faster",
          },
          hideClass: {
            popup: "animated zoomOut faster",
          },
        });

        axios.delete(
          `${import.meta.env.VITE_BASE_URL}/api/listing/delete/${id}/${
            currentUser?._id
          }`,
          {
            withCredentials: true,
          }
        );
        setMyListing((prev) => prev.filter((item) => item._id !== id));
      }
    });
  };

  const listingEditHandler = (id) => {
    navigate(`/create-listing/`, { state: { id } });
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className=" select-none ">
        <h1>My Listing</h1>
        <NoDataComponent isData={myListing?.length > 0}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
            {myListing?.length > 0 ? (
              myListing?.map((listing) => (
                <div
                  className="border dark:border-gray-600 border-gray-200  rounded-lg p-4"
                  key={listing?._id}
                >
                  <div className="grid grid-cols-2 gap-3">
                    <Image
                      width={300}
                      height={200}
                      className=" object-cover"
                      src={listing?.images[0]}
                      alt="NextUI hero Image with delay"
                    />
                    <div className=" space-y-3">
                      <Link to={`/listing/${listing?._id}`}>
                        <h1 className="text-lg font-semibold text-primary hover:underline">
                          {listing?.title}
                        </h1>
                      </Link>
                      <div className="flex gap-2">
                        <div className="flex gap-1">
                          <Bed />
                          <span>{listing?.bedrooms}</span>
                        </div>
                        <div className=" flex gap-1">
                          <Bath />
                          <span>{listing?.bathrooms}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-lg ">${listing?.regularPrice}</p>
                      </div>
                      <div className="flex  gap-2">
                        <Button
                          onClick={() => listingEditHandler(listing?._id)}
                          isIconOnly
                          color="primary"
                          variant="faded"
                          aria-label="Take a photo"
                        >
                          <PencilIcon size={20} />
                        </Button>
                        <Button
                          onClick={() => listingDeleteHandler(listing?._id)}
                          isIconOnly
                          color="danger"
                          variant="faded"
                          aria-label="Take a photo"
                        >
                          <Trash2 size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No listing found</p>
            )}
          </div>
        </NoDataComponent>
      </div>
    </LoadingComponent>
  );
};

export default MyListingPage;
