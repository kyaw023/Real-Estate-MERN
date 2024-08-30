import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "../../components/ui/ThemeSwitcher";

const ProfilePsage = () => {
  const {
    user: { currentUser, isLoading, isError },
  } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    if (currentUser) {
      navigate("/edit-profile");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 dark:bg-gray-800 bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
      <div className="relative bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg h-32 flex justify-end items-start p-4">
        <div className=" flex items-center gap-2">
          <Button
            onClick={handleEditProfile}
            radius="full"
            className="text-white bg-gray-700  text-xs"
          >
            Edit Profile
          </Button>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="relative flex flex-col items-center -mt-12">
        <Avatar
          isBordered
          color="primary"
          as="button"
          alt="NextUI hero Image with delay"
          className="transition-transform w-20 h-20"
          src={currentUser?.avatar}
        />

        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-white dark:text-gray-200">
            {currentUser?.name}
          </h2>
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {currentUser?.email}
          </p>
        </div>
        <div className="flex justify-center gap-2 mt-4">
          <span className="text-sm bg-gray-700 dark:bg-gray-800 text-white rounded-full px-3 py-1">
            Design
          </span>
          <span className="text-sm bg-gray-700 dark:bg-gray-800 text-white rounded-full px-3 py-1">
            UI/UX
          </span>
          <span className="text-sm bg-gray-700 dark:bg-gray-800 text-white rounded-full px-3 py-1">
            Full Stack Web Developer
          </span>
        </div>
        <p className="my-4 text-gray-400 dark:text-gray-500 text-sm px-6 text-center">
          Creator of Radify Icons Set. 500+ icons in 6 styles, SVG and Figma
          files, and more.
        </p>
      </div>
    </div>
  );
};

export default ProfilePsage;
