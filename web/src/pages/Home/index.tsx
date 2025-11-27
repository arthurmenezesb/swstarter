import React from "react";
import Container from "@/layouts/Container";
import ContentSearch from "@/pages/Home/components/ContentSearch";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Container>
        <ContentSearch />
      </Container>
    </div>
  );
};

export default Home;
