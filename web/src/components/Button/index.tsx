import React from "react";

type Props = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
};

const Button: React.FC<Props> = ({ label, onClick }) => {
  return (
    <input
      type="button"
      className="p-1 rounded-full w-full border-0 bg-green-teal font-montserrat font-bold text-[#fff]"
      value={label}
      onClick={onClick}
    />
  );
};

export default Button;
