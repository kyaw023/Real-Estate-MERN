import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingComponent } from "../../components";
import { Chip, Image, User } from "@nextui-org/react";
import { Bath, Bed, Check, LocateIcon, MapPinCheck, X } from "lucide-react";

const ListingDetailPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const getSingleListing = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/listing/read/${id}`,
          {
            withCredentials: true,
          }
        );

        setListing(res.data?.data);
      } catch (error) {
        console.error("Error fetching listing data:", error);
        setError("Failed to load listing data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    getSingleListing();
  }, [id]);

  if (isLoading) return <LoadingComponent isLoading />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold my-4">Listing Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-7">
        {/* Listing details */}
        <div className="col-span-3">
          <div>
            {listing?.images?.length > 0 ? (
              <>
                <Image
                  width={"100%"}
                  height={300}
                  className=" object-cover"
                  src={selectedImage ? selectedImage : listing?.images[0]}
                  alt="NextUI hero Image with delay"
                />

                <div className="grid grid-cols-4 gap-2 mt-2">
                  {listing.images.map((image, index) => (
                    <Image
                      onClick={() => setSelectedImage(image)}
                      className={`cursor-pointer ${
                        selectedImage === image ? "ring-2 ring-blue-500" : ""
                      }`}
                      key={index}
                      width={"100%"}
                      height={100}
                      src={image}
                      alt="NextUI hero Image with delay"
                    />
                  ))}
                </div>
              </>
            ) : (
              <p>No images available for this listing.</p>
            )}
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-xl  font-semibold">{listing?.title}</h1>
            <p className="mt-2 dark:text-gray-300 text-slate-800 text-xl font-semibold">
              Price: ${listing?.regularPrice}
            </p>
          </div>

          {/* Details */}

          <div className=" space-x-3">
            <Chip color="primary">{listing?.listingStatus}</Chip>
            <Chip color="primary">{listing?.propertyType}</Chip>
            <Chip color="primary">{listing?.transactionType}</Chip>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div
              className="flex items-center gap-1 border border-primary rounded-full px-4 py-1
            "
            >
              <h1 className="text-sm">Parking</h1>
              {listing?.parking ? <Check size={16} /> : <X size={16} />}
            </div>
            <div
              className="flex items-center gap-1 border border-primary rounded-full px-4 py-1
            "
            >
              <h1 className="text-sm">Furnished</h1>
              {listing?.furnished ? <Check size={16} /> : <X size={16} />}
            </div>
            <div
              className="flex items-center gap-1 border border-primary rounded-full px-4 py-1
            "
            >
              <h1 className="text-sm">Offer</h1>
              {listing?.offer ? <Check size={16} /> : <X size={16} />}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <h1 className="text-xl font-semibold">
              <MapPinCheck />
            </h1>
            <p>{listing?.address}</p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Chip
              startContent={<Bed size={18} />}
              variant="faded"
              color="primary"
            >
              {listing?.bedrooms}
            </Chip>

            <Chip
              startContent={<Bath size={18} />}
              variant="faded"
              color="primary"
            >
              {listing?.bathrooms}
            </Chip>
          </div>

          <p className="mt-4 dark:text-gray-300 text-slate-800">
            {listing?.description}
          </p>
        </div>

        {/* User information */}
        <div className="col-span-1">
          <User
            name={listing?.user?.username}
            description={listing?.user?.email}
            avatarProps={{
              src: listing?.user?.avatar,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailPage;
