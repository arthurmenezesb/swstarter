import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import Container from "@/layouts/Container";

interface DetailsContainerProps {
  title: string;
  children: React.ReactNode;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ title, children }) => {
  const navigate = useNavigate();

  const handleBackToSearch = () => () => {
    navigate(`/`);
  };

  return (
    <Container>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col ">
          <p className="text-lg font-bold">{title}</p>
        </div>
        <div>
          <div className="flex flex-row gap-[10vw]">{children}</div>
        </div>
        <div className="w-[200px]">
          <Button label="BACK TO SEARCH" onClick={handleBackToSearch()}></Button>
        </div>
      </div>
    </Container>
  );
};

export default DetailsContainer;