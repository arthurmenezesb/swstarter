import React from "react";
import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-[#ededed] p-4">{children}</main>
    </div>
  );
};

export default Layout;
