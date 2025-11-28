import React from "react";

type Props = {
  label: string;
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<Props> = ({ label, onClick, disabled }) => {
  return (
    <input
      type="button"
      className={`p-1 rounded-full w-full border-0 ${
        disabled ? "bg-[#c4c4c4]" : "bg-green-teal cursor-pointer"
      } font-montserrat font-bold text-[#fff]`}
      value={label}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

export default Button;
