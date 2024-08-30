import React from "react";
import "ldrs/square";
import { useTheme } from "next-themes";

const LoadingPage = () => {
  const { theme } = useTheme();

  return (
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
  );
};

export default LoadingPage;
