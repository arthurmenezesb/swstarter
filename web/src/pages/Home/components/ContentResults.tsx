import React from "react";
import Button from "../../../components/Button";

const ContentResults: React.FC = () => {
  const results = [
    { id: 1, title: "Result Title 1" },
    { id: 2, title: "Result Title 2" },
    { id: 3, title: "Result Title 3" },
  ];

  const handleSeeDetails = (id: number) => () => {
    console.log("See Details for ID:", id);
    // You can add navigation or modal logic here
  };

  return (
    <div className="min-w-md h-[66.66vh]">
      <p className="text-lg font-bold">Results</p>
      <hr className="my-4 border-[#c4c4c4]" />
      <div className="mt-4 space-y-4">
        {results.map((item) => (
          <div key={item.id}>
            <div className="flex items-center justify-between">
              <div className="w-2/3">
                <h3 className="text-md font-semibold">{item.title}</h3>
              </div>
              <div className="w-1/3 flex justify-end">
                <Button label="See Details" onClick={handleSeeDetails(item.id)} />
              </div>
            </div>
            <hr className="my-4 border-[#c4c4c4]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentResults;
