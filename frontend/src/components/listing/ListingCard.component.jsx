import React from "react";
import { Button, Chip, Image } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { Bath, Bed, Check, Eye, X } from "lucide-react";
import { HeartIcon } from "../ui/HeartIcon";

const ListingCardComponent = ({ listing }) => {
  const navigate = useNavigate();
  const handleNavigateToDetail = () => {
    navigate(`/listing/${listing?._id}`);
  };

  return (
    <div>
      <div className="border dakr:border-gray-700 border-gray-200 rounded-xl relative">
        <Image
          alt={listing?.title}
          objectFit="cover"
          src={listing?.images ? listing?.images[0] : listing?.images[0]}
          className="rounded-t-xl rounded-b-none w-full object-cover h-[290px] md:w-[300px] md:h-[200px] "
        />
        <div className="absolute left-3 top-3 z-30">
          <Button size="sm" isIconOnly color="danger" aria-label="Like">
            <HeartIcon />
          </Button>
        </div>
        <div
          to={`/listing/${listing?._id}`}
          className=" absolute right-3 top-3"
        >
          <Button
            onClick={handleNavigateToDetail}
            isIconOnly
            className=" z-30"
            size="sm"
            aria-label="See Detail"
          >
            <Eye size={18} />
          </Button>
        </div>
        <div className="p-3 space-y-3">
          <h1 className="text-lg font-semibold truncate">{listing?.title}</h1>
          <p className=" text-gray-500 truncate">{listing?.address}</p>

          <div className=" space-x-3">
            <Chip color="primary">{listing?.listingStatus}</Chip>
            <Chip color="primary">{listing?.transactionType}</Chip>
            <Chip color="primary">{listing?.propertyType}</Chip>
          </div>

          <p className="text-lg font-semibold">$ {listing?.regularPrice}</p>

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
        </div>
      </div>
    </div>
  );
};

export default ListingCardComponent;
