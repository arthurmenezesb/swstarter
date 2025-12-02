import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black opacity-50 z-50 flex justify-center items-center flex-col">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
      <p className="text-white">Loading...</p>
    </div>
  );
};

export default LoadingOverlay;
