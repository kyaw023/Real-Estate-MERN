import React, { useEffect, useState } from "react";
import Logo from "../assets/Frame.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  Input,
} from "@nextui-org/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchIcon } from "./ui/SearchIcon";
import { useSelector } from "react-redux";
import UserComponent from "./User.component";

const NavbarComponet = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const { user } = useSelector((state) => state.user);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    setSearchTerm("");
  };

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  }, [location.search]);

  return (
    <Navbar variant="floating" className=" z-50" maxWidth="xl" isBlurred>
      <NavbarContent>
        <NavbarBrand>
          <img className="" src={Logo} alt="logo" />
          <h1 className="text-xl font-semibold hidden lg:block ">Estatery</h1>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex gap-4" justify="center">
          <NavbarItem>
            <Link to={"/"} color="foreground" href="#">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem >
            <Link to={"/about"} color="foreground" href="#">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link to={"/contact"} color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" to={"/create-listing"}>
              Create Listing
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      {/* menu */}

      <NavbarContent justify="end">
        <form onSubmit={handleSearchSubmit}>
          <Input
            classNames={{
              base: " w-[200px] md:w-[240px] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            value={searchTerm}
            onChange={handleSearchChange}
            startContent={<SearchIcon size={18} />}
            type="search"
          />
        </form>
        {user?.currentUser ? (
          <UserComponent user={user?.currentUser} />
        ) : (
          <div className=" space-x-2">
            <Button
              onClick={handleSignIn}
              type="button"
              variant="bordered"
              className=" border-primary"
            >
              Login
            </Button>

            <Button
              onClick={handleSignUp}
              type="button"
              className=" bg-primary text-slate-100"
              variant="flat"
            >
              Sign Up
            </Button>
          </div>
        )}
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
    </Navbar>
  );
};

export default NavbarComponet;
