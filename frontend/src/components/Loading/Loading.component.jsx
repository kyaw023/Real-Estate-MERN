import React from "react";
import { useTheme } from "next-themes";
import "ldrs/square";

const LoadingComponent = ({ children, isLoading }) => {
  const { theme } = useTheme();
  return isLoading ? (
    <div className="flex items-center justify-center h-screen">
      <l-square
        size={35}
        stroke={5}
        strokeLength={0.25}
        bgOpacity={0.1}
        speed={1.2}
        color={theme === "dark" ? "white" : "black"}
      ></l-square>
    </div>
  ) : (
    children
  );
};

export default LoadingComponent;
