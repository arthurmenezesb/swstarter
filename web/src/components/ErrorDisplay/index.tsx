import React from "react";
import { Link } from "react-router-dom";

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <p className="text-2xl font-bold text-red-500 mb-4">{message}</p>
      <Link to="/" className="text-emerald hover:underline">
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorDisplay;
