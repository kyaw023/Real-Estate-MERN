import Lottie from "lottie-react";
import React from "react";
import NoDataLottie from "../../lotties/noData (2).json";

const NoDataPage = ({ children, isData }) => {
  return isData ? (
    children
  ) : (
    <div className="flex items-center justify-center h-screen">
      <Lottie className="h-[300px]" animationData={NoDataLottie} />
    </div>
  );
};

export default NoDataPage;
