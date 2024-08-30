import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { setError, setLogoutSuccess } from "../slice/userSlice";
import { useDispatch } from "react-redux";
import { persistor } from "../store/store.js";
import { toast } from "sonner";
import { getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { Link } from "react-router-dom";

const UserComponent = ({ user }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const dispatch = useDispatch();
  const [actionType, setActionType] = useState("");
  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      const auth = getAuth(app);

      if (res.status === 200) {
        await auth.signOut();
        await persistor.flush();
        dispatch(setLogoutSuccess());
        toast.success(res.data?.msg);
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error?.response?.data?.msg || error.message));
      toast.error(error?.response?.data?.msg || error.message);
    }
  };

  const deleteAccountHandler = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/user/delete/${user?._id}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        await logoutHandler(); // Reuse logout functionality after deleting the account
        toast.success(res.data?.msg);
      }
    } catch (error) {
      console.log(error);
      dispatch(setError(error?.response?.data?.msg || error.message));
      toast.error(error?.response?.data?.msg || error.message);
    }
  };

  const handleAction = () => {
    if (actionType === "logout") {
      logoutHandler();
    } else if (actionType === "delete") {
      deleteAccountHandler();
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {actionType === "logout" ? "Log Out" : "Delete Account"}
              </ModalHeader>
              <ModalBody>
                <p>
                  {actionType === "logout"
                    ? "Are you sure you want to log out?"
                    : "Are you sure you want to delete your account?"}
                </p>
                <p>
                  {actionType === "logout"
                    ? "All unsaved changes will be lost, and you will need to log in again to access your account."
                    : "This action cannot be undone, and all your data will be permanently deleted."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={handleAction} color="primary">
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            color="primary"
            alt="NextUI hero Image with delay"
            as="button"
            className="transition-transform"
            src={user?.avatar}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link to={"/profile"}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link to={"/my-listing"}>My Listings</Link>
          </DropdownItem>
          <DropdownItem key="team_settings">
            <Link to={"/edit-profile"}>Edit Profile</Link>
          </DropdownItem>
          <DropdownItem key="analytics">Favorite</DropdownItem>
          <DropdownItem
            className="cursor-pointer"
            color="danger"
            onPress={() => {
              setActionType("logout");
              onOpen();
            }}
          >
            Log Out
          </DropdownItem>
          <DropdownItem
            className="cursor-pointer"
            color="danger"
            key="delete"
            onPress={() => {
              setActionType("delete");
              onOpen();
            }}
          >
            Delete Account
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default UserComponent;
