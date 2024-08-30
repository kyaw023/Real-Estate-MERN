import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchIcon } from "../components/ui/SearchIcon";
import axios from "axios";
import {
  ListingCardComponent,
  LoadingComponent,
  NoDataComponent,
} from "../components";
import { Grip, X } from "lucide-react";

const SearchPage = () => {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const [filterState, setFilterState] = useState({
    searchTerm: "",
    transactionType: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setFilterState({
      ...filterState,
      searchTerm: event.target.value,
    });
  };

  const handleTypeChange = (event) => {
    setFilterState({
      ...filterState,
      transactionType: event.target.value,
    });
  };

  const handleFilterChange = (event) => {
    setFilterState({
      ...filterState,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSortChange = (event) => {
    const { value } = event.target;

    let sort, order;

    console.log("value", value);

    switch (value) {
      case "regularPrice_desc":
        sort = "regularPrice";
        order = "desc";
        break;
      case "regularPrice_asc":
        sort = "regularPrice";
        order = "asc";
        break;
      case "desc":
        sort = "createdAt";
        order = "desc";
        break;
      case "asc":
        sort = "createdAt";
        order = "asc";
        break;
      default:
        sort = "created_at";
        order = "desc";
    }

    setFilterState({
      ...filterState,
      sort,
      order,
    });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTerm = urlParams.get("searchTerm");
    const transactionType = urlParams.get("transactionType");
    const parking = urlParams.get("parking");
    const furnished = urlParams.get("furnished");
    const offer = urlParams.get("offer");
    const sort = urlParams.get("sort");
    const order = urlParams.get("order");

    setFilterState({
      searchTerm: searchTerm || "",
      transactionType: transactionType || "all",
      parking: parking === "true" ? true : false,
      furnished: furnished === "true" ? true : false,
      offer: offer === "true" ? true : false,
      sort: sort || "created_at",
      order: order || "desc",
    });

    const fetchingListing = async () => {
      try {
        setIsLoading(true);
        const searchQuery = urlParams.toString();
        console.log("searchQuery", searchQuery);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/listing/search?${searchQuery}`,
          {
            withCredentials: true,
          }
        );

        console.log(response.data.data);

        setListings(response.data.data);

        if (response.data.data.length > 5) {
          setShowMore(true);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching listing data:", error);
        setIsLoading(false);
      }
    };

    fetchingListing();

    // console.log("Filter state:", filterState);
  }, [location.search]);

  const handleFilterSubmit = (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams();

    console.log(filterState.transactionType);

    urlParams.set("searchTerm", filterState.searchTerm);
    urlParams.set("offer", filterState.offer);
    urlParams.set("parking", filterState.parking);
    urlParams.set("furnished", filterState.furnished);
    urlParams.set("transactionType", filterState.transactionType);
    urlParams.set("sort", filterState.sort);
    urlParams.set("order", filterState.order);

    navigate(`/search?${urlParams.toString()}`);
    setSidebarOpen(false);
  };

  const handleShowMore = async () => {
    const starrtIndex = listings.length;
    const urlParams = new URLSearchParams(location.search);

    urlParams.set("startIndex", starrtIndex);

    const searchQuery = urlParams.toString();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/api/listing/search?${searchQuery}`,
      {
        withCredentials: true,
      }
    );

    if (response.data.data.length < 6) {
      setShowMore(false);
    }

    console.log(response.data.data);

    setListings([...listings, ...response.data.data]);
  };

  console.log(listings);

  return (
    <div className="grid lg:grid-cols-4  gap-10 mt-4">
      <div
        className={`lg:col-span-1 md:border-r border-default-300 transition-all duration-400 h-screen lg:h-auto w-[360px] top-0 lg:top-auto lg:w-auto shadow-inner  p-4 lg:p-0 ${
          sidebarOpen ? "left-0" : "-left-full"
        } dark:bg-slate-900 dark:lg:bg-black z-50 fixed lg:sticky lg:shadow-none`}
      >
        <form onSubmit={handleFilterSubmit} className=" space-y-6">
          <div className="flex items-center space-x-3">
            <Input
              classNames={{
                base: " w-[300px] md:w-[240px] h-12",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              value={filterState.searchTerm}
              onChange={handleSearchChange}
              startContent={<SearchIcon size={18} />}
              type="search"
            />
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden flex"
              size="sm"
              isIconOnly
              color="warning"
              variant="faded"
              aria-label="Take a photo"
            >
              <X size={18} />
            </Button>
          </div>
          <div className=" space-x-3 ">
            <Checkbox
              size="sm"
              onChange={handleTypeChange}
              isSelected={filterState.transactionType === "all"}
              id="all"
              value="all"
            >
              Rent & Sale
            </Checkbox>

            <Checkbox
              size="sm"
              onChange={handleTypeChange}
              isSelected={filterState.transactionType === "Sell"}
              id="Sell"
              value="Sell"
            >
              Sale
            </Checkbox>
            <Checkbox
              size="sm"
              onChange={handleTypeChange}
              isSelected={filterState.transactionType === "Rent"}
              id="Rent"
              value="Rent"
            >
              Rent
            </Checkbox>
          </div>
          <div className=" space-x-2">
            <Checkbox
              size="sm"
              onChange={handleFilterChange}
              checked={filterState.parking}
              id="parking"
              value="parking"
              name="parking"
            >
              Parking
            </Checkbox>
            <Checkbox
              size="sm"
              onChange={handleFilterChange}
              checked={filterState.furnished}
              id="furnished"
              value="furnished"
              name="furnished"
            >
              furnished
            </Checkbox>

            <Checkbox
              size="sm"
              onChange={handleFilterChange}
              checked={filterState.selectedType === "offer"}
              id="offer"
              value="offer"
              name="offer"
            >
              Offer
            </Checkbox>
          </div>
          <Select
            onChange={handleSortChange}
            defaultSelectedKeys={"created_at_desc"}
            size="sm"
            label="Sort"
            className="max-w-[300px] md:max-w-[240px]"
          >
            <SelectItem key="regularPrice_desc" value="regularPrice_desc">
              Price High to Low
            </SelectItem>
            <SelectItem key="regularPrice_asc" value="regularPrice_asc">
              Price Low to High
            </SelectItem>
            <SelectItem key="desc" value="createdAt_desc">
              Latest
            </SelectItem>
            <SelectItem key="asc" value="createdAt_asc">
              Oldest
            </SelectItem>
          </Select>
          <Button
            type="submit"
            className=" w-[300px] md:w-[240px]"
            color="primary"
          >
            Filter
          </Button>
        </form>
      </div>

      <div className="col-span-3 z-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold ">Listing Results :</h1>
          <Button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex"
            size="sm"
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Take a photo"
          >
            <Grip size={18} />
          </Button>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3">
          <LoadingComponent isLoading={isLoading}>
            <NoDataComponent isData={listings}>
              {listings?.map((listing) => (
                <ListingCardComponent key={listing?._id} listing={listing} />
              ))}
              <div className="flex items-center justify-center text-center">
                {showMore && (
                  <Button
                    size="sm"
                    variant="bordered"
                    onClick={handleShowMore}
                    className="w-full"
                    color="primary"
                  >
                    Show More
                  </Button>
                )}
              </div>
            </NoDataComponent>
          </LoadingComponent>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
