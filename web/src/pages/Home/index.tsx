import React from "react";
import Container from "@/layouts/Container";
import ContentSearch from "@/pages/Home/components/ContentSearch";
import ContentResults from "./components/ContentResults";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-start">
      <Container>
        <ContentSearch />
      </Container>
      <Container>
        <ContentResults />
      </Container>
    </div>
  );
};

export default Home;
