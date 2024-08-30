import { Button } from "@nextui-org/react";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { app } from "../../firebase";
import { setError, setLoginSuccess } from "../../slice/userSlice";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const GitHubAuthComponent = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleGitHubAuth = async () => {
    try {
      const provider = new GithubAuthProvider();

      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      // Extract user details from the result
      const { displayName, email, photoURL } = result.user;

      console.log(displayName, email, photoURL);

      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/github`,
        {
          name: displayName,
          email,
          photo: photoURL,
        },
        {
          withCredentials: true,
        }
      );

      if (data) {
        dispatch(setLoginSuccess(data?.user));
        navigate("/");
        toast.success("Sign in successfully");
      } else {
        toast.error(data?.msg);
        throw new Error(data?.msg || "Authentication failed");
      }
    } catch (error) {
      console.error("Error during Google authentication:", error);

      // Display the error message to the user using toast
      toast.error(error?.response?.data?.msg || error.message);

      // Set the error message in the Redux store
      dispatch(setError(error?.response?.data?.msg || error.message));
    }
  };
  return (
    <Button
      onClick={handleGitHubAuth}
      className="w-full"
      startContent={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-[24px] h-[24px]"
          viewBox="0 0 256 256"
          aria-label="GitHub Logo"
        >
          <g fill="#8d8888" fillRule="nonzero">
            <g transform="scale(5.12,5.12)">
              <path d="M17.791,46.836c0.711,-0.306 1.209,-1.013 1.209,-1.836v-5.4c0,-0.197 0.016,-0.402 0.041,-0.61c-0.014,0.004 -0.027,0.007 -0.041,0.01c0,0 -3,0 -3.6,0c-1.5,0 -2.8,-0.6 -3.4,-1.8c-0.7,-1.3 -1,-3.5 -2.8,-4.7c-0.3,-0.2 -0.1,-0.5 0.5,-0.5c0.6,0.1 1.9,0.9 2.7,2c0.9,1.1 1.8,2 3.4,2c2.487,0 3.82,-0.125 4.622,-0.555c0.934,-1.389 2.227,-2.445 3.578,-2.445v-0.025c-5.668,-0.182 -9.289,-2.066 -10.975,-4.975c-3.665,0.042 -6.856,0.405 -8.677,0.707c-0.058,-0.327 -0.108,-0.656 -0.151,-0.987c1.797,-0.296 4.843,-0.647 8.345,-0.714c-0.112,-0.276 -0.209,-0.559 -0.291,-0.849c-3.511,-0.178 -6.541,-0.039 -8.187,0.097c-0.02,-0.332 -0.047,-0.663 -0.051,-0.999c1.649,-0.135 4.597,-0.27 8.018,-0.111c-0.079,-0.5 -0.13,-1.011 -0.13,-1.543c0,-1.7 0.6,-3.5 1.7,-5c-0.5,-1.7 -1.2,-5.3 0.2,-6.6c2.7,0 4.6,1.3 5.5,2.1c1.699,-0.701 3.599,-1.101 5.699,-1.101c2.1,0 4,0.4 5.6,1.1c0.9,-0.8 2.8,-2.1 5.5,-2.1c1.5,1.4 0.7,5 0.2,6.6c1.1,1.5 1.7,3.2 1.6,5c0,0.484 -0.045,0.951 -0.11,1.409c3.499,-0.172 6.527,-0.034 8.204,0.102c-0.002,0.337 -0.033,0.666 -0.051,0.999c-1.671,-0.138 -4.775,-0.28 -8.359,-0.089c-0.089,0.336 -0.197,0.663 -0.325,0.98c3.546,0.046 6.665,0.389 8.548,0.689c-0.043,0.332 -0.093,0.661 -0.151,0.987c-1.912,-0.306 -5.171,-0.664 -8.879,-0.682c-1.665,2.878 -5.22,4.755 -10.777,4.974v0.031c2.6,0 5,3.9 5,6.6v5.4c0,0.823 0.498,1.53 1.209,1.836c9.161,-3.032 15.791,-11.672 15.791,-21.836c0,-12.682 -10.317,-23 -23,-23c-12.683,0 -23,10.318 -23,23c0,10.164 6.63,18.804 15.791,21.836z"></path>
            </g>
          </g>
        </svg>
      }
    >
      Continue with GitHub
    </Button>
  );
};

export default GitHubAuthComponent;
