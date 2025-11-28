import React from "react";

const Header: React.FC = () => {
  return (
    // <header className="bg-white shadow-md">
    <header className="mb-[15px]">
      {/* <div className="container"> */}
      <div className="p-8 shadow-[0 1px 0 0 green-teal] bg-white">
        <h1 className="text-2xl font-bold text-center text-green-teal">SWStarter</h1>
      </div>
      {/* </div> */}
    </header>
  );
};

export default Header;
