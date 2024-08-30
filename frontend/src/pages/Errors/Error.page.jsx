import React from "react";
import Lottie from "lottie-react";
import ErrorLottie from "../../lotties/Error.json";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie className="h-[300px]" animationData={ErrorLottie} />
    </div>
  );
};

export default ErrorPage;
