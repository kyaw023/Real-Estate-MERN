import React from "react";
import { useTheme } from "next-themes";
import { Vortex } from "react-loader-spinner";

const LoadingComponent = ({ children, isLoading }) => {
  const { theme } = useTheme();
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <Vortex
        visible={true} // Set to true to show the loader
        height="80" // Height of the loader
        width="80" // Width of the loader
        ariaLabel="vortex-loading" // Accessibility label
        wrapperStyle={{}} // Optional: Additional styles for the wrapper
        wrapperClass="vortex-wrapper" // Optional: Class name for the wrapper
        colors={["red", "green", "blue", "yellow", "orange", "purple"]} // Colors for the vortex animation
      />
    </div>
  ) : (
    children
  );
};

export default LoadingComponent;
