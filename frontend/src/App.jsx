import React, { useEffect } from "react";
import { NavbarComponet } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const App = () => {
  const {
    user: { currentUser, isLoading, isError },
  } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the jwt cookie is missing
    if (!Cookies.get("jwt") && !currentUser) {
      navigate("/sign-in");
    }
  }, [navigate, currentUser]);

  return (
    <div className="max-w-[1280px] mx-auto py-1.5">
      {!isLoading && !isError && currentUser && <NavbarComponet />}
      <div className=" px-2 md:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default App;
