import React from "react";
import Container from "@/layouts/Container";
import ContentSearch from "@/pages/Home/components/ContentSearch";
import ContentResults from "@/pages/Home/components/ContentResults";
import { SearchProvider } from "@/pages/Home/context/SearchContext";

const Home = () => {
  return (
    <SearchProvider>
      <div className="flex justify-center items-start">
        <Container>
          <ContentSearch />
        </Container>
        <Container>
          <ContentResults />
        </Container>
      </div>
    </SearchProvider>
  );
};

export default Home;
