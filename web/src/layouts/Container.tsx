import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Container: React.FC<LayoutProps> = ({ children }) => {
  return <div className="p-4 rounded-xs shadow-md bg-[#fff] m-2">{children}</div>;
};

export default Container;
