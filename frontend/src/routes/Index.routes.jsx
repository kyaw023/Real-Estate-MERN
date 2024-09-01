import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import {
  ContactPage,
  CreateListingPage,
  EditProfilePage,
  HomePage,
  ListingDetailPage,
  LoadingPage,
  MyListingPage,
  ProfilePage,
  SearchPage,
  SignInPage,
  SignUpPage,
} from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutSuccess } from "../slice/userSlice";
import { app } from "../firebase";
import { persistor } from "../store/store";
import { getAuth } from "firebase/auth";
import AboutPage from "../pages/Aboute.page";


const IndexRoutes = () => {
  const {
    user: { currentUser, isLoading, isError },
  } = useSelector((state) => state.user);

  const auth = getAuth(app);

  const dispatch = useDispatch();

  // Helper function to handle loading and error states
  const getElement = (element) => {
    return element;
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    auth.signOut();
    persistor.flush();
    dispatch(setLogoutSuccess());
    return <Navigate to="/sign-in" />;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: getElement(
            currentUser ? <HomePage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/about",
          element: getElement(
            currentUser ? <AboutPage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/contact",
          element: getElement(
            currentUser ? <ContactPage /> : <Navigate to="/sign-in" />
          ),
        },

        {
          path: "/search",
          element: getElement(
            currentUser ? <SearchPage /> : <Navigate to="/sign-in" />
          ),
        },

        {
          path: "/listing/:id",
          element: getElement(
            currentUser ? <ListingDetailPage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/my-listing",
          element: getElement(
            currentUser ? <MyListingPage /> : <Navigate to="/sign-in" />
          ),
        },

        {
          path: "/profile",
          element: getElement(
            currentUser ? <ProfilePage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/edit-profile",
          element: getElement(
            currentUser ? <EditProfilePage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/create-listing",
          element: getElement(
            currentUser ? <CreateListingPage /> : <Navigate to="/sign-in" />
          ),
        },
        {
          path: "/sign-in",
          element: getElement(
            !currentUser ? <SignInPage /> : <Navigate to="/" />
          ),
        },
        {
          path: "/sign-up",
          element: getElement(
            !currentUser ? <SignUpPage /> : <Navigate to="/" />
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default IndexRoutes;
